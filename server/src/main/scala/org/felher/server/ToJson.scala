package org.felher.server

import io.circe._, io.circe.syntax._

object ToJson {
  def toJson(tl: List[TopLevel]): String =
    tl.map({
      case b: Block       => block(b)
      case e: Enumeration => enumeration(e)
      case c: Category    => category(c)
      case c: Conditional => conditional(c)
    }).spaces2

  def block(b: Block): Json = JsonObject(
    "kind"          -> "block",
    "text"          -> b.text,
    "judgementText" -> b.judgementText,
    "data"          -> b.data,
  )

  def enumeration(e: Enumeration): Json = JsonObject(
    "kind"          -> "enumeration",
    "text"          -> e.text,
    "judgementText" -> e.judgementText,
    "id"            -> e.id,
    "data"          -> e.data,
  )

  def category(c: Category): Json = JsonObject(
    "kind"        -> "category",
    "name"        -> c.name,
    "selectables" -> c.selectables.map(selectable),
    "data"        -> c.data,
  )

  def conditional(c: Conditional): Json = JsonObject(
    "kind"          -> "conditional",
    "precondition"  -> c.precondition.ored.map(and =>
                         and.literals.map(literal =>
                           JsonObject("id" -> literal.id, "negated" -> literal.negated))),
    "normalText"    -> c.normalText,
    "judgementText" -> c.judgementText,
    "data"          -> c.data,
  )

  def selectable(s: Selectable): Json = s match {
    case c: CheckBox => checkBox(c)
    case g: Group    => group(g)
  }

  def checkBox(c: CheckBox): Json = JsonObject(
    "kind"          -> "box",
    "name"          -> c.name,
    "value"         -> c.value,
    "text"          -> c.text,
    "judgementText" -> c.judgementText,
    "normal"        -> c.normal,
    "conditionalId" -> c.conditionalId,
    "variables"     -> c.variables.map(variable),
    "enumeration"   -> c.enumeration,
    "data"          -> c.data,
  )

  def group(g: Group): Json = JsonObject(
    "kind"    -> "group",
    "name"    -> g.name,
    "options" -> g.options.map(opt),
    "value"   -> g.value,
    "data"    -> g.data,
  )

  def opt(o: Opt): Json = JsonObject(
    "kind"          -> "option",
    "name"          -> o.name,
    "text"          -> o.text,
    "judgementText" -> o.judgementText,
    "normal"        -> o.normal,
    "conditionalId" -> o.conditionalId,
    "variables"     -> o.variables.map(variable),
    "data"          -> o.data,
  )

  def variable(v: Variable): Json = v match {
    case oc     : VariableOC     => variableOC(oc)
    case mc     : VariableMC     => variableMC(mc)
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
    "data"       -> oc.data,
  )

  def variableMC(mc: VariableMC): Json = JsonObject(
    "kind"       -> "mc",
    "id"         -> mc.id,
    "textBefore" -> mc.textBefore,
    "textAfter"  -> mc.textAfter,
    "values"     -> mc.values,
    "data"       -> mc.data,
  )


  def variableText(text: VariableText): Json = JsonObject(
    "kind"       -> "text",
    "id"         -> text.id,
    "textBefore" -> text.textBefore,
    "textAfter"  -> text.textAfter,
    "value"      -> text.value,
    "data"       -> text.data,
  )

  def variableNumber(number: VariableNumber): Json = JsonObject(
    "kind"       -> "number",
    "id"         -> number.id,
    "textBefore" -> number.textBefore,
    "textAfter"  -> number.textAfter,
    "value"      -> number.value,
    "data"       -> number.data,
  )

  def variableRatio(number: VariableRatio): Json = JsonObject(
    "kind"           -> "ratio",
    "id"             -> number.id,
    "textBefore"     -> number.textBefore,
    "textAfter"      -> number.textAfter,
    "numerator"      -> number.numerator,
    "denominator"    -> number.denominator,
    "fractionDigits" -> number.fractionDigits,
    "data"           -> number.data,
  )

  def variableDate(date: VariableDate): Json = JsonObject(
    "kind"       -> "date",
    "id"         -> date.id,
    "textBefore" -> date.textBefore,
    "textAfter"  -> date.textAfter,
    "value"      -> Map("year" -> date.value.year, "month" -> date.value.month, "day" -> date.value.day),
    "data"       -> date.data,
  )

  implicit def toJsonI[A: Encoder](a: A): Json = a.asJson
}
