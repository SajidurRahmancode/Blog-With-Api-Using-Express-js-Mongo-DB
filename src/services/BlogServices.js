import mongoose from "mongoose"
import BlogModel from "../models/BlogModel.js";


const {ObjectId}=mongoose.Types;

export const CreateBlogService = async (req, res) => {
    try {
        let reqbody = req.body;
        let data = await BlogModel.create(reqbody);
        return { status: "success", data: data };
    } catch (e) {
        return { status: "fail", data: e.message };
    }
}

export const ReadBlogWithCommentService = async (req, res) => {
    try {
        let id =new ObjectId(req.params.blogID);
        let matchingStage={$match:{_id:id}};

        let joiningStage={$lookup:{from:"comments",localField:"_id",foreignField:"blogID" ,as:"comments"}};

        let data = await BlogModel.aggregate([matchingStage,joiningStage]);
        return { status: "success", data: data };
    } catch (e) {
        return { status: "fail", data: e.message };
    }
}







