const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allow cross-origin requests
app.use(cors());

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@ivyferns-yeq7v.gcp.mongodb.net/testDatabase?retryWrites=true`
  )
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Listening on port ${port}....`));
  })
  .catch(err => {
    console.log(err);
  });
