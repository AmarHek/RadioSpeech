package org.felher.server

import java.io._

object Util {
  def stringify(t: Throwable): String = {
    val sw = new StringWriter
    t.printStackTrace(new PrintWriter(sw))
    sw.toString
  }
}
