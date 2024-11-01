import createUsersTable from "./users/init.js";
import createProductTypesTable from "./product_types/init.js";
import createServiceTypesTable from "./service_types/init.js";
import createProductsTable from "./products/init.js";
import createServicesTable from "./services/init.js";
import createProductSalesTable from "./product_sales/init.js";
import createServiceSalesTable from "./service_sales/init.js";
import createProductCommentsTable from "./product_comments/init.js";
import createServiceCommentsTable from "./service_comments/init.js";
import createProductImagesTable from "./product_images/init.js";
import createServiceImagesTable from "./service_images/init.js";
import createCommunityPostsTable from "./community_posts/init.js";

const initDatabase = async () => {
  await createUsersTable();
  await createProductTypesTable();
    await createServiceTypesTable();
    await createProductsTable();
    await createServicesTable();
    await createProductSalesTable();
    await createServiceSalesTable();
    await createProductCommentsTable();
    await createServiceCommentsTable();
    await createProductImagesTable();
    await createServiceImagesTable();
    await createCommunityPostsTable();
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
