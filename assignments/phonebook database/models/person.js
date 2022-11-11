const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB: ", err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [
      3,
      "{VALUE} is not a valid name! Must be at least 3 characters.",
    ],
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{8}$/g.test(v); // Must be 8 digits
      },
    },
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Entry", personSchema);
