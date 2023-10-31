import mongoose from 'mongoose';
import {DoctorReport} from "./material.model";

const doctorReportScheme = new mongoose.Schema({
    template: {type: [mongoose.Schema.Types.Mixed]},
    timestamp: {type: Number},
    duration: {type: Number},
    imageID: {type: String},
    layoutID: {type: Number},
    mode: {type: String},
    report: {type: String},
    pseudonym: {type: String}
})

export const DoctorReportDB = mongoose.model<DoctorReport>("DoctorReport", doctorReportScheme, "doctorReports")