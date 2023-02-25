const post = require("../models/Post.js");
const comment = require("../models/Comment.js");

const createPostService = (body) => post.create(body);


const findAllPostsService = (page, perPage) =>
  post.find().sort({ _id: -1 }).skip(page - 1).limit(perPage).populate("user");


const findPostByIdService = async (id) => {
  try {
    const postFromDB = await post.findById({ _id: id }).populate("user");
    const commentsFromDB = await comment.find({postId: postFromDB._id}).sort({ _id: -1 }).populate("user");
  
    postFromDB.comments = commentsFromDB;
    return postFromDB;
  } catch {}
}


const findByTextService = (text) =>
  post.find({
    "content.text": { $regex: new RegExp(text, "i") }
  });


const findPostsByUser = (userId) =>
  post.find({ user: userId }).sort({ _id: -1 }).populate("user");


const updatePostService = (postId, body) =>
  post.findOneAndUpdate({ _id: postId }, { ...body }, { rawResult: true });


const deletePostService = (postId) => post.findByIdAndDelete(postId);

module.exports = {
  createPostService,
  updatePostService,
  deletePostService,
  findAllPostsService,
  findPostByIdService,
  findByTextService,
  findPostsByUser,
};
