# Stage 1: Build application with Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Production JRE Runtime Image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/media-club-backend-1.0.0-SNAPSHOT.jar app.jar
EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=prod
ENTRYPOINT ["java", "-jar", "app.jar"]
