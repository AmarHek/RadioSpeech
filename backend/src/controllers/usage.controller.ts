import {Response} from "express";
import {UsageData} from "../models/material.model";
import {ParticipantDB} from "../models";

function handleError(err: NativeError){
    console.log("Error querying for participant: " + err.message)
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
        ogMaterial: req.body.ogMaterial
    }

    const query = ParticipantDB.findOne({'UUID': req.body.UUID});
    query.exec(function (err, participant){
        if(err) return handleError(err);
        if(participant == null) {
            console.log("No matching participant found, creating entry:")
            const usageList: UsageData[] = []
            usageList.push(usageData)
            const participant = new ParticipantDB({
                UUID: req.body.UUID,
                usageList: usageList
            });
            participant.save(function (err){
                if(err){
                    console.log("Saving participant failed: " + err.message)
                }else {
                    console.log("Successfully saved new participant.")
                }
            })

        }else {
            participant.usageList.push(usageData)
            participant.save(function (err){
                if(err){
                    console.log("Updating participant failed: " + err.message)
                }else {
                    console.log("Successfully updated participants usage data")
                }
            })
        }
    });
}