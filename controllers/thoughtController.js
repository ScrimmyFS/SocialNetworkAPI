const { Thought } = require('../models')

module.exports = {
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getallThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  getthoughtbyId(req, res) {
   Thought.findOne({ _id: req.params.thoughtId })
     .select("-__v")
     .then((thought) => res.json(thought))
     .catch((err) => {
       console.log(err);
       return res.status(500).json(err);
     });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });;
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughts) => {
        if (!thoughts) {
          res
            .status(404)
            .json({ message: "No thought found with this id number!" });
          return;
        }
        res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { runValidators: true, new: true }
    )
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.json(err));
  },
};
