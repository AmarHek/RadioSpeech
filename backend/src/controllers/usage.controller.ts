import {Response} from "express";
import {UsageData} from "../models/material.model";
import {DoctorReportDB, ParticipantDB} from "../models";

function handleError(err: NativeError){
    console.log("Error querying for participant: " + err.message)
}

export function saveDoctorReport(req: any, res: Response) {

    console.log("Received Doctor report")

    const doctorReport = new DoctorReportDB({
        template: req.body.template,
        timestamp: req.body.timestampStart,
        duration: req.body.duration,
        imageID: req.body.imageID,
        layoutID: req.body.layoutID,
        mode: req.body.mode,
        report: req.body.report
    });

    doctorReport.save(function (err){
        if (err){
            console.log("Saving doctor report failed: " + err.message)
            res.status(500).send({success: false,
                message: "Saving doctor report failed: " + err.message})
        } else {
            console.log("Successfully saved new doctor report.")
            res.status(200).send({success: true, message: "Successfully saved new doctor report."})
        }
    })
}

export function saveUsageData(req: any, res: Response) {

    console.log("----------------------received material id: " + req.body.materialID)
    const usageData: UsageData = {
        materialID: req.body.materialID,
        deepDocTemplate: req.body.deepDocTemplate,
        shallowDocTemplate: req.body.shallowDocTemplate,
        mode: req.body.mode,
        timestamp: req.body.timestamp,
        duration: req.body.duration,
        ogMaterial: req.body.ogMaterial,
        resetCounter: req.body.resetCounter
    }

    const query = ParticipantDB.findOne({'UUID': req.body.UUID});
    query.exec(function (err, participant){
        if (err) {
            return handleError(err);
        }
        if (participant == null) {
            console.log("No matching participant found, creating entry:")
            const usageList: UsageData[] = []
            usageList.push(usageData)
            const participant = new ParticipantDB({
                UUID: req.body.UUID,
                usageList: usageList
            });
            participant.save(function (err){
                if (err){
                    console.log("Saving participant failed: " + err.message)
                    res.status(500).send({success: false,
                        message: "Saving participant failed: " + err.message})
                } else {
                    console.log("Successfully saved new participant.")
                    res.status(200).send({success: true, message: "Successfully saved new participant."})
                }
            })
        } else {
            participant.usageList.push(usageData)
            participant.save(function (err){
                if(err){
                    console.log("Updating participant failed: " + err.message)
                    res.status(500).send({success: false,
                        message: "Updating participant failed: " + err.message})
                }else {
                    console.log("Successfully updated participants usage data")
                    res.status(200).send({success: true,
                        message: "Successfully updated participants usage data"})
                }
            })
        }
    });
}