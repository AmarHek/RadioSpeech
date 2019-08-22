package org.felher.server

import cats.implicits._
import Parser._

object TableParser {
  val _Typ               = "Typ"
  val _Gliederung        = "Gliederung"
  val _BausteinBefund    = "Baustein Befund"
  val _BausteinID        = "Baustein ID"
  val _Normal            = "Normal"
  val _Default           = "Default"
  val _Choice_Gruppe     = "Choice-Gruppe"
  val _Aufzaehlung       = "Aufzählung"
  val _Variable_ID       = "Variable-ID"
  val _Variable_Typ      = "Variable-Typ"
  val _NK_Stellen        = "NK-Stellen"
  val _Variable_Info     = "Variable-Info"
  val _Text_Befund       = "Text Befund"
  val _Text_Beurteilung  = "Text Beurteilung"
  val _Aufzaehlungstexte = "Aufzählungstexte"
  val _Wenn              = "Wenn"

  def topLevels: Parser[List[TopLevel]] = takeAll(
    or(
      block.widen[TopLevel],
      enumeration.widen[TopLevel],
      category.widen[TopLevel],
      conditional.widen[TopLevel],
    ) <* takeAll(endLine)
  )

  def block: Parser[Block] = for {
    _             <- assertContent(_Typ, "Block")
    text          <- resolve(_Text_Befund)
    judgementText <- resolveMaybe(_Text_Beurteilung)
    data          <- getData
    _             <- endLine
  } yield Block(en(text), judgementText.map(en), data.mapValues(_.map(en)))

  def conditional: Parser[Conditional] = for {
    precondition  <- resolve(_Wenn)
    preconditionp <- parseCondition(precondition)
    normalText    <- resolveMaybe(_Text_Befund)
    judgementText <- resolveMaybe(_Text_Beurteilung)
    data          <- getData
    _             <- endLine
  } yield Conditional(preconditionp, normalText, judgementText, data.mapValues(_.map(en)))

  def parseCondition(s: String): Parser[Condition] = {
    def parseLiteral(s: String): Either[String, Literal] = {
      val t = s.trim
      if (t.isEmpty) Left("Empty Literal")
      else if (t.startsWith("!")) parseLiteral(t.substring(1)).map(smaller => smaller.copy(negated = !smaller.negated))
      else Right(Literal(t, false))
    }

    val c: Either[String, Condition] = s.split(";").toList.traverse(anded =>
        anded.split(",").toList.traverse(
          parseLiteral).map(And)).map(Condition)

    c match {
      case Left(s)   => fail(s)
      case Right(cc) => cc.pure[Parser]
    }
  }


  def enumeration: Parser[Enumeration] = for {
    _             <- assertContent(_Typ, "Aufzählung")
    id            <- resolve(_Aufzaehlung)
    text          <- resolve(_Text_Befund)
    judgementText <- resolveMaybe(_Text_Beurteilung)
    data          <- getData
    _             <- endLine
  } yield Enumeration(id, en(text), judgementText.map(en), data.mapValues(_.map(en)))

  def category: Parser[Category] = for {
    name         <- resolve(_Gliederung)
    data         <- getData
    firstSel     <- selectable
    remainingSel <- takeAll(selectable)
  } yield Category(name, firstSel :: remainingSel, data.mapValues(_.map(en)))

  def selectable: Parser[Selectable] = or(
    checkBox.widen[Selectable],
    group.widen[Selectable],
  )

  def checkBox: Parser[CheckBox] = for {
    name          <- resolve(_BausteinBefund)
    judgementText <- resolveMaybe(_Text_Beurteilung)
    default       <- resolveMaybe(_Default)
    normal        <- resolveMaybe(_Normal)
    enumeration   <- resolveMaybe(_Aufzaehlung)
    text          <- resolve(enumeration.fold(_Text_Befund)(_ => _Aufzaehlungstexte))
    condId        <- resolveMaybe(_BausteinID)
    data          <- getData
    firstVar      <- maybe(variable)
    _             <- endLine
    remainingVars <- takeAll(variable <* endLine)
    vars          <- (firstVar, remainingVars) match {
      case (None,    Nil) => List.empty[Variable].pure[Parser]
      case (Some(v), l  ) => (v :: l).pure[Parser]
      case (None,    _  ) => fail("missing first variable")
    }
  } yield CheckBox(name, default.nonEmpty, en(text), judgementText.map(en), normal.nonEmpty, condId, vars, enumeration, data.mapValues(_.map(en)))

  def group: Parser[Group] = for {
    name         <- resolve(_Choice_Gruppe)
    data         <- getData
    firstOpt     <- option(name)
    remainingOpt <- takeAll(option(name))
  } yield {
    val value = (firstOpt :: remainingOpt).find(o => o._1).map(_._2.name)
    Group(name, (firstOpt :: remainingOpt).map(_._2), value, data.mapValues(_.map(en)))
  }

  def option(group: String): Parser[(Boolean, Opt)] = for {
    _             <- assertContent(_Choice_Gruppe, group)
    name          <- resolve(_BausteinBefund)
    text          <- resolve(_Text_Befund)
    judgementText <- resolveMaybe(_Text_Beurteilung)
    default       <- resolveMaybe(_Default)
    normal        <- resolveMaybe(_Normal)
    condId        <- resolveMaybe(_BausteinID)
    data          <- getData
    firstVar      <- maybe(variable)
    _             <- endLine
    remainingVars <- takeAll(variable <* endLine)
    vars          <- (firstVar, remainingVars) match {
      case (None,    Nil) => List.empty[Variable].pure[Parser]
      case (Some(v), l  ) => (v :: l).pure[Parser]
      case (None,    _  ) => fail("missing first variable")
    }
  } yield (default.nonEmpty, Opt(name, en(text), judgementText.map(en), normal.nonEmpty, condId, vars, data.mapValues(_.map(en))))

  def variable: Parser[Variable] = for {
    id     <- resolve(_Variable_ID)
    typ    <- resolve(_Variable_Typ)
    data   <- getData
    dm      = data.mapValues(_.map(en))
    info   <- maybe(resolve(_Variable_Info)).map(_.getOrElse(""))
    ia     = after(info)
    ib     = before(info)
    result <- typ match {
      case "Datum"     => VariableDate(id, ib, ia, NgbDateStruct(2019, 1, 1), dm).pure[Parser].widen[Variable]
      case "ZahlBruch" => (for {
        fractionDigits <- resolve(_NK_Stellen)
        fd             <- convertTry(fractionDigits.toInt)
      } yield VariableRatio(id, ib, ia, 0, 0, fd, dm)).widen[Variable]
      case "Zahl"      => VariableNumber(id, ib, ia, 0, dm).pure[Parser].widen[Variable]
      case "Text"      => VariableText(id, ib, ia, "", dm).pure[Parser].widen[Variable]
      case text        => parseOcOrMcQuestion(text, id, ib, ia, dm) match {
        case None    => fail(s"Unknown type $typ")
        case Some(v) => v.pure[Parser]
      }
    }
  } yield result

  def parseOcOrMcQuestion(typeText: String, id: String, before: String, after: String, dm: Data): Option[Variable] = {
    if (typeText.contains("/")) {
      Some(VariableOC(id, before, after, None, typeText.split("/").map(_.trim).toList, dm))
    } else if (typeText.contains(";")) {
      Some(VariableMC(id, before, after, typeText.split(";").map(t => (t.trim, false)).toList, dm))
    } else {
      None
    }
  }

  def en(s: String): String = s.replace("\\n", "\n")

  def before(s: String): String = s.split("\\.\\.\\.|…", 2) match {
    case Array(a)    => a
    case Array(a, _) => a
    case _           => throw new RuntimeException("should never happen")
  }

  def after(s: String): String = s.split("\\.\\.\\.|…", 2) match {
    case Array(_)    => ""
    case Array(_, b) => b
    case _           => throw new RuntimeException("should never happen")
  }
}
