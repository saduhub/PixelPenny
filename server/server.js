const express = require('express')
const path = require("path");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
const PORT = process.env.PORT || 3001;
const app = express();

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./Schemas");
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../client/build")));
// }
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    console.log("Successfully started Apollo server.");
  
    db.once("open", () => {
      console.log("Connection to db successful");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Access Apollo Sandbox at http://localhost:${PORT}${server.graphqlPath}`);
      });
    });
};
  
startApolloServer().catch((err) => {
console.log(err);
});
