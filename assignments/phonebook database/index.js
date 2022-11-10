const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

// Middleware - Morgan
let morgan = require("morgan");
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :body")
);

app.use(express.json());
app.use(cors()); // for frontend use to bypass CORS
app.use(express.static("build")); // to display static content

// REST

// GET REQUESTS
app.get("/", (request, response) => {
  response.send("<h1>Title Page</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

// DELETE REQUESTS
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id).then((result) => {
    response.status(204).end();
  });
});

// POST REQUESTS
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
// Necessary to define environment before deploying on Fly.io
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
