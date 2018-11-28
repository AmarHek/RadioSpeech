package org.felher.server

import cats.effect._, cats.data._
import cats.implicits._
import io.circe._, io.circe.generic.semiauto._, io.circe.syntax._, io.circe.parser._
import java.nio.file._
import java.util.concurrent._
import org.http4s._
import org.http4s.circe.CirceEntityDecoder._
import org.http4s.circe._
import org.http4s.dsl._
import org.http4s.dsl.io._
import org.http4s.implicits._
import org.http4s.server.blaze._
import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext

object Main extends IOApp {
  val dataDir: java.nio.file.Path = Paths.get("data/")
  val blockingEc = ExecutionContext.fromExecutorService(Executors.newFixedThreadPool(4))

  val uploadService = HttpRoutes.of[IO] {
    case req@POST -> Root / "upload" => for {
      json   <- req.as[UploadData]
      bytes  <- IO { java.util.Base64.getDecoder.decode(json.data) }
      table  <- IO {
        ExcelParser.parseTable(bytes) match {
          case Left(s)  => throw new RuntimeException(s)
          case Right(t) => t
        }
      }
      s       = Parser.S(0, Set(), table(0), table.tail)
      tls     = Parser.runComplete(TableParser.topLevels, s)
      result <- tls match {
        case Left(e)  => BadRequest(e)
        case Right(r) => for {
          _ <- IO { Files.createDirectories(dataDir) }
          _ <- IO { Files.write(dataDir.resolve(json.name), ToJson.toJson(r).getBytes("UTF-8")) }
          r <- Ok(().asJson)
        } yield r
      }
    } yield result
  }

  def createString(bytes: Array[Byte]): String = {
    val utf8String = new String(bytes, "UTF-8")
    val utf8Bytes = utf8String.getBytes("UTF-8")
    if (utf8Bytes.sameElements(bytes)) utf8String
    else new String(bytes, "latin1")
  }

  def parseCSV(s: String): Array[Array[String]] =
    s.split("\r?\n").map(_.split(";"))

  final case class UploadData(data: String, name: String)
  implicit val uploadDataDecoder: Decoder[UploadData] = deriveDecoder[UploadData]

  val listService = HttpRoutes.of[IO] {
    case POST -> Root / "list" => for {
      files  <- IO { Files.list(dataDir).collect(java.util.stream.Collectors.toList()).asScala.toList }
      result <- Ok(files.map(_.getFileName.toString).asJson)
    } yield result
  }

  val getService = HttpRoutes.of[IO] {
    case req@POST -> Root / "get" => for {
      name   <- req.as[String]
      bytes  <- IO { Files.readAllBytes(dataDir.resolve(name)) }
      string <- IO { new String(bytes, "UTF-8") }
      json   <- IO { decode[Json](string)
        match {
          case Left(e)  => throw new RuntimeException(e)
          case Right(x) => x
        }
      }
      result <- Ok(json)
    } yield result
  }

  val removeService = HttpRoutes.of[IO] {
    case req@POST -> Root / "remove" => for {
      name   <- req.as[String]
      _      <- IO { Files.deleteIfExists(dataDir.resolve(name)) }
      result <- Ok(())
    } yield result
  }

  val staticService = HttpRoutes.of[IO] {
    case req@GET -> "static" /: file =>
      if (file.toList.mkString("/").isEmpty) 
        StaticFile.fromResource("/org/felher/server/index.html", blockingEc, Some(req))
          .getOrElseF(NotFound())
      else 
        StaticFile.fromResource("/org/felher/server/" + file.toList.mkString("/"), blockingEc, Some(req))
          .getOrElseF(NotFound())
  }

  def run(args: List[String]): IO[ExitCode] =
    BlazeServerBuilder[IO]
      .bindHttp(1337, "0.0.0.0")
      .withHttpApp(returnErrors((
        uploadService <+>
        listService <+>
        getService <+>
        removeService <+>
        staticService
      ).orNotFound))
      .serve
      .compile
      .drain
      .as(ExitCode.Success)

  def returnErrors[F[_]: Sync](k: Kleisli[F, Request[F], Response[F]]): Kleisli[F, Request[F], Response[F]] = Kleisli(req =>
      k(req).attempt.flatMap({
        case Left(e) => {
          Http4sDsl[F].http4sInternalServerErrorSyntax(InternalServerError).apply(Util.stringify(e))
        }
        case Right(r) => r.pure[F]
      }))

}
