const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const resourceRoutes = require('./routes/resourceRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use(cors());

// Basic route to check API status
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Use the route modules
app.use('/api', resourceRoutes); 
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB:',err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});