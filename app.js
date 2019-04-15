
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const mime = require('mime');
const { Storage } = require('@google-cloud/storage');
var formidable = require('formidable');

const keyFilename="./uploadfilestonode-firebase-adminsdk-vifhf-80404ec328.json"; //replace this with api key file
const projectId = "uploadfilestonode" //replace with your project id
const bucketName = "uploadfilestonode.appspot.com";


const storage = new Storage({
    projectId,
    keyFilename
});

const bucket = storage.bucket(bucketName);

/* <input type="file" [formControl]="profImg"/> */

const filePath = './mountains.jpg';
const uploadTo = '' +filePath;
//const fileMime = mime.lookup(filePath);


bucket.upload(filePath,{
    destination:uploadTo,
    public:true,
    metadata: {contentType: 'image/jpeg',cacheControl: "public, max-age=300"}
}, function(err, file) {
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(createPublicFileURL(uploadTo));
});


function createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;

}

app.listen(3000, function() {
console.log("Server running 3000");
});










