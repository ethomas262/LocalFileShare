const express = require('express');
const router = express.Router();

const fileController = require('../Controllers/fileservice.js');

router .route('/').get(fileController.getFiles).post(fileController.addFile);

router .route('/download').get(fileController.downloadFile)

module.exports = router;