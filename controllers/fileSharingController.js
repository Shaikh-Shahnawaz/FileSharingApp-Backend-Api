const fileSharing = require("../models/sharingAppModal");
const { upload } = require("../utils/multer");
const { v4: uuid4 } = require("uuid");
const { response } = require("express");

exports.uploadFile = async (req, res) => {
  
  try {
    console.log("File upload request received",req.file);
    /// 3 step to do
    // validate req
    // store file
    // store database
    if (!req.file) {
      return res.json({ error: "All fields are reqired." });
    }

    const file = await new fileSharing({
      filename: req.file.filename,
      path: req.file.path,
      uuid: uuid4(),
      size: req.file.size,
    }).save();

    res.json({
      message: "Success",
      data: file,
      file: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
    });
    
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
exports.showAllFiles = async (req, res) => {
  try {
    // Fetch all files from DB
    const files = await fileSharing.find();

    // Map the files to include a full link
    const filesWithLinks = files.map((file) => ({
      filename: file.filename,
      size: file.size,
      uuid: file.uuid,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
      viewLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`
    }));

    res.json({
      message: "Success",
      total: files.length,
      files: filesWithLinks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while fetching files" });
  }
};

exports.showSingleFile = async (req, res) => {
  try {
    // first check wheter file of that params are available or not
    const file = await fileSharing.findOne({ uuid: req.params.uuid });

    if (!file) {
      return res.render("download", { error: "Link has been expired." });
    }

    return res.render("download", {
      uuid: file.uuid,
      fileName: file.filename,
      fileSize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    });
  } catch (error) {
    console.log(error);
    // throw new Error(error)
    return res.render("download", { error: "Something went wrong" });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    // first check wheter file of that params are available or not
    const file = await fileSharing.findOne({ uuid: req.params.uuid });

    if (!file) {
      return res.render("download", { error: "Link has been expired." });
    }

    const filePath = `${__dirname}/../${file.path}`;

    res.download(filePath);
  } catch (error) {
    console.log(error);
    // throw new Error(error)
    return res.render("download", { error: "Something went wrong" });
  }
};
