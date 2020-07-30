const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//IMPORTING ROUTES
const registrationRoutes = require("./routes/registrationRoutes");
const loginRoutes = require("./routes/loginRoutes");
const indexRoutes = require("./routes/indexRoutes");
const cwcRoutes = require("./routes/cwcRoutes");
const adminRoutes = require("./routes/adminRoutes");
const messageRoutes = require("./routes/messageRoutes");
const otherRoutes = require("./routes/otherRoutes");

const app = express();
dotenv.config();

//DATABASE CONNECTION
mongoose.connect(process.env.DB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We are connected to MongoDB");
});

//SERVING THE PUBLIC DIRECTORY
app.use(express.static(__dirname + "/public"));

//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTE MIDDLEWARES
app.use(registrationRoutes);
app.use(loginRoutes);
app.use(indexRoutes);
app.use(cwcRoutes);
app.use(adminRoutes);
app.use(messageRoutes);
app.use(otherRoutes);

//LISTENING
// app.listen(process.env.PORT, process.env.IP);
app.listen(3001, () => console.log("Server says Hello!!"));
