package org.felher.parser

import cats.data._, cats.implicits._

object Parser {
  type Parser[A] = StateT[Either[String, ?], S, A]

  def runComplete[A](p: Parser[A], s: S): Either[String, A] =
    p.run(s) match {
      case Left(s)     => Left(s)
      case Right((s, a)) => 
        if (!s.eof) Left(s"End of sheet not reached. Got to row ${s.row.toString}")
        else if (!s.visited.isEmpty) Left(s"uncommitted content left: ${s.visited.toString}")
        else Right(a)
    }

  def resolve(name: String): Parser[String] = for {
    column <- resolveHeader(name)
    value  <- lookupValue(column)
  } yield value

  def resolveMaybe(name: String): Parser[Option[String]] = for {
    column <- resolveHeader(name)
    value  <- lookupValueMaybe(column)
  } yield value

  def convertTry[A](a: => A): Parser[A] =
    try {
      a.pure[Parser]
    } catch {
      case e: Exception => fail(e.toString)
    }

  def endLine: Parser[Unit] = for {
    s  <- get
    uv <- unvisited(s)
    _  <- uv match {
      case Nil => modify(s => s.copy(row = s.row + 1, visited = Set()))
      case l   => fail(s"not visitied ${s.row.toString}/${l.toString}")
    }
  } yield ()

  def takeAll[A](p: Parser[A]): Parser[List[A]] = for {
    s <- get
    r <- p.run(s) match {
      case Left(_)       => List.empty[A].pure[Parser]
      case Right((s, a)) => for {
        _  <- set(s) 
        as <- takeAll(p)
      } yield a :: as
    }
  } yield r

  def or[A](ps: Parser[A]*): Parser[A] = for {
    s  <- get
    rs  = ps.toList.map(p => p.run(s))
    r  <- rs.partitionEither(x => x) match {
      case (fs, Nil      ) => fail(s"failed or with: ${fs.toString}")
      case (_ , (s, a)::_) => set(s).as(a)
    }
  } yield r

  def maybe[A](p: Parser[A]): Parser[Option[A]] = for {
    s <- get
    rs = p.run(s)
    r <- rs match {
      case Left(_)       => (None: Option[A]).pure[Parser]
      case Right((s, a)) => set(s).as(Some(a))
    }
  } yield r

  def assertContent(name: String, content: String): Parser[Unit] = for {
    c <- resolve(name)
    _ <- if (c == content) ().pure[Parser] else fail(s"couldnt assert content $content")
  } yield ()

  def fail[A](s: String): Parser[A] =
    StateT.liftF(Left(s))

  private def unvisited(s: S): Parser[List[Int]] =
    if (s.eof) fail("end of sheet")
    else (0 until s.sheet(s.row).length).toList.filter(i =>
        s.sheet(s.row)(i) != "" && !s.visited.contains(i)
      ).pure[Parser]

  private def resolveHeader(name: String): Parser[Int] =
    get >>= ((s) => {
      val column = s.header.indexOf(name)
      if (column == -1) fail(s"Could not resolve $name")
      else column.pure[Parser]
    })

  private def lookupValue(column: Int): Parser[String] = for {
    _ <- modify(s => s.copy(visited = s.visited + column))
    s <- get
    r <- 
      if (s.eof) fail("end of sheet")
      else if (s.sheet(s.row).length <= column) fail(s"read empty content ${s.row.toString}/${column.toString}")
      else if (s.sheet(s.row)(column) == "")    fail(s"read empty string  ${s.row.toString}/${column.toString}")
      else s.sheet(s.row)(column).pure[Parser]
    } yield r

  private def lookupValueMaybe(column: Int): Parser[Option[String]] = for {
    _ <- modify(s => s.copy(visited = s.visited + column))
    s <- get
    r <- 
      if (s.eof) fail("end of sheet")
      else if (s.sheet(s.row).length <= column) None.pure[Parser]
      else if (s.sheet(s.row)(column) == "")    None.pure[Parser]
      else Some(s.sheet(s.row)(column)).pure[Parser]
    } yield r

  private def get: Parser[S] = StateT.get

  private def modify(f: S => S): Parser[Unit] = StateT.modify[Either[String, ?], S](f)

  private def set(s: S): Parser[Unit] = modify(_ => s)

  final case class S(
    row:     Int,
    visited: Set[Int],
    header:  Array[String],
    sheet:   Array[Array[String]],
  ) {
    def eof: Boolean = sheet.length <= row
  }
}
