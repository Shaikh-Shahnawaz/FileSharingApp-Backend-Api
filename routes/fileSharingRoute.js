const express = require('express')
const { uploadFile } = require('../controllers/fileSharingController')
const { upload } = require('../utils/multer')

const router = express.Router()


router.post('/uploadfile',upload, uploadFile)


module.exports = router