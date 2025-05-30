import { CreateBlogService } from "../services/BlogServices.js";

export const CreateBlogController = async (req, res) => {
    try {
        let result = await CreateBlogService(req, res);
        if (result.status === "success") {
            return res.status(201).json(result); 
        } else {
            return res.status(400).json(result);
        }
    } catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
};


