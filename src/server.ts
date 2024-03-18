require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function run() {
  console.log("Connecting to MongoDB...");
  try {
    await client.connect();
    await client.db("Nasa").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (e) {
    console.error("Error connecting to MongoDB: ", e);
  } finally {
    await client.close();
  }
}
