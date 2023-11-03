"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patient_1 = require("../controller/patient");
const router = (0, express_1.Router)();
router.route("/").get(patient_1.getAllPatientInfo).post(patient_1.createPatientInfo);
router
    .route("/:id")
    .get(patient_1.getPatientInfoByID)
    .patch(patient_1.updatePatientInfo)
    .delete(patient_1.deletePatientInfoByID);
exports.default = router;
