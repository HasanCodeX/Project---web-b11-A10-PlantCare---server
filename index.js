const express = require("express");
const cors = require("cors");


const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send({ message: "🌱 Plant Care Tracker API is running!" });
});

// MongoDB URI
const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.onrfrlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const plants = client.db("plantsdb").collection("plants");

    // POST: Add new plant
    app.post("/plants", async (req, res) => {
      const plant = req.body;
      const result = await plants.insertOne(plant);
      res.send(result);
    });

    // Get all plants
    app.get("/plants", async (req, res) => {
      const cursor = plants.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //  Get plant by id
    app.get("/plants/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const plant = await plants.findOne({ _id: new ObjectId(id) });
        if (!plant) return res.status(404).send({ error: "Not found" });
        res.send(plant);
      } catch (err) {
        console.error("Error fetching plant:", err);
        res.status(500).send({ error: "Failed to fetch plant" });
      }
    });

    app.put("/plants-update/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedData = req.body;
      const updatedDoc = {
        $set: updatedData,
      };
      const result = await plants.updateOne(filter, updatedDoc);
      res.send(result);
    });

    //  Delete plant by ID
    app.delete("/plants/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      try {
        const result = await plants.deleteOne(query);
        if (result.deletedCount === 1) {
          res.send({ success: true, message: "Plant deleted successfully" });
        } else {
          res.status(404).send({ success: false, message: "Plant not found" });
        }
      } catch (error) {
        console.error("Delete failed:", error);
        res.status(500).send({ success: false, message: "Server error" });
      }
    });

    // Confirm DB connection
    await client.db("admin").command({ ping: 1 });
    console.log(" 🌱 Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
