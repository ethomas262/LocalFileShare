const fileUpload = require('express-fileupload')
const path = require('path')

const mongoose = require('mongoose');
const file = require('../Models/files');
const Model = mongoose.model('file');

const addFile = async (req, res, next) => {
    try{
        const file = req.mFile;
        console.log(file);
        const fileName = new Date().getTime().toString() + path.extname(file.name);
        const savePath = path.join(__dirname, '..', '..','..','public', 'ftp');
        if (file.truncated){
            throw new Error('File size is too big...')
        }
        await file.mv(savePath);
        
        const newFile = await Model.create({
            name: file.name,
            url: fileName,
            link: "http://localhost:3000/files/download?name=" + fileName
        })
        


    }
    catch(error) {
        console.log(error)
        res.send('error uploading file')
    }
}
const getFiles = async (req, res) =>{
    const z = await Model
        .find({}).sort('name').exec()
    
    if(!z){
        return res
            .status(404)
            .json(err)
    }
    else{
        return res
            .status(200)
            .json(z)
    }
}
const downloadFile = async (req, res) => {
    //get File name from request body
    let file_name = req.query.name
    
    //Define path to file using the file name and the public folder
    const downloadPath = path.join(__dirname, '..', '..','public', 'ftp',file_name);

    //serve the file 
    res.download(downloadPath, function (error) {
        console.log("Error : ", error)
    });
}



module.exports = {
    addFile,
    getFiles,
    downloadFile
}
