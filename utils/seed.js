const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  await Thought.deleteMany({});

  const users = [
    {
      username: "Billy",
      email: "Billbob123@gmail.com",
    },
    {
      username: "Mark",
      email: "Coolguy32@gmail.com",
    },
  ];

  const thoughts = [
    {
      thoughtText: "This guy mark man",
      username: "Billy",
    },
    {
      thoughtText: "I really like Billy man",
      username: "Mark",
    },
  ];

  console.log(thoughts);

  await User.collection.insertMany(users);

  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
