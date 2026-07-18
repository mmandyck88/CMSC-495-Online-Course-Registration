# Online Course Registration System

Welcome to the Online Course Registration System, developed for the CMSC 495 Computer Science Capstone. This guide provides instructions for setting up the project locally.

## Prerequisites

* **Java Development Kit (JDK):** Version 17 or higher.
* **MySQL Server:** Version 8.0+ running on port `3306`.
* **Git:** For version control.

## Setup Instructions

### 1. Database Initialization

Ensure your MySQL server is running, then create the database:

```sql
CREATE DATABASE registrationdb;
````

### 2. Configure Environment Variables
This project uses a .env file to manage sensitive database credentials securely.

1. Locate the .env.example file in the project root directory. 
2. Create a copy of this file and rename it to .env. 
3. Open the .env file and input your local MySQL credentials:

```` 
DB_USER=your_username
DB_PASSWORD=your_password
````

Security Note: Never commit your .env file to version control. It is already added to .gitignore.

### 3. Build the Project
We use the Gradle Wrapper (gradlew) to manage dependencies. Run these commands in your project root:

Windows (PowerShell):
```
.\\gradlew clean build
``` 

macOS/Linux (bash):
```
./gradlew clean build
```

#### 4. Run the Application
Once the build is successful, execute the application:

Windows (PowerShell):
````
.\\gradlew run
````

macOS/Linux (bash):
````
./gradlew run
````

## Troubleshooting
- Connection Errors: Verify your MySQL server is active and that your credentials in the .env file are accurate.

- Missing .env Variables: If you encounter IllegalStateException, ensure your .env file exists in the root directory and contains both DB_USER and DB_PASSWORD.

- Build Failures: Run ./gradlew clean before rebuilding to clear cached build artifacts.

Passwords for Students and Admin:
Login examples are:
MaryWashington / Student123! 
JaneSmith / Student456! and 
AdminUser / Admin123!