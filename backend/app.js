const cors = require('cors')
const express = require('express')
const app = express();

app.use(cors({
    origin: []
    //TODO: Assign routes for backend to be connected to.
}))

app.use(express.json())