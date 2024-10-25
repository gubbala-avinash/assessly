// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const assignmentRoutes = require('./routes/assignments');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/assignments', assignmentRoutes);

// Endpoint to download a PDF assignment
app.get('/api/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename); // Ensure this matches your uploads directory

  res.download(filePath, (err) => {
    if (err) {
      console.error('File download error:', err);
      res.status(500).send('Could not download the file.');
    }
  });
});
router.get('/download/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', fileName);
  console.log(`Requesting file at path: ${filePath}`);

  res.download(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('File not found');
    }
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
