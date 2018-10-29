package org.felher.parser

import java.nio.file._

object Main {
  def main(args: Array[String]): Unit = {
    val rawSheet = parseCSV(sheetString)
    val s = Parser.S(0, Set(), rawSheet(0), rawSheet.tail)
    val tls = Parser.runComplete(TableParser.topLevels, s)
    Files.write(Paths.get("output.json"), ToJson.toJson(tls.right.get).getBytes("UTF-8"))
    ()
  }

  def parseCSV(s: String): Array[Array[String]] =
    s.split("\r?\n").map(_.split(";"))

  private val sheetString = new String(Files.readAllBytes(Paths.get("table.csv")), "UTF-8")
}
