// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); 



const app = express();
const port = 5000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Connect to MongoDB
const uri='mongodb+srv://omprakashchawdhary1:8979541203@cluster0.nnrjxcn.mongodb.net/pg_week1?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(error => {
  console.log(error);
  console.error('Error connecting to MongoDB:', error);
});

// Use User routes
app.use('/api', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
