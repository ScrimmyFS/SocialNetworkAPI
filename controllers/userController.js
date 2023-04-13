const { User, Thought } = require("../models");

module.exports = {
  getallUsers(req, res) {
    User.find()
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate('thoughts')
      .populate("friends")
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  
  createUser(req, res) {
     User.create(req.body)
       .then((user) => res.json(user))
       .catch((err) => {
         console.log(err);
         return res.status(500).json(err);
       });
  },


  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
          return;
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValifators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No users found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendsId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this user id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendsId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
