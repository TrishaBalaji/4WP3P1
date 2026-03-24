const express = require("express");
const app = express();
const mustacheExpress = require('mustache-express');

const bodyParser = require("body-parser");
const {usersDB, productsDB, storesDB} = require("./database"); // Import the database connection

app.engine("html", mustacheExpress());
app.set("view engine", "html");

app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public")); // Serve static files (like script.js)


app.get('/mypage',function(req, res) {

    var TPL = 
    {title: "Grocery Item Tracker"
        , message:"This page shows user, product and store data!"
        , tables:["Users","Products","Stores"]
        , warning: false
        , error: true

    }

    res.render('mypage', TPL); //module not found error given when running server 
    //error resolved - had to install mustache-express and correct the typo in dirname (two underscores not one)
})


app.get("/", (req, res) => {
  // Render the login form with an optional error message
  res.render("mypage", { error: req.query.error });
});

app.post("/mypage", (req, res) => {
  const { username, password } = req.body; // Server-side validation (basic check)
  if (!username || !password) {
    return res.redirect("/?error=Missing username or password");
  }
  const query = `SELECT * FROM Users WHERE username = ? AND password = ?`;
  usersDB.get(query, [username, password], (err, user) => {
    if (err) {
      console.error(err.message);
      return res.redirect("/?error=Database error");
    }
    if (user) {
      // Successful login, redirect to dashboard
      res.redirect("/product?username=" + user.username);
    } else {
      // Failed login
      res.redirect("/?error=Invalid username or password");
    }
  });
});

app.get(/^(.+)$/, function(req, res){
    console.log("static file request: " + req.params[0]);
    res.sendFile(__dirname + req.params[0]);
});

var server = app.listen(8081, function()
{
    console.log("server listening...");
})
