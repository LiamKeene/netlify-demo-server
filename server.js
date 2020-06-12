const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const schema = buildSchema(`
  type Query {
    hello: String
  }
  type Mutation {
    hello: String
  }
`);

const root = {
  hello: () => `Hello from localhost`,
};

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000);
console.log("Running a GraphQL API server at http://localhost:3000/graphql");
