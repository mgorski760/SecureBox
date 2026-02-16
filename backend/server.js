require('dotenv').config();

const cors = require('cors')
const express = require('express')
const app = express()
const dns = require('dns');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10; // Cost factor for hashing

dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PWD = process.env.MONGODB_PWD
const MONGODB_SERVER = process.env.MONGODB_SERVER

app.use(cors({
    origin: ['http://localhost:5173']
    //TODO: Assign routes for backend to be connected to.
}))

app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PWD}${MONGODB_SERVER}`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//database
let db;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    db = client.db("securebox_db");
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.post('api/register', async (req, res) => {
    
  try{
    const {username, email, password} = req.body;


    //Check if user already exists in the Database.
    const existingUser = await db.collection('users').findOne({
      $or: [{username}, {email}]
    });

    if(existingUser){
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    //Encrypt password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await db.collection('users').insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error){
    res.status(500).json({ error: 'Server error. Failed to add user.' });
  }

    


})