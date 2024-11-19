const errorHendler = require("../utils/errorHandler");

const Record = require("../models/Record");

module.exports.getAll = async (req, res) => {
  try {
    const records = await Record.find({ user: req.user.id });
    res.status(200).json(records);
  } catch (e) {
    errorHendler(res, e);
  }
};

module.exports.newRecord = async (req, res) => {
  const record = new Record({
    //date will be added by mongoose automatically
    user: req.user.id,
    imgSrc: req.file?.path || "../uploads/placeHolderImg.png",
    description: req.body.description,
    mintemp: req.body.mintemp,
    maxtemp: req.body.maxtemp,
    wind: req.body.wind,
  });

  try {
    await record.save();
    res.status(201).json(record);
  } catch (e) {
    errorHendler(res, e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    res.status(200).json(record);
  } catch (e) {
    errorHendler(res, e);
  }
};

module.exports.updRecord = async (req, res) => {
  const updated = {
    user: req.user.id,
    description: req.body.description,
  };

  if (req.file) {
    updated[imgSrc] = req.file.path;
  }

  try {
    const record = await Record.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    );
    res.status(201).json(record);
  } catch (e) {
    errorHendler(res, e);
  }
};

module.exports.deleteRecord = async (req, res) => {
  try {
    await Record.remove({ _id: req.params.id });
    res.status(200).json("Record was removed");
  } catch (e) {
    errorHendler(res, e);
  }
};
