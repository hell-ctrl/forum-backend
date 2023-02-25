const bcrypt = require("bcrypt");
const User = require("../../models/User.js");
const { deleteUserService } = require("../../services/userService.js");
const { deleteAllPosts, deleteAllComments } = require("./deleteUserStory.js")

const deleteUser = async (req, res) => {
  const { password } = req.body;

  try {
    const userFromDB = await User.findById(req.user.id).select("+password");
    const isMatch = bcrypt.compareSync(password, userFromDB.password);

    if (isMatch) {
      await deleteUserService(req.user.id);
      await deleteAllComments(req.user.id);
      await deleteAllPosts(req.user.id);
      res.status(200).json({ sucess: "usuário excluído" });
    }
  } catch(e) {
    return res.status(500).json({ erro: "ocorreu um erro ao deletar usuário", e });
    console.log(e.message)
  }
};

module.exports = deleteUser;
