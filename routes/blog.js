const {Router}=require("express");
const multer=require('multer');
const path=require("path");
const Blog=require("../models/blog");

const router=Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const fileName=`${Date.now()}-${file.originalname}`;
      cb(null,fileName);
    }
  });

  const upload = multer({ storage: storage })


router.get("/add-new",(req,res)=>{
    return res.render("addBlog",{
        user:req.user,
    });
})

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    console.log("Blog Cover Image URL:", blog.coverImageURL); // Debug log
    return res.render("blog", {
      user: req.user,
      blog: blog,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});


router.post("/",upload.single("coverimage"),(req,res)=>{
    const {title,body}=req.body;
    Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageURL:`uploads/${req.file.filename}`,
    });
    return res.redirect("/");
})

module.exports=router;