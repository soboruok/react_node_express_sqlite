// Routes/contacts.js
// This file holds the routes contacts
// Add a contact, get a contact, get contacts, edit a contact, delete a contact.
const express = require("express");
const db = require("../models");
const router = express.Router();
const multer = require("multer");
//bring the validation token
const { validateToken } = require("../middlewares/authMiddleware");

//Save image in the uploads/
//save file.originalname and destination will be uploads/
const upload = multer({
  storage: multer.diskStorage({
    //Save uploads/
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

const { Service } = db.sequelize.models;
// npm install --save multer
// When a key value of image comes in through a data request with /image,
// Among several file information, the location where the image is saved can be known through file.path.
// automaticlly create upload folder.
router.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.send({
    imageUrl: file.path,
  });
});

// Create service
// Receive the request, and validateToken then next() call.
router.post("/service/add", validateToken, async (req, res) => {
  console.log("/api/service/add - post");
  // add in code for adding a new service.
  // data from the client is passed through.
  // we can find this data in res.body.
  console.log(req.body);
  const { title, price, description, cat, imageUrl } = req.body;
  // Validate service information.
  if (!title || !price || !description || !cat || !imageUrl) {
    res.send("please enter all field");
  }

  // This create function will insert and save a new row in out services table.
  const service = await Service.create({
    title: title,
    price: price,
    description: description,
    cat: cat,
    imageUrl: imageUrl,
  });
  console.log(service.toJSON());
  res.send(service);
});

// Read all services
router.get("/services", async (req, res) => {
  console.log("/api/services - get");
  // get all our services. order by createdAt.
  // Get all services use findAll();
  const list = await Service.findAll({
    limit: 30, //limit 30
    order: [["createdAt", "DESC"]], // order by createdAt DESC
    attributes: ["C_id", "title", "price", "description", "cat", "imageUrl"], //select title,price,description,cat,image
  });
  console.log(list);
  res.send(list);
});

//Read only one single service
router.get("/service/:id", async (req, res) => {
  console.log("/api/service/:id - get");
  // Get a single service.
  // res.send('service - get')
  // findOne <-, findByPk
  let id = req.params.id;
  id = parseInt(id);
  const service = await Service.findByPk(id);
  console.log(service);
  res.send(service);
});

//Update
router.put("/service/edit/:id", validateToken, async (req, res) => {
  console.log("/api/service/edit/:id - put");
  // Edit a service
  // res.send('Edit - put');
  // update()
  let id = req.params.id;
  id = parseInt(id);
  console.log("e-id: ", id);
  const { title, price, description, cat, imageUrl } = req.body;

  const service = await Service.update(
    { title, price, description, cat, imageUrl },
    {
      where: { C_id: id },
    }
  );
  console.log(service);
  res.send(service);
});

//delete
router.delete("/service/:id", validateToken, (req, res) => {
  console.log("/api/service/:id - delete");
  // Delete a service

  // Sequelize function to delete a record. destroy. Service.destroy()
  let id = req.params.id;
  id = parseInt(id);
  // test that we have the.
  console.log("s-id: ", id);
  Service.destroy({
    where: {
      C_id: id,
    },
  });
  res.send(`Id: ${id} deleted`);
});

module.exports = router;
