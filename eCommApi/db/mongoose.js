const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/restApi')
        .then(()=>{console.log("connection sucess");})
        .catch((error)=>{console.log("error is ",error);});