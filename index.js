import express from 'express';

const app = express();
const PORT = 5100;


app.use(express.json());


let users = [
  { id: "1", firstName: "Anshika", lastName: "Agarwal", hobby: "Teaching" },
  { id: "2", firstName: "Rohan", lastName: "Sharma", hobby: "Photography" },
  { id: "3", firstName: "Meera", lastName: "Iyer", hobby: "Painting" },
  { id: "4", firstName: "Vikram", lastName: "Singh", hobby: "Cycling" },
  { id: "5", firstName: "Sanya", lastName: "Kapoor", hobby: "Reading" }
];


app.get("/users", (req, res) => {
  res.json(users);
});


app.get("/users/:id", (req, res) => {
  const user = users.find(user => user.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.post("/user", (req, res) => {
  const { id, firstName, lastName, hobby } = req.body;
  if (!id || !firstName || !lastName || !hobby) {
    return res.status(400).json({ message: "All fields are required" });
  }


  const existingUser = users.find(user => user.id === id);
  if (existingUser) {
    return res.status(400).json({ message: "User with this ID already exists" });
  }

  const newUser = { id, firstName, lastName, hobby };
  users.push(newUser);
  res.status(201).json({ message: "User added successfully", newUser });
});


app.put("/user/:id", (req, res) => {
  const { firstName, lastName, hobby } = req.body;
  const userIndex = users.findIndex(user => user.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex] = { ...users[userIndex], firstName, lastName, hobby };
  res.json({ message: "User updated successfully", updatedUser: users[userIndex] });
});

app.delete("/user/:id", (req, res) => {
  const userIndex = users.findIndex(user => user.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);
  res.json({ message: "User deleted successfully" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
