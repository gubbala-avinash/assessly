// backend/routes/assignments.js
const multer = require('multer');
const path = require('path');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save with original name
  },
});

const upload = multer({ storage });

// Endpoint to submit assignments
router.post('/', upload.single('file'), async (req, res) => {
  const newAssignment = new Assignment({
    studentId: req.body.studentId, // Assuming you're passing this in the body
    filePath: req.file.path, // Store the path
  });

  try {
    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (err) {
    res.status(500).json(err);
  }
});

