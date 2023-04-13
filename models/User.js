const { Schema, model } = require('mongoose');

// user schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (val) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(val)
        },
        message: noVal => `${noVal.value} is not a valid  email address!`
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
          virtuals: true,
        getters: true,
    },
    id: false,
  }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    })

const User = model('User', userSchema)

module.exports = User