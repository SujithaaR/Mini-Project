// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/authRoutes');
// const projectRoutes = require('./routes/projectRoutes');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));


// app.use('/api', authRoutes);
// app.use('/api', projectRoutes);


// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3001;

// Use built-in middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', authRoutes);
app.use('/api', projectRoutes);
app.use('/api',userRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

