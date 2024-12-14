const {Router}=require("express");
const User=require('../models/user');
const router=Router();

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.get("/signin",(req,res)=>{
    return res.render("signin");
});

router.post('/signin',async (req,res)=>{
    const {email,password}=req.body;
    try{
        const {token}=await User.matchPasswordAndGenerateToken(email,password);
    
        console.log("token: ",token);
        return res.cookie("token",token).redirect("/");
    }
    catch(error){
        console.log(error);

    }
    
})

router.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password
    });

    return res.redirect("/");
})

router.get("/signout" ,(req,res)=>{
    res.clearCookie("token").redirect("/");
})

module.exports=router;