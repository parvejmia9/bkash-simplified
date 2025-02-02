import dotenv from "dotenv"
import express from "express"
import sequelize from "../database/db.config"
import app from "./app"
import { router } from "./router"

dotenv.config()

const PORT: number = parseInt(process.env.PORT || "3000", 10)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  router(req, res, next);
});

(async () => {
  console.log('------Connecting to the database...');
  //console.log(sequelize);
  try {
    await sequelize.authenticate(); // Authenticate the database connection
    await sequelize.sync({ force: false });
    console.log('Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();



