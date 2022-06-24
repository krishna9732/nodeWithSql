const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8081;
const dbConfig = require("./config/db.config")
const Squelize = require("sequelize");




const sequelize = new Squelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

sequelize.sync()
.then((data)=>{
    console.log("db synced");
})
.catch((error)=>{
    console.log("failed to sync db");
})

const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Squelize.STRING
    },
    description: {
      type: Squelize.STRING
    },
    published: {
      type: Squelize.BOOLEAN
    }
});

const tutorial = {
    title: "Node js",
    description: 'my sql',
    published: true
  };
  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      console.log(data,"Success")
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });


var corsOptions = {
    origin: `http://localhost:${PORT}`
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


app.listen(PORT,()=>{
    console.log(`App is listening to port ${PORT}`);
})