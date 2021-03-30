// Creating the Express app
const express = require('express')
const app = express();
app.use(express.json());

// API routes
app.use("/auth", require('./routes/auth-routes'));
app.use("/admin", require('./routes/admin-routes'));

// Running the Express app
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});