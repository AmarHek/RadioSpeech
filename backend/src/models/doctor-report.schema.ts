import mongoose from 'mongoose';
import {DoctorReport} from "./doctor-report.model";

const doctorReportSchema = new mongoose.Schema({
    template: {type: [mongoose.Schema.Types.Mixed]},
    timestampStart: {type: Number},
    duration: {type: Number},
    imageID: {type: String},
    layoutID: {type: Number},
    mode: {type: String},
    report: {type: String},
    pseudonym: {type: String}
})

export const DoctorReportDB = mongoose.model<DoctorReport>("DoctorReport", doctorReportSchema, "doctorReports")
