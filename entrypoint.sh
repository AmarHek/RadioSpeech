#!/bin/bash

set -e

export JAVA_OPTS=${JAVA_OPTS:="-Xmx256m"}

exec stage/bin/server
