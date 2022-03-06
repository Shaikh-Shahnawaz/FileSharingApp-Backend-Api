const fileSharing = require("../models/sharingAppModal");
const { upload } = require("../utils/multer");
const { v4: uuid4 } = require("uuid");
const { response } = require("express");

exports.uploadFile = async (req, res) => {
  
  try {
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

exports.showFile = async (req, res) => {
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
