// Routes/contacts.js
// This file holds the routes contacts
// Add a contact, get a contact, get contacts, edit a contact, delete a contact.
const express = require("express");
const db = require("../models");
const router = express.Router();

//models/index.js bring the blog table from models
const { Blog } = db.sequelize.models;
//bring the validation token
const { validateToken } = require("../middlewares/authMiddleware");

// Create blog
// validateToken : req.user
router.post("/blog/add", validateToken, async (req, res) => {
  console.log(validateToken);
  console.log("/api/blog/add - post");

  //data from the client is passed through.
  console.log(req.body);
  //Get data through destructuring
  const { BCat, BName, BTitle, BDescription } = req.body;
  // Validate blog information.
  if (!BCat || !BTitle || !BDescription) {
    res.send("please enter all field");
  }

  // This create function will insert and save a new row in out blog table.
  const blog = await Blog.create({
    BCat,
    BTitle,
    BName, // Logged in User email
    BDescription,
  });
  console.log(blog.toJSON());
  res.send(blog);
});

// Read all blogss
router.get("/blogs", async (req, res) => {
  console.log("/api/blogs - get");
  // get all our blogss. order by createdAt.
  // Get all blogs use findAll();

  const list = await Blog.findAll({
    limit: 30, //limit 30
    order: [["createdAt", "DESC"]], // order by createdAt DESC
    attributes: [
      "B_id",
      "BName",
      "BCat",
      "BTitle",
      "BDescription",
      "createdAt",
    ],
  });
  console.log(list);
  res.send(list);
});

//delete
router.delete("/blogs/:id", validateToken, async (req, res) => {
  //grab id
  const blogId = req.params.id;
  console.log(blogId);
  blogId = parseInt(blogId);
  const blog = await Blog.destroy({
    where: {
      id: blogId,
    },
  });

  console.log(blog);
  res.send(blog);
});

module.exports = router;
