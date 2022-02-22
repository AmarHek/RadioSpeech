import {FeedbackDB} from "../models";
import {Request, Response} from "express";

export function addFeedback(req: Request, res: Response) {
    const newFeedback = new FeedbackDB({
        userID: req.body.userID,
        materialID: req.body.materialID,
        comment: req.body.comment
    });
    newFeedback.save().then(result => {
        res.status(201).send({
            message: "Kommentar wurde gespeichert, vielen Dank!",
            postId: result._id
        });
    });
}

export function getFeedbackCount(req: Request, res: Response) {
    FeedbackDB.countDocuments().exec((err, count) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            console.log(count);
            res.status(201).send({count});
        }
    })
}

export function getFeedbackList(req: Request, res: Response) {
    FeedbackDB.find()
        .skip(req.body.skip)
        .limit(req.body.length)
        .exec((err, feedbackList) => {
            if (err) {
                res.status(404).send({message: err});
            } else {
                res.status(200).send({feedbackList});
            }
        });
}

export function deleteFeedback(req: Request, res: Response) {
    FeedbackDB.deleteOne(
        {_id: req.params.id
        }).exec((err) => {
            if(err) {
                res.status(500).send({message: err});
            } else {
                res.status(200).send({message: "Comment deleted."});
            }
    })
}