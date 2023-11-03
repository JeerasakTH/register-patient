import { Router } from "express";

import {
  createPatientInfo,
  deletePatientInfoByID,
  getAllPatientInfo,
  getPatientInfoByID,
  updatePatientInfo,
} from "../controller/patient";

const router = Router();

router.route("/").get(getAllPatientInfo).post(createPatientInfo);
router
  .route("/:id")
  .get(getPatientInfoByID)
  .patch(updatePatientInfo)
  .delete(deletePatientInfoByID);

export default router;
