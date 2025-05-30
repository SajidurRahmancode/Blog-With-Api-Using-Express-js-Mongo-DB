import mongoose from 'mongoose'; 
const CommentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    comment:{type:String,required:true},
    blogID:{type:mongoose.Schema.Types.ObjectId,required:true}

  },
  { timestamps:true, versionKey:false


  }
);



const CommentModel=mongoose.model("comments",CommentSchema);
export default CommentModel;