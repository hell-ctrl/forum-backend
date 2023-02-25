const Post = require("../../models/Post.js");
const Comment = require("../../models/Comment.js");

const deleteAllPosts = async (user) => {
  try {
    (await Comment.find({ user: user })).map(
      async () => await Comment.findOneAndDelete({ user: user })
    );
  } catch(e) {
    console.log(e)
  }
};

const deleteAllComments = async (user) => {
  try {
    (await Post.find({ user: user })).map(
      async () => await Post.findOneAndDelete({ user: user })
    );
  } catch(e) {
    conaole.log(e)
  }
};

module.exports = { deleteAllComments, deleteAllPosts };