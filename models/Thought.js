const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction')



const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 128,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.toISOString().split("T")[0];
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);



thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })


const Thought = model('Thought', thoughtSchema);

module.exports = Thought
