import mongoose from "mongoose"
import CommentModel from './../models/CommentModel.js';




export const CreateCommentService = async (req, res) => {
    try {
        let reqbody = req.body;
        let data = await CommentModel.create(reqbody);
        return { status: "success", data: data };
    } catch (e) {
        return { status: "fail", data: e.message };
    }
}







