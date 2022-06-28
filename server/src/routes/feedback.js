// Routes/contacts.js
// This file holds the routes contacts
// Add a contact, get a contact, get contacts, edit a contact, delete a contact.
const express = require("express");
const db = require("../models");
const router = express.Router();

//models/index.js bring the feedback table from models
const { FeedBack } = db.sequelize.models;
//bring the validation token
const { validateToken } = require("../middlewares/authMiddleware");

// Create Feedback
// validateToken : req.user
router.post("/feedback/add", async (req, res) => {
  console.log("/api/feedback/add - post");

  //data from the client is passed through.
  console.log(req.body);
  //Get data through destructuring
  const { FName, FEmail, FTitle, FDescription } = req.body;

  // Validate Feedback information.
  if (!FName || !FTitle || !FDescription) {
    res.send("please enter all field");
  }

  // This create function will insert and save a new row in out feedback table.
  const feedback = await FeedBack.create({
    FName,
    FTitle,
    FEmail, // Logged in User email
    FDescription,
  });
  console.log(feedback.toJSON());
  res.send(feedback);
});

// Read all feedbacks
router.get("/feedbacks", async (req, res) => {
  console.log("/api/feedbacks - get");
  // get all our feedbacks. order by createdAt.
  // Get all feedbacks use findAll();
  //FName, FEmail, FTitle,FDescription

  const list = await FeedBack.findAll({
    limit: 30, //limit 30
    order: [["createdAt", "DESC"]], // order by createdAt DESC
    attributes: ["F_id","FName", "FEmail", "FTitle", "FDescription", "createdAt"],
  });
  console.log(list);
  res.send(list);
});

//Read one. id is coming from URL http://localhost:3000/feedback/10.Id can be 10
router.get("/feedback/:id", async (req, res) => {
  console.log("/api/feedback/:id - get");
  // Get a single feedback.
  // res.send('feedback - get')
  // findOne <-, findByPk
  let id = req.params.id;
  id = parseInt(id);
  const feedback = await FeedBack.findByPk(id);
  console.log(feedback);
  res.send(feedback);
});

//delete
router.delete("/feedback/:id", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  const feedback = await FeedBack.destroy({
    where: {
      id: id,
    },
  });

  console.log(feedback);
  res.send(feedback);
});

module.exports = router;
