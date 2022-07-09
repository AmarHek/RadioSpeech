import {UsageDataDB} from "../models";
import {Request, Response} from "express";


export function saveSampleUsageData(req: any, res: Response){
    const usageData = new UsageDataDB({
        deepDocTemplate: req.body.deepDocTemplate,
        shallowDocTemplate: req.body.shallowDocTemplate,
        mode: req.body.mode,
        timestamp: req.body.timestampStart,
        duration: req.body.duration
    })
    usageData.save().then(r => {
        console.log("Successfully saved usage data")
    }).catch(reason => {
        console.log(reason.toString())
    })
}