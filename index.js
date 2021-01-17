require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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

// mongoose
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return v.length >= 3;
      },
      message: function (props) {
        return `the name should be atleast 3 charecters long, "${props.value} is shorter than that"`;
      },
    },
  },
  number: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        const pureNumber = v.match(/[0-9]/g);
        return pureNumber.length >= 8;
      },
      message: () => "should have atleast 8 digits",
    },
  },
});
personSchema.plugin(uniqueValidator);
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Person = mongoose.model("Person", personSchema);

app.get("/", (req, res) => {
  res.send("<p>head to /api/persons</p>");
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((notes) => res.json(notes))
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.get("/info", (req, res, next) => {
  const date = new Date();
  Person.countDocuments()
    .then((count) =>
      res.send(`
  <h3>This phonebook has information for ${count} people </h3>
  <p>${date}</p>
  `)
    )
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  // if (!body.name || !body.number) {
  //   return res.json({ error: "content is missing" });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((result) => res.send(result))
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const id = req.params.id;

  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(id, person, { runValidators: true }, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (err.name === "ValidationError") {
    return res.status(500).send(err.message);
  }
  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
