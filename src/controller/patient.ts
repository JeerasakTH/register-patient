import { RequestHandler } from "express";

import { Patient } from "../model/patient";
import AppError from "../utils/appError";

interface CreatePatientRequestBody {
  firstname: string;
  lastname: string;
  date_of_birth: Date;
  gender: string;
  address: string;
  phone_number: string;
  email: string;
  blood_type: string;
  height: number;
  weight: number;
  insurance: Insurance;
  medical_history: MedicalHistory[];
}

interface Insurance {
  name: string;
  policy_number: string;
}

interface MedicalHistory {
  condition: string;
  diagnosis_date: Date;
}

export const getAllPatientInfo: RequestHandler = async (req, res, next) => {
  try {
    const patientInfo = await Patient.find();

    if (patientInfo.length === 0) {
      return next(new AppError("Not found patient infomation", 404));
    }

    return res.status(200).json({
      status: "Success",
      message: "Get patient successfully",
      data: patientInfo,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const getPatientInfoByID: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) {
      return next(new AppError("Not found patient infomation", 404));
    }

    return res.status(200).json({
      status: "Success",
      message: "Get patient successfully",
      data: patient,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const createPatientInfo: RequestHandler = async (req, res, next) => {
  try {
    const body: CreatePatientRequestBody = req.body;

    const existingPatient = await Patient.findOne({
      firstname: body.firstname,
      lastname: body.lastname,
    });

    if (existingPatient) {
      return next(
        new AppError(
          "Patient with the same firstname and lastname already exists",
          400
        )
      );
    }

    const newPatient = await Patient.create(body);

    return res.status(201).json({
      status: "Success",
      message: "Create patient successfully",
      data: newPatient,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const updatePatientInfo: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated: CreatePatientRequestBody = req.body;
    const patientInfo = await Patient.findByIdAndUpdate(id, updated, {
      new: true,
    });

    return res.status(200).json({
      status: "Success",
      message: "Update patient successfully",
      data: patientInfo,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const deletePatientInfoByID: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patientInfo = await Patient.findByIdAndDelete(id);

    if (!patientInfo) {
      return next(new AppError("Not found patient with that ID", 404));
    }

    return res.status(200).json({
      status: "Success",
      message: "Update patient successfully",
      data: null,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};
