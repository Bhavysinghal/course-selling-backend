import "dotenv/config";
import connectDB from "./db/index.js";
import app from "./app.js";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is running on port number http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection error", err);
  });
