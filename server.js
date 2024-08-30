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

app.get('/', (req, res)=> {
    res.send('API is running...'); 

});  //basic route

app.use('/api', resourceRoutes); 
app.use('/api',userRoutes);
app.use('/api', categoryRoutes);

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.get('/api/resources',(req,res) =>{
    
    res.json ([
        {id:1, name: 'Food Bank', category:'Food'},
        {id:2, name:'Clothing Donation', catergory: 'Clothing'},
        {id:3, name:'ESL Classes', category:  'Education'}


    ]); // This is using an API route to fetch resources
}); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});


