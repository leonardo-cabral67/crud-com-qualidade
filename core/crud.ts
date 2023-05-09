import fs from "fs";

console.log("CRUD");

const DB_FILE_PATH = "./core/db";

interface ITodo {
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): ITodo {
  const todo: ITodo = {
    date: new Date().toISOString(),
    content,
    done: false,
  };

  const todos: ITodo[] = [...read(), todo];

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
        dogs: [],
      },
      null,
      1
    )
  );

  return todo;
}

function read(): ITodo[] {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");

  if (!db.todos) return [];

  return db.todos;
}

function CLEAR_DB(): void {
  fs.writeFileSync(DB_FILE_PATH, "");
}

CLEAR_DB();
create("Primeira TODO!");
create("Segunda TODO!");
console.log(read());
