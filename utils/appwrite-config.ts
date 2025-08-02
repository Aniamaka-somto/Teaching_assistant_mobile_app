import { Account, Client } from "react-native-appwrite";

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1") // Replace with your region (e.g., 'us-east')
  .setProject("688dd2820025605818f1") // Replace with your Project ID
  .setPlatform("com.somtoaniams.tav"); // Replace with your app's package name

export const account = new Account(client);
export const appwriteClient = client;
