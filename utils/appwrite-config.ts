import { Account, Client, Databases, ID, Permission, Role } from "appwrite";

const client = new Client()
  .setEndpoint(
    process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ||
      "https://nyc.cloud.appwrite.io/v1"
  )
  .setProject(
    process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "688dd2820025605818f1"
  );

export const account = new Account(client);
export const databases = new Databases(client);
export const appwriteClient = client;

// Export ID, Permission, and Role for use in other files
export { ID, Permission, Role };
