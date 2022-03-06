const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

mongoose.connect(DB).then((data) => {
    // console.log(data, "data");
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("DB connection failed", err));

