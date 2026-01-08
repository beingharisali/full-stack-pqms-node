const Patient = require("../models/patient.js");
const mongoose = require("mongoose");

const createPatient = async (req, res) => {
  try {
    const { name, age, history } = req.body;

    const patient = await Patient.create({
      name,
      age,
      history,
    });

    res.status(201).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const { sortBy, order } = req.query;

    let sortOptions = {};

    if (sortBy === "name") {
      sortOptions.name = order === "desc" ? -1 : 1;
    } else if (sortBy === "age") {
      sortOptions.age = order === "desc" ? -1 : 1;
    }

    const patients = await Patient.find({}).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPatient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Patient ID",
      });
    }

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, history } = req.body;

    const patient = await Patient.findByIdAndUpdate(
      id,
      { name, age, history },
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findByIdAndDelete(id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
};
