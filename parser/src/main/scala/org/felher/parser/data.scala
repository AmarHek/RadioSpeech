package org.felher.parser

sealed trait TopLevel

final case class Block(
  text: String,
  judgementText: Option[String],
) extends TopLevel

final case class Enumeration(
  id:            String,
  text:          String,
  judgementText: Option[String],
) extends TopLevel

final case class Category(
  name:        String,
  selectables: List[Selectable],
) extends TopLevel

sealed trait Selectable

final case class CheckBox(
  name:           String,
  value:          Boolean,
  text:           String,
  judgementText:  Option[String],
  normal:         Boolean,
  conditionalId:  Option[String],
  variables:      List[Variable],
  enumeration:    Option[String],
) extends Selectable

final case class Group(
  name:    String,
  options: List[Opt],
  value:   Option[String],
) extends Selectable

final case class Opt(
  name:          String,
  text:          String,
  judgementText: Option[String],
  normal:        Boolean,
  conditionalId: Option[String],
  variables:     List[Variable],
)

final case class Conditional(
  precondition:  Condition,
  normalText:    Option[String],
  judgementText: Option[String],
) extends TopLevel

sealed trait Variable

final case class VariableOC(
  id:         String,
  textBefore: String,
  textAfter:  String,
  value:      Option[String],
  values:     List[String],
) extends Variable

final case class VariableText(
  id:         String,
  textBefore: String,
  textAfter:  String,
  value:      String,
) extends Variable

final case class VariableNumber(
  id:         String,
  textBefore: String,
  textAfter:  String,
  value:      Double,
) extends Variable

final case class VariableDate(
  id:         String,
  textBefore: String,
  textAfter:  String,
  value:      NgbDateStruct,
) extends Variable

final case class VariableRatio(
  id:             String,
  textBefore:     String,
  textAfter:      String,
  numerator:      Double,
  denominator:    Double,
  fractionDigits: Int,
) extends Variable

final case class NgbDateStruct(year: Int, month: Int, day: Int)

final case class Condition(ored: List[And])
final case class And(literals: List[Literal])
final case class Literal(id: String, negated: Boolean)
