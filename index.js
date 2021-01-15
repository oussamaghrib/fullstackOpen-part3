const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] :response-time ms :postBody"
  )
);

morgan.token("postBody", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];
app.get("/", (req, res) => {
  res.send("<p>head to /api/persons</p>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return res.status(404).end();
  }
  res.send(person);
});

app.get("/info", (req, res) => {
  const personsCount = persons.length;
  const date = new Date();

  res.send(`
    <h3>This phonebook has information for ${personsCount} people </h3>
    <p>${date}</p>
    `);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const idGenerator = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.json({ error: "content is missing" });
  }
  const dublicateName = persons.filter((person) => person.name === body.name);
  console.log(dublicateName.length);
  if (dublicateName.length > 0) {
    return res.json({ error: "name must be unique" });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: idGenerator(),
  };
  persons = persons.concat(person);
  res.send(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
