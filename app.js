const express = require('express')
require("dotenv").config();
const cors = require("cors");
const fileSharingRoute = require('./routes/fileSharingRoute') 
const showFileRoute = require('./routes/showFileRoute') 

const app = express()

const path = require('path')

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Template engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'))

// static file (css/images)
app.use(express.static('public'))

// Routes
app.use("/api/filesharing",fileSharingRoute)
app.use("/files",showFileRoute)



module.exports = app