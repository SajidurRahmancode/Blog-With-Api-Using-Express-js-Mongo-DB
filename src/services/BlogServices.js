import mongoose from "mongoose"
import BlogModel from "../models/BlogModel.js";




export const CreateBlogService = async (req, res) => {
    try {
        let reqbody = req.body;
        let data = await BlogModel.create(reqbody);
        return { status: "success", data: data };
    } catch (e) {
        return { status: "fail", data: e.message };
    }
}







