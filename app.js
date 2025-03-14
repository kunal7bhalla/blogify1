const express=require("express");
const path=require("path");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog=require('./models/blog');



const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog');

require('dotenv').config();
const app=express();
const PORT=process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to mongodb"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use('public/uploads', express.static(path.join(__dirname, 'public')));


app.get('/',async (req,res)=>{
    const allBlogs=await Blog.find({});
    res.render('home',{
        user:req.user,
        blogs:allBlogs
    });
})

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT,()=>{
    console.log(`App is live on ${PORT}`);
})