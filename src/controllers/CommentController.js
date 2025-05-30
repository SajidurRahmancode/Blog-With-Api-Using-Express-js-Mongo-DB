import { CreateCommentService } from "../services/CommentServices.js";

export const CreateCommentController = async (req, res) => {
    try {
        let result = await CreateCommentService(req, res);
        if (result.status === "success") {
            return res.status(201).json(result); 
        } else {
            return res.status(400).json(result);
        }
    } catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
};


