const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://alexz648:${password}@phonebook-app.xgwmck9.mongodb.net/Phonebook?retryWrites=true&w=majority`;

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Entry = mongoose.model("entry", entrySchema);

mongoose
  .connect(url)
  .then((result) => {
    if (process.argv[3] || process.argv[4]) {
      const entry = new Entry({
        name: process.argv[3],
        number: process.argv[4],
      });
      return entry.save();
    }
  })
  .then(() => {
    if (process.argv[3] || process.argv[4]) {
      console.log(
        `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
      );
      return mongoose.connection.close();
    } else {
      Entry.find({}).then((persons) => {
        console.log("phonebook:");
        persons.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
        return mongoose.connection.close();
      });
    }
  })
  .catch((err) => console.log(err));
