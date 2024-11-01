import createUsersTable from "./users/init.js";

const initDatabase = async () => {
  await createUsersTable();
};

const startInitialization = async () => {
  console.log("Attempting database initialization...");
  try {
    await initDatabase();
    console.log("Database initialization successful.");
    process.exit(0);
  } catch (error) {
    console.error("Database initialization failed:", error.message);
    process.exit(1);
  }
};

startInitialization();
