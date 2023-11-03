"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatientInfoByID = exports.updatePatientInfo = exports.createPatientInfo = exports.getPatientInfoByID = exports.getAllPatientInfo = void 0;
const patient_1 = require("../model/patient");
const appError_1 = __importDefault(require("../utils/appError"));
const getAllPatientInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientInfo = yield patient_1.Patient.find();
        if (patientInfo.length === 0) {
            return next(new appError_1.default("Not found patient infomation", 404));
        }
        return res.status(200).json({
            status: "Success",
            message: "Get patient successfully",
            data: patientInfo,
        });
    }
    catch (error) {
        return res.status(400).json({
            status: "Failed",
            message: error.message,
        });
    }
});
exports.getAllPatientInfo = getAllPatientInfo;
const getPatientInfoByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const patient = yield patient_1.Patient.findById(id);
        if (!patient) {
            return next(new appError_1.default("Not found patient infomation", 404));
        }
        return res.status(200).json({
            status: "Success",
            message: "Get patient successfully",
            data: patient,
        });
    }
    catch (error) {
        return res.status(400).json({
            status: "Failed",
            message: error.message,
        });
    }
});
exports.getPatientInfoByID = getPatientInfoByID;
const createPatientInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const existingPatient = yield patient_1.Patient.findOne({
            firstname: body.firstname,
            lastname: body.lastname,
        });
        if (existingPatient) {
            return next(new appError_1.default("Patient with the same firstname and lastname already exists", 400));
        }
        const newPatient = yield patient_1.Patient.create(body);
        return res.status(201).json({
            status: "Success",
            message: "Create patient successfully",
            data: newPatient,
        });
    }
    catch (error) {
        return res.status(400).json({
            status: "Failed",
            message: error.message,
        });
    }
});
exports.createPatientInfo = createPatientInfo;
const updatePatientInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updated = req.body;
        const patientInfo = yield patient_1.Patient.findByIdAndUpdate(id, updated, {
            new: true,
        });
        return res.status(200).json({
            status: "Success",
            message: "Update patient successfully",
            data: patientInfo,
        });
    }
    catch (error) {
        return res.status(400).json({
            status: "Failed",
            message: error.message,
        });
    }
});
exports.updatePatientInfo = updatePatientInfo;
const deletePatientInfoByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const patientInfo = yield patient_1.Patient.findByIdAndDelete(id);
        if (!patientInfo) {
            return next(new appError_1.default("Not found patient with that ID", 404));
        }
        return res.status(200).json({
            status: "Success",
            message: "Update patient successfully",
            data: null,
        });
    }
    catch (error) {
        return res.status(400).json({
            status: "Failed",
            message: error.message,
        });
    }
});
exports.deletePatientInfoByID = deletePatientInfoByID;
