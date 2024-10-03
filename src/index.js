const express = require("express");

// init app
const port = process.env.port || 4000;
const app = express();

app.get("/", (req, res) => res.send("<h1>Hello! dev<h1>"));

// Use backticks for template literals in the console log
app.listen(port, () => console.log(`app is running on port: ${port}`));
