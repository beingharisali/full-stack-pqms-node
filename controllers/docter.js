import Docter from "../models/docter.js";
import mongoose from "mongoose";

export const createDocter = async (req, res) => {
  try {
    const { name, specialization, availability } = req.body;

    const docter = await Docter.create({
      name,
      specialization,
      availability,
    });

    res.status(201).json({
      success: true,
      data: docter,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDocters = async (req, res) => {
  try {
    const docters = await Docter.find({});
    res.status(200).json({
      success: true,
      count: docters.length,
      data: docters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDocter = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Doctor ID",
      });
    }

    const docter = await Docter.findById(id);

    if (!docter) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: docter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDocter = async (req, res) => {
  try {
    const { id } = req.params;

    const docter = await Docter.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!docter) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: docter,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDocter = async (req, res) => {
  try {
    const { id } = req.params;

    const docter = await Docter.findByIdAndDelete(id);

    if (!docter) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
