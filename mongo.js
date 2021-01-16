const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://oussama:${password}@fullstackopen.xstxb.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((res) => {
    res.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
const person = new Person({
  name,
  number,
});

person.save().then((res) => {
  console.log(`added ${name} number ${number} to the phonebook`);
  mongoose.connection.close();
});
