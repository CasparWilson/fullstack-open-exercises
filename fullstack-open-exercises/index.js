const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());
app.use(morgan("tiny"));

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

app.get("/api/secretmessage", (request, response) => {
  response.send("<p>Caspar the Best</p>");
});

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

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  for (person of phonebookData) {
    if (person.name === body.name) {
      return response.status(400).json({
        error: "name already in phonebook",
      });
    }
  }

  randomID = Math.ceil(Math.random() * 1000);

  const newEntry = {
    name: body.name,
    number: body.number,
    id: Math.toString(randomID),
  };

  phonebookData = phonebookData.concat(newEntry);

  response.json(newEntry);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
