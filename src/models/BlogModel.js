import mongoose from 'mongoose'; 
const BlogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    des:{type:String,required:true}
  },
  { timestamps:true, versionKey:false


  }
);



const BlogModel=mongoose.model("blogs",BlogSchema);
export default BlogModel;