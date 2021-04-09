// Creating the Express app
const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// API routes
app.use("/auth", require('./routes/auth-routes'));
app.use("/admin", require('./routes/admin-routes'));
app.use("/recipes", require('./routes/recipe-routes'));
app.use("/comments", require('./routes/comment-routes'));
app.use("/users", require('./routes/users-routes'));

/*
GET: "/"
Redirect to the API docs
*/
app.get("/", (req, res) => {
	res.redirect("/docs");
})

/*
GET: "/docs"
Redirect to the Postman API docs
*/
app.get("/docs", (req, res) => {
	res.redirect("https://documenter.getpostman.com/view/15303556/TzCTa5pU");
})

// Running the Express app
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});