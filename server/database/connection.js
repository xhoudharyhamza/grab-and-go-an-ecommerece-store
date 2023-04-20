let mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected With Database");
  })
  .catch((error) => {
    console.log(error);
  });
