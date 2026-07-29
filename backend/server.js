require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const projectRoutes = require('./routes/projects');
app.use('/api/projects', projectRoutes);

// Contact route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`New Contact from ${name} (${email}): ${message}`);
  // In a real app, save this to DB or send an email
  res.status(200).json({ success: true, message: 'Message received successfully!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
