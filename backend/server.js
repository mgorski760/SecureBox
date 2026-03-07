require('dotenv').config();

const cors = require('cors')
const express = require('express')
const app = express()
const dns = require('dns');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SALT_ROUNDS = 10; // Cost factor for hashing
const JWT_SECRET = process.env.JWT_SECRET

//Routing to fix issues with mongo auth.
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
    await client.connect();
    db = client.db("securebox_db");
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Start server after DB connection is established
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}
run().catch(console.dir);

app.post('/api/register', async (req, res) => {
    
  try{
    const {email, password} = req.body;

    //Check if user already exists in the Database.
    const existingUser = await db.collection('users').findOne({
      $or: [{email}]
    });

    if(existingUser){
      return res.status(400).json({ error: 'Email already exists. Please login in instead.' });
    }

    //Encrypt password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error){
    res.status(500).json({ error: 'Server error. Failed to add user.' });
  }
})

app.post('/api/login', async (req, res) => {

  console.log("User is attempting to login.")

  try{
    const {email, password} = req.body;

    //Pull the user from the Database.
    const existingUser = await db.collection('users').findOne({
      $or: [{email}]
    });

    if(!existingUser){
      return res.status(400).json({error: 'Email does not exist within our database. Please register and create an account.'})
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password)

    if(!isValidPassword){
      return res.status(401).json({error: 'Invalid credentials'})
    }

    const token = jwt.sign(
      {userId: existingUser.id, email: existingUser.email},
      process.env.JWT_SECRET,
      {expiresIn: '1hr'}
    )

    res.json({token, message: "Login successful"})


  } catch (error){
    console.error(error);
    res.status(500).json({ error: 'Server error. Failed to login user.'})
  }
})





process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
