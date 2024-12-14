const {Schema, default: mongoose}=require("mongoose");

const blogSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
}
,{timestamps:true}
);

module.exports=mongoose.model("Blog",blogSchema);

