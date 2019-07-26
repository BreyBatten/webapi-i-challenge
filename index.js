// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

//GET
server.get("/api/users", (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
});

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.findById()
    .then(user => {
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The user information could not be retrieved."
        })
    })
})

//POST
server.post("/api/users", (req, res) => {
    const { name, bio } = req.body;

    db.insert(name && bio)
    .then(user => {
        res.status(201).json({ success: true, user});
    })
    .catch(err => {
        res.status(400).json({ success: false, err, error: "Please provide name and bio for the user."})
    })
});

//DELETE
server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ success: false, message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ success: false, error: "The user could not be removed."})
    })
});

//PUT
server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    const userInfo = req.body;

    db.update()
})

server.listen(5000, () => {
    console.log("server listening on port 5000");
});