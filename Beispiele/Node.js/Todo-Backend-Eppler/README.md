# Simple Todo App with express backend

## Start

This app requires an initialized SQLite DB. See "Create SQLite Database" for more information.

1) `npm install`
2) `npm run start`
3) Go to [http://localhost:3000/todo-app.html](http://localhost:3000/todo-app.html)

## Create SQLite Database

### Commandline
Create SQLite Database via SQLite3 Tool on CLI (Linux, WSL, Git Bash)

```
cat schema.sql | sqlite3 todos.db
```

### DBeaver

1) In DBeaver create a new Connection with SQLite. 
2) Name the database `tododb`
3) The Database Path must be: `$GitRepo/Beispiele/Node.js/Todo-App/todos.db`
4) Open then `schema.sql` via DBeaver and execute the SQL. Make sure, you run the SQL against `tododb`.