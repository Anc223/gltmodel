const express = require('express');
const router = express.Router();
const { uploadModel, getAllModels, getModelById, upload } = require('./glb-backend/Controller');

router.post('/upload', upload.single('file'), uploadModel);
router.get('/models', getAllModels);
router.get('/models/:id', getModelById);

module.exports = router;
