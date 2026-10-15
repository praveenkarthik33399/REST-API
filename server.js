
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory contact storage
let contacts = [
  { id: 1, name: "Rahul", email: "rahul@gmail.com" },
  { id: 2, name: "Priya", email: "priya@gmail.com" }
];

let nextId = 3;

// GET: View all contacts
app.get("/contacts", (req, res) => {
  res.json(contacts);
});

// GET: View one contact
app.get("/contacts/:id", (req, res) => {
  const contact = contacts.find(
    c => c.id === Number(req.params.id)
  );

  if (!contact) {
    return res.status(404).json({
      message: "Contact not found"
    });
  }

  res.json(contact);
});

// POST: Add a contact
app.post("/contacts", (req, res) => {
  const { name, email } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim()
  ) {
    return res.status(400).json({
      message: "Valid name and email are required"
    });
  }

  const newContact = {
    id: nextId++,
    name: name.trim(),
    email: email.trim()
  };

  contacts.push(newContact);

  res.status(201).json({
    message: "Contact added successfully",
    contact: newContact
  });
});

// PUT: Update a contact
app.put("/contacts/:id", (req, res) => {
  const contact = contacts.find(
    c => c.id === Number(req.params.id)
  );

  if (!contact) {
    return res.status(404).json({
      message: "Contact not found"
    });
  }

  const { name, email } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim()
  ) {
    return res.status(400).json({
      message: "Valid name and email are required"
    });
  }

  contact.name = name.trim();
  contact.email = email.trim();

  res.json({
    message: "Contact updated successfully",
    contact
  });
});

// DELETE: Remove a contact
app.delete("/contacts/:id", (req, res) => {
  const index = contacts.findIndex(
    c => c.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Contact not found"
    });
  }

  contacts.splice(index, 1);

  res.json({
    message: "Contact deleted successfully"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
