# Car Tracking

## Description

This project is built using **NestJS** and requires **Node.js version 20** to run. It leverages **TypeORM** as the ORM for managing the database.

## Prerequisites

1. **Node.js**: Version 20 is required. Ensure it's installed on your machine.
2. **MySQL**: A database must be created before running the application to avoid errors.

## Setup Instructions

### Step 1: Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone <repository_url>
```

### Step 2: Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

### Step 3: Configure the Database

1. Create a MySQL database.
2. By default, migrations are set to run automatically. However, you can modify this setting if you prefer manual migrations.
   - To run migrations manually, use the following command:
     ```bash
     npm run migration:run
     ```

### Step 4: Run the Application

You can run the application using the predefined scripts in the `package.json` file. Below are some commonly used commands:

#### Development Mode

```bash
npm run start:dev
```

#### Production Mode

```bash
npm run start:prod
```

#### Debug Mode

```bash
npm run start:debug
```

## Available Scripts

Here is a list of scripts available in the `package.json` file:

- **Build the project:**
  ```bash
  npm run build
  ```
- **Format code:**
  ```bash
  npm run format
  ```
- **Lint code:**
  ```bash
  npm run lint
  ```
- **Run tests:**
  ```bash
  npm run test
  ```
- **Watch tests:**
  ```bash
  npm run test:watch
  ```
- **Run end-to-end tests:**
  ```bash
  npm run test:e2e
  ```
- **Run migrations:**
  ```bash
  npm run migration:run
  ```
- **Generate a migration:**
  ```bash
  npm run migration:generate --name=<migration_name>
  ```
- **Revert a migration:**
  ```bash
  npm run migration:revert
  ```

## Additional Notes

- Ensure your database credentials are properly configured in the application's environment file or configuration files.
- If you encounter any issues with migrations, double-check the database connection settings and ensure the TypeORM configuration is correct.

## Contributing

Feel free to contribute to the project by submitting issues or creating pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
