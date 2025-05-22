// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const dotenv = require('dotenv').config();


// const app = express();
// app.use(cors());
// app.use(express.json());

// const port = process.env.PORT || 3000;

// console.log(port);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// }
// );




// // ATWYUqmZfOYc9txC

// const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.onrfrlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";`

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     const plants = client.db("plantsdb").collection("plants");
//     app.post('/plants', async (req, res) => {
//       const plant = req.body;
      
//       const result = await plants.insertOne(plant);
//       res.send(result);
//     }
//     );



//     app.get('/plants', async (req, res) => {
//       const cursor = plants.find();
//       const result = await cursor.toArray();
//       res.send(result);
//     })
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);












// app.listen(port, () => {
//   console.log(`http://localhost:${port}`);
// }
// );



// jbhbb

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
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
    app.post('/plants', async (req, res) => {
      const plant = req.body;
      const result = await plants.insertOne(plant);
      res.send(result);
    });

    // GET: Get all plants
    app.get('/plants', async (req, res) => {
      const cursor = plants.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // GET: Get plant by id
    app.get('/plants/:id', async (req, res) => {
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

    // PUT: Update plant by id
    // app.put('/plants-update/:id', async (req, res) => {
    //   const { id } = req.params;
    //   const updatedData = req.body;
    //   try {
    //     const filter = { _id: new ObjectId(id) };
    //     const updateDoc = { $set: updatedData };
    //     const result = await plants.updateOne(filter, updateDoc);

    //     if (result.matchedCount === 0) {
    //       return res.status(404).send({ success: false, message: "Plant not found" });
    //     }

    //     res.send({ success: true, message: "Plant updated successfully" });
    //   } catch (error) {
    //     console.error("PUT /plants-update/:id failed:", error);
    //     res.status(500).send({ success: false, message: "Failed to update plant" });
    //   }
    // });



app.put('/plants-update/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const updatedData = req.body;
            const updatedDoc = {
                $set: updatedData
            }
            const result = await plants.updateOne(filter, updatedDoc);
            res.send(result)
        })





    // DELETE: Delete plant by ID
    app.delete('/plants/:id', async (req, res) => {
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
    console.log("✅ Connected to MongoDB");

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
