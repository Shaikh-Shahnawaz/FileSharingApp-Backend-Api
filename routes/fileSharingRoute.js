const express = require('express')
const { uploadFile,showAllFiles } = require('../controllers/fileSharingController')
const { upload } = require('../utils/multer')

const router = express.Router()


router.post('/uploadfile',upload, uploadFile)
router.get('/all', showAllFiles); 


module.exports = router