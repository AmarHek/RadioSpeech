package org.felher.parser

import io.circe._, io.circe.syntax._

object ToJson {
  def toJson(tl: List[TopLevel]): String =
    tl.map({
      case b: Block       => block(b)
      case e: Enumeration => enumeration(e)
      case c: Category    => category(c)
    }).spaces2

  def block(b: Block): Json = Map(
    "kind" -> "block",
    "text" -> b.text,
  )

  def enumeration(e: Enumeration): Json = Map(
    "kind" -> "enumeration",
    "text" -> e.text,
    "id"   -> e.id,
  )

  def category(c: Category): Json = JsonObject(
    "kind"        -> "category",
    "name"        -> c.name,
    "selectables" -> c.selectables.map(selectable)
  )

  def selectable(s: Selectable): Json = s match {
    case c: CheckBox => checkBox(c)
    case g: Group    => group(g)
  }

  def checkBox(c: CheckBox): Json = JsonObject(
    "kind"        -> "box",
    "name"        -> c.name,
    "value"       -> c.value,
    "text"        -> c.text,
    "normal"      -> c.normal,
    "variables"   -> c.variables.map(variable),
    "enumeration" -> c.enumeration,
  )

  def group(g: Group): Json = JsonObject(
    "kind"    -> "group",
    "name"    -> g.name,
    "options" -> g.options.map(opt),
    "value"   -> g.value,
  )

  def opt(o: Opt): Json = JsonObject(
    "kind"        -> "option",
    "name"        -> o.name,
    "text"        -> o.text,
    "normal"      -> o.normal,
    "variables"   -> o.variables.map(variable),
  )

  def variable(v: Variable): Json = v match {
    case oc     : VariableOC     => variableOC(oc)
    case text   : VariableText   => variableText(text)
    case number : VariableNumber => variableNumber(number)
    case date   : VariableDate   => variableDate(date)
    case ratio  : VariableRatio  => variableRatio(ratio)
  }

  def variableOC(oc: VariableOC): Json = JsonObject(
    "kind"       -> "oc",
    "id"         -> oc.id,
    "textBefore" -> oc.textBefore,
    "textAfter"  -> oc.textAfter,
    "value"      -> oc.value,
    "values"     -> oc.values,
  )

  def variableText(text: VariableText): Json = JsonObject(
    "kind"       -> "text",
    "id"         -> text.id,
    "textBefore" -> text.textBefore,
    "textAfter"  -> text.textAfter,
    "value"      -> text.value,
  )

  def variableNumber(number: VariableNumber): Json = JsonObject(
    "kind"       -> "number",
    "id"         -> number.id,
    "textBefore" -> number.textBefore,
    "textAfter"  -> number.textAfter,
    "value"      -> number.value,
  )

  def variableRatio(number: VariableRatio): Json = JsonObject(
    "kind"           -> "ratio",
    "id"             -> number.id,
    "textBefore"     -> number.textBefore,
    "textAfter"      -> number.textAfter,
    "numerator"      -> number.numerator,
    "denominator"    -> number.denominator,
    "fractionDigits" -> number.fractionDigits,
  )

  def variableDate(date: VariableDate): Json = JsonObject(
    "kind"       -> "date",
    "id"         -> date.id,
    "textBefore" -> date.textBefore,
    "textAfter"  -> date.textAfter,
    "value"      -> Map("year" -> date.value.year, "month" -> date.value.month, "day" -> date.value.day),
  )

  implicit def toJsonI[A: Encoder](a: A): Json = a.asJson
}
