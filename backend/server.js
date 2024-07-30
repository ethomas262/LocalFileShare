
//import dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const serveIndex = require('serve-index')
const fileUpload = require('express-fileupload')
const passport = require('passport');


require('dotenv').config()

const app = express()


require('./app_api/Models/message');

const apiRouter = require('./app_api/routes/index');
const fileRouter = require('./app_api/routes/files')

//define app toolkit
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//upload file middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: { fileSize: 2 * 1024 * 1024 },
  })
)

// Enable CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND );
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/public/ftp', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

app.use('/files', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/upload', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/files', fileRouter);
app.use('/api', apiRouter);

app.use(
  '/public/ftp',
  express.static('public/ftp'),
  serveIndex('public/ftp', { icons: true })
)
const mongoose = require('mongoose');
const Model = mongoose.model('file');

app.post('/upload', async (req, res, next) => {
  try {
    const file = req.files.mFile
    console.log(file)
    const fileName = new Date().getTime().toString() + path.extname(file.name)
    const savePath = path.join(__dirname, 'public', 'ftp', fileName)
    if (file.truncated) {
      throw new Error('File size is too big...')
    }
    
    await file.mv(savePath)
    
    const newFile = await Model.create({
            name: file.name,
            url: fileName,
            link: "http://localhost:3000/files/download?name=" + fileName
        })
      .then((data) => {
      res.redirect("http://localhost:4200/main-app")
      })


  
  } catch (error) {
    console.log(error)
    res.send('Error uploading file')
  }
})


const server = app.listen(3000,'0.0.0.0');

console.log('Server listening on port 3000...')



