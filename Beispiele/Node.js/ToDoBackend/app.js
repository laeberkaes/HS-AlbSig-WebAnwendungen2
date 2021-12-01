const { readFile, writeFile } = require("fs/promises");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { send } = require("process");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let inMemoryStore = [];
const storageFilename = "data.json";

app.post("/store", async (req, res) =>
{
    const json = req.body;

    const jsonString = JSON.stringify(json);
    await writeFile(storageFilename, jsonString);

    return res.status(200).send();
});

app.get("/v1/todos", async (req, res) =>
{
    let jsonString = "[]";

    try
    {
        jsonString = await readFile(storageFilename);
    }
    catch (error)
    {
        // intentionally empty
    }

    return res.send(jsonString);
});

app.post("/v1/todos", async (req, res) =>
{
    let todoItem = req.body;

    const todoDataString = await readFile(storageFilename);

    const allTodos = JSON.parse(todoDataString);

    allTodos.push(todoItem);

    await writeFile(storageFilename, JSON.stringify(allTodos));

    return res.status(200).send()
});

app.delete("/v1/todos", async (req, res) => {
    const emptyJsonArrayString = "[]";
    await writeFile(storageFilename, emptyJsonArrayString);

    return res.status(200).send()
})

app.delete("/v1/todos/:itemID", async (req, res) => {
    let todoItemID = req.params["itemID"];
    todoItemID *= 1;

    const todoDataString = await readFile(storageFilename);

    const allTodos = JSON.parse(todoDataString);

    const filteredTodos = allTodos.filter(item => item.id !== todoItemID);

    await writeFile(storageFilename, JSON.stringify(allTodos));

    return res.status(200).send()
})

module.exports = app;
