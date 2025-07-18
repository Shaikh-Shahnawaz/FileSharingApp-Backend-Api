

const { showSingleFile, downloadFile } = require('../controllers/fileSharingController')

const router = require('express').Router()


router.get('/:uuid',showSingleFile)
router.get('/download/:uuid',downloadFile)


module.exports = router