package org.felher.server

import cats._, cats.implicits._
import java.io.{InputStream, ByteArrayInputStream}
import org.docx4j.openpackaging.packages.{OpcPackage, SpreadsheetMLPackage}
import org.xlsx4j.sml.{Cell => DCell, STCellType, CTRst}
import scala.collection.JavaConverters._

object ExcelParser {
  def parseTable(bytes: Array[Byte]): Either[String, Array[Array[String]]] = 
    parseTable(new ByteArrayInputStream(bytes))

  def parseTable(in: InputStream): Either[String, Array[Array[String]]] = try {
    val workbook      = OpcPackage.load(in).asInstanceOf[SpreadsheetMLPackage].getWorkbookPart
    val sharedStrings = Option(workbook.getSharedStrings).map(_.getContents.getSi.asScala.toList).getOrElse(List())
    val firstSheet    = workbook.getWorksheet(0).getContents
    Right(
      firstSheet.getSheetData.getRow.asScala.toArray.map(
        row => {
          val cells = row.getC.asScala.toList
          val allCells = cells.map(ColRef.fromCell).maximumOption(ColRef.colRefOder) match {
            case None      => Nil
            case Some(max) => {
              val allCellRefs = ColRef.getPredecessors(max.inc)
              allCellRefs.flatMap(ref => cells.find(c => ColRef.fromCell(c) == ref) match {
                case None    => List("")
                case Some(c) => List(getCellValue(c, sharedStrings))
              })
            }
          }
          allCells.toArray
        }
      )
    )
  } catch {
    case e: Exception => Left(Util.stringify(e))
  }


  def getCellValue(c: DCell, sharedStrings: List[CTRst]): String = {
    (c.getV, c.getT) match {
      case (null, _                 ) => ""
      case (_, STCellType.N         ) => c.getV
      case (_, STCellType.INLINE_STR) => c.getIs.getT.getValue
      case (v, STCellType.S         ) => resolveSharedString(v.toInt, sharedStrings)
      case (_, _                    ) => throw new RuntimeException("unkown cell " + c.getR)
    }
  }

  def resolveSharedString(id: Int, sharedStrings: List[CTRst]): String = {
    val sharedString = sharedStrings(id)
    if (sharedString.getT != null) {
      sharedString.getT.getValue
    } else {
      sharedString.getR.asScala.map(_.getT.getValue).mkString("")
    }
  }

  final case class ColRef(ref: String) {
    def inc: ColRef = {
      val lastChar = ref.charAt(ref.length - 1);
      val init = ref.substring(0, ref.length - 1)
      if (lastChar == 'Z' && init.isEmpty) ColRef("AA")
      else if (lastChar == 'Z') ColRef(ColRef(init).inc.ref + "A")
      else ColRef(init + (Character.toString((lastChar + 1).asInstanceOf[Char])).toString)
    }
  }

  object ColRef {
    implicit val colRefOder = new Order[ColRef] {
      def compare(c1: ColRef, c2: ColRef): Int = {
        if (c1.ref.length > c2.ref.length) 1
        else if (c1.ref.length < c2.ref.length) -1
        else if (c1.ref.length == 0) 0
        else if (c1.ref.charAt(0) > c2.ref.charAt(0)) 1
        else if (c1.ref.charAt(0) < c2.ref.charAt(0)) -1
        else compare(ColRef(c1.ref.substring(1)), ColRef(c2.ref.substring(1)))
      }
    }

    def getPredecessors(c: ColRef): List[ColRef] =
      Stream.iterate(ColRef("A"))(_.inc).takeWhile(_ != c).toList

    def fromCell(c: DCell): ColRef = ColRef(c.getR.replaceAll("[0-9]", ""))
  }
}
