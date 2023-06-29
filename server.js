require("dotenv").config();

const app = require("./index");

const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log(`App Listening on Port: ${port}`);
});
