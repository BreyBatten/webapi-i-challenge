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
    const userInfo = req.body;
    const { name, bio } = userInfo;

    db.insert(name && bio)
    .then(user => {
        res.status(201).json({ success: true, user});
    })
    .catch(err => {
        res.status(400).json({ success: false, err, error: "Please provide name and bio for the user."})
    })
})

server.listen(4000, () => {
    console.log("server listening on port 4000");
});