const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
require('dotenv').config();

let gfs;

function setGFS(conn) {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('models');
}

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: 'models',
    };
  },
});

const upload = multer({ storage });

const uploadModel = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({ file: req.file });
};

const getAllModels = async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'No files found' });
    }
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getModelById = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const readstream = gfs.createReadStream({ _id: file._id });
    res.set('Content-Type', file.contentType);
    readstream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {upload,uploadModel,getAllModels,getModelById,setGFS};
