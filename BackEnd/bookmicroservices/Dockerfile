#https://stackoverflow.com/questions/27767264/how-to-dockerize-maven-project-and-how-many-ways-to-accomplish-it

##
### Build Stage: Aquire Latest Maven as BaseImage
##
FROM maven:latest as build

# ENV MAVEN_VERSION LATEST_VERSION
# ENV MAVEN_HOME /usr/lib/mvn

# Copy src to the app directory created above
COPY src /app/src/
# Copy pom.xml to the app directory created above
COPY pom.xml /app/

# Working Directory for subsequent Docker instructions
WORKDIR /app/

# ./mvnw package && java -jar target/loginmicroservices-0.0.1.jar
RUN mvn package -DskipTests

##
### Package Stage: A minimal docker image with the command to run the Microservice 
##
FROM openjdk:8-jdk-alpine
WORKDIR /app

# Copy from Source Image environment to executable folder for Entrypoint
COPY --from=build /app/target/bookmicroservices-0.0.1-SNAPSHOT.jar /app/app.jar

# Public Port: [!Change if not using Docker-Compose!]
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]