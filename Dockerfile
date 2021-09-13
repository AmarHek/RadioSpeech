FROM openjdk:11.0.4-jdk-stretch

RUN mkdir /website

ADD server/target/universal/stage /website/stage
ADD entrypoint.sh /website/entrypoint.sh

WORKDIR /website

EXPOSE 9050

ENTRYPOINT [ "./entrypoint.sh" ]

