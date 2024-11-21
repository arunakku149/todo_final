# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-jammy AS builder

# Set the working directory for the build process
WORKDIR /app

# Copy the Maven wrapper and the pom.xml to the working directory
COPY TodoApp/mvnw /app/
COPY TodoApp/pom.xml /app/
COPY TodoApp/.mvn /app/.mvn

# Ensure mvnw is executable
RUN chmod +x mvnw

# Copy the rest of the project files to the container
COPY TodoApp /app/

# Run the Maven build using the wrapper
RUN ./mvnw package -DskipTests

# Stage 2: Create runtime image
FROM eclipse-temurin:17-jre-jammy

# Set the working directory in the runtime image
WORKDIR /app

# Copy the JAR file from the build stage to the runtime image
COPY --from=builder /app/target/TodoApp-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Define the entry point to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
