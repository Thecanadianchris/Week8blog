const sequelize = require("../config/connection");
const { User, Post, Category } = require("../models");

const seedDatabase = async () => {

    

  await sequelize.sync({ force: true });

  const categories = await Category.bulkCreate([
    { name: "JavaScript" },
    { name: "Hardware" },
    { name: "Career" },
    { name: "News" },
  ]);

  
  
  const demoUser = await User.create({
    username: "demo",
    email: "demo@test.com",
    password: "password123",
  });

  await Post.bulkCreate([
    {
      title: "Why I am learning to code",
      content: "This year I decided to switch careers and learn full stack development.",
      userId: demoUser.id,
      categoryId: categories[2].id,
    },
    {
      title: "My favourite VS Code shortcuts",
      content: "Ctrl+S to save, Ctrl+C to stop the server, and Ctrl+backtick to open the terminal.",
      userId: demoUser.id,
      categoryId: categories[0].id,
    },
    {
      title: "Building my first PC",
      content: "I put together a budget PC for coding and it went better than expected.",
      userId: demoUser.id,
      categoryId: categories[1].id,
    },
  ]);

  process.exit(0);
};

seedDatabase();