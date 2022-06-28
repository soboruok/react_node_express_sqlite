//  Bring in express
const express = require("express");
const cors = require("cors");
const db = require("./models");
const config = require("./config/config");

// Load the routes
const service = require("./routes/service");
const feedback = require("./routes/feedback");
const auth = require("./routes/auth");
const blog = require("./routes/blog");

// initialise express
const app = express();

// Initialise middleware
// Allow the server to parse incomming requests with JSON
app.use(express.json());
app.use(cors());
// Allow the server to parse incomming request with url-encoded data(쿼리 스트링을 해석)
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/api", service);
app.use("/api", feedback);
app.use("/api", auth);
app.use("/api", blog);
//move file to /uploads
app.use("/uploads", express.static("uploads"));

// Create a test route
app.get("/test", (req, res) => {
  console.log("/test - get");
  res.send("I am a server, and I am up!!");
});

// Routes can be get, post, put or delete.
app.get("/", (req, res) => {
  // testing purposes
  console.log("/ - get");
  res.send("Home Page");
});

//models>index.js에 테이블을 만들면, 여기서 동기화되서 디비에 테이블 만들어준다.
//.sqlite파일이 생성된다.
db.sequelize.sync().then(() => {
  app.listen(
    config.port,
    console.log(`Server is running on port: ${config.port}`)
  );
});
