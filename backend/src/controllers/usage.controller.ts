import {Response} from "express";
import {DoctorReportDB} from "../models";

export function saveDoctorReport(req: any, res: Response) {

    try {
        console.log("Received Doctor report");

        const doctorReport = new DoctorReportDB({
            template: req.body.template,
            timestampStart: req.body.timestampStart,
            duration: req.body.duration,
            imageID: req.body.imageID,
            layoutID: req.body.layoutID,
            mode: req.body.mode,
            report: req.body.report,
            pseudonym: req.body.pseudonym
        });

        doctorReport.save().then(() => {
            console.log("Successfully saved new doctor report.");
            res.status(200).send({success: true, message: "Successfully saved new doctor report."})}
        );
    } catch(err) {
        console.log("Saving doctor report failed: " + err)
        res.status(500).send({success: false,
            message: "Saving doctor report failed: " + err})
    }
}
