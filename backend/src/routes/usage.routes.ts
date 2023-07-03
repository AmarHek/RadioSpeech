import express from "express";
import * as UsageController from "../controllers/usage.controller";

export const usageRouter = express.Router()
usageRouter.post("/addRadiolearnRegular/", UsageController.saveRadiolearnDataRegular);
usageRouter.post("/addDoctorReport/", UsageController.saveDoctorReport);
