const express = require("express");
const app = express();
app.use(express.json());
let phonebookData = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
// const phonebookData = require("./data/phonebookData.js");

app.get("/api/persons", (request, response) => {
  response.json(phonebookData);
});

app.get("/api/info", (request, response) => {
  requestReceivedAt = Date.now();
  formattedReceviedAt = new Date(requestReceivedAt);
  response.send(`<p>Phonebook has info for ${phonebookData.length} people<p>
    <p>${formattedReceviedAt}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = phonebookData.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phonebookData = phonebookData.filter((note) => note.id !== id);

  response.status(204).end();
});

// app.post("/api/notes", (request, response) => {
//   const body = request.body;

//   if (!body.content) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }

//   const note = {
//     content: body.content,
//     important: Boolean(body.important) || false,
//     id: generateId(),
//   };

//   notes = notes.concat(note);

//   response.json(note);
// });

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
