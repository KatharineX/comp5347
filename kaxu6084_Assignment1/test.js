const express = require("express");
const app = express();
var session = require("express-session");
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  session({
    secret: "12345",
    name: "comp5347",
    cookie: { maxAge: 800000 },
    resave: false,
    saveUninitialized: true,
  })
);

app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
  res.render("checkin.ejs", { products: products });
});

app.post("/checkin", function (req, res) {
  var sess = req.session;
  if (!sess){
    res.render("checkin.ejs", { products: products });
  }
  res.render("checkinsuccess.ejs", { products: products });
});

app.get("/checkout", function (req, res) {
    // removes session data
    var sess = req.session;
    if (sess) {
      req.session.destroy();
    }
  res.render("checkin.ejs", { products: products });
});

app.listen(3000, function (error) {
  if (error) throw error;
  console.log("Server ran successfully on PORT 3000");
});

