FROM openjdk:11.0.4-jdk-stretch

RUN mkdir /website

ADD website.jar /website/website.jar
ADD entrypoint.sh /website/entrypoint.sh

WORKDIR /website

EXPOSE 9050

ENTRYPOINT [ "./entrypoint.sh" ]

