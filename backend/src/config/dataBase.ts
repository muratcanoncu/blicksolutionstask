import mongoose, { ConnectOptions } from "mongoose";

const dataBaseUri: string =
  process.env.MONGODB_URI ||
  "mongodb+srv://shopifyuser:blick123shopify@blicksolutionsdb.nydqghm.mongodb.net/?appName=blickSolutionsDB";

const clientOptions: ConnectOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

// Async function to connect to MongoDB
export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(dataBaseUri, clientOptions);
    console.log("Database is successfully connected");
  } catch (error: any) {
    console.error("Database connection failed:", error.message);
    process.exit();
  }
}