const express = require('express')
const app = express()
const routes= require ("./routes") ;
const db = require ("./db") ;
const cookiesParser = require("cookie-parser");
const cors = require('cors');

require("dotenv").config();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookiesParser());
app.use("/api", routes);

const PORT = process.env.SERVER_PORT;

db.sync({ force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

