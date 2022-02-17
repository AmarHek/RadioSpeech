import * as mongoose from "mongoose";

export interface FeedbackDoc extends Document {
    userID:     string;
    materialID: string;
    comment:    string;
}

export const FeedbackDB = mongoose.model<FeedbackDoc>(
    "Feedback",
    new mongoose.Schema({
        userID:     { type: String },
        materialID: { type: String },
        comment:    { type: String }
    }),
    "feedback"
)