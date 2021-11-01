const mongoose = require("mongoose");
require('../../models/index');



// sending blogs page mounting information function

const blogPageMountingInfo = async (req,res) => {
  const blogs = await mongoose.model('Blog').find({})
  if(!blogs){
    res.status(500).send({
      message : "something went wrong"
    })
    return
  }
  res.status(200).send({
    blogs,
    message : "blogs array have been sent"
  })
}

// deleting a blog function

const deleteBlog = async (req, res) =>{
  const _id = req.params.id;
  const blog = await mongoose.model('Blog').findOne({_id});
  if(!blog){
    return res.status(404).send({
      message: "this blog does not exist !"
    });
  }
  try {
    await mongoose.model('Blog').deleteOne({_id});
    res.status(200).send({
      message: "blog post deleted"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong !"
    })
  }
}

// editiong a blog function


const editBlog = async (req, res) =>{
  const _id = req.params.id;
  const blog = await mongoose.model('Blog').findOne({_id})
  if(!blog){
    res.status(404).send({
      message:'this blog does not exist'
    })
    return
  };
  try {
    await mongoose.model('Blog').updateOne({_id}, {Title : req.body.Title, Description : req.body.Description});
    res.status(200).send({
      message: 'changes applied'
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'some thing went wrong'
    });
  }
}

// storing blog in database


const createBlog = (req, res) =>{
  mongoose.model('Blog').create({
    Title : req.body.Title,
    Description : req.body.Description
  })
  res.status(200).send({
    message: "added"
  })
}



module.exports = {
    blogPageMountingInfo,
    deleteBlog,
    editBlog,
    createBlog,
}