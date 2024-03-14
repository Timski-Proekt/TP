# Use a base image with Maven and Java 21 for building
FROM maven:3.9.6-amazoncorretto-21-al2023 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .

# Download dependencies and cache them in the Docker layer
RUN mvn dependency:copy-dependencies

# Copy the application source code
COPY src ./src

# Build the application
RUN mvn package -DskipTests

# Use a lighter base image for the runtime
FROM openjdk:21-slim

# Set the working directory in the container
WORKDIR /app

# Copy the packaged jar file from the build stage to the current directory in the container
COPY --from=build /app/target/vozacka-mk-0.0.1-SNAPSHOT.jar .

# Expose the port that the Spring Boot application will run on
EXPOSE 8080

# Specify the command to run the Spring Boot application when the container starts
CMD ["java", "-jar", "vozacka-mk-0.0.1-SNAPSHOT.jar"]
