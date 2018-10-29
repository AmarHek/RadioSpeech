package org.felher.parser

import cats.implicits._
import Parser._

object TableParser {
  val _Typ               = "Typ"
  val _Gliederung        = "Gliederung"
  val _BausteinBefund    = "Baustein Befund"
  val _Normal            = "Normal"
  val _Default           = "Default"
  val _Choice_Gruppe     = "Choice-Gruppe"
  val _Aufzaehlung       = "Aufzählung"
  val _Variable_ID       = "Variable-ID"
  val _Variable_Typ      = "Variable-Typ"
  val _NK_Stellen        = "NK-Stellen"
  val _Variable_Info     = "Variable-Info"
  val _Text_Befund       = "Text Befund"
  val _Aufzaehlungstexte = "Aufzählungstexte"
  val _Wenn              = "Wenn"
  val _Dann              = "Dann"

  def topLevels: Parser[List[TopLevel]] = takeAll(
    or(
      block.widen[TopLevel],
      enumeration.widen[TopLevel],
      category.widen[TopLevel],
    )
  )

  def block: Parser[Block] = for {
    _    <- assertContent(_Typ, "Block")
    text <- resolve(_Text_Befund)
    _    <- endLine
  } yield Block(en(text))

  def enumeration: Parser[Enumeration] = for {
    _    <- assertContent(_Typ, "Aufzählung")
    id   <- resolve(_Aufzaehlung)
    text <- resolve(_Text_Befund)
    _    <- endLine
  } yield Enumeration(id, en(text))

  def category: Parser[Category] = for {
    name         <- resolve(_Gliederung)
    firstSel     <- selectable
    remainingSel <- takeAll(selectable)
  } yield Category(name, firstSel :: remainingSel)

  def selectable: Parser[Selectable] = or(
    checkBox.widen[Selectable],
    group.widen[Selectable],
  )

  def checkBox: Parser[CheckBox] = for {
    _             <- maybe(resolve(_Wenn))
    _             <- maybe(resolve(_Dann))
    name          <- resolve(_BausteinBefund)
    default       <- resolveMaybe(_Default)
    normal        <- resolveMaybe(_Normal)
    enumeration   <- resolveMaybe(_Aufzaehlung)
    text          <- resolve(enumeration.fold(_Text_Befund)(x => _Aufzaehlungstexte))
    firstVar      <- maybe(variable)
    _             <- endLine
    remainingVars <- takeAll(variable <* endLine)
    vars          <- (firstVar, remainingVars) match {
      case (None,    Nil) => List.empty[Variable].pure[Parser]
      case (Some(v), l  ) => (v :: l).pure[Parser]
      case (None,    _  ) => fail("missing first variable")
    }
  } yield CheckBox(name, default.nonEmpty, en(text), normal.nonEmpty, vars, enumeration)

  def group: Parser[Group] = for {
    name         <- resolve(_Choice_Gruppe)
    firstOpt     <- option(name)
    remainingOpt <- takeAll(option(name))
  } yield {
    val value = (firstOpt :: remainingOpt).find(o => o._1).map(_._2.name)
    Group(name, (firstOpt :: remainingOpt).map(_._2), value)
  }

  def option(group: String): Parser[(Boolean, Opt)] = for {
    _             <- maybe(resolve(_Wenn))
    _             <- maybe(resolve(_Dann))
    _             <- assertContent(_Choice_Gruppe, group)
    name          <- resolve(_BausteinBefund)
    text          <- resolve(_Text_Befund)
    default       <- resolveMaybe(_Default)
    normal        <- resolveMaybe(_Normal)
    firstVar      <- maybe(variable)
    _             <- endLine
    remainingVars <- takeAll(variable <* endLine)
    vars          <- (firstVar, remainingVars) match {
      case (None,    Nil) => List.empty[Variable].pure[Parser]
      case (Some(v), l  ) => (v :: l).pure[Parser]
      case (None,    _  ) => fail("missing first variable")
    }
  } yield (default.nonEmpty, Opt(name, en(text), normal.nonEmpty, vars))

  def variable: Parser[Variable] = for {
    id     <- resolve(_Variable_ID)
    typ    <- resolve(_Variable_Typ)
    info   <- maybe(resolve(_Variable_Info)).map(_.getOrElse(""))
    result <- typ match {
      case "Datum"     => VariableDate(id, info, "", NgbDateStruct(2019, 1, 1)).pure[Parser].widen[Variable]
      case "ZahlBruch" => (for {
        fractionDigits <- resolve(_NK_Stellen)
        fd             <- convertTry(fractionDigits.toInt)
      } yield VariableRatio(id, info, "", 0, 0, fd)).widen[Variable]
      case "Zahl"      => VariableNumber(id, info, "", 0).pure[Parser].widen[Variable]
      case "Text"      => VariableText(id, info, "", "").pure[Parser].widen[Variable]
      case ocString    => ocString.split("/").map(_.trim).toList match {
        case Nil => fail(s"Unknown type $typ")
        case vs  => VariableOC(id, info, "", None, vs).pure[Parser].widen[Variable]
      }
    }
  } yield result

  def en(s: String): String = s.replace("\\n", "\n")
}
