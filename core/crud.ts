import fs from "fs";
import { v4 as uuid } from "uuid";

console.log("CRUD");

const DB_FILE_PATH = "./core/db";

interface ITodo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

interface IUpdateTodo {
  content?: string;
  done?: boolean;
}

type UUID = string;

function create(content: string): ITodo {
  const todo: ITodo = {
    id: uuid(),
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

function update(id: UUID, partialTodo: IUpdateTodo): ITodo {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isUpdateTodo = currentTodo.id === id;
    if (isUpdateTodo) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      1
    )
  );

  if (!updatedTodo) {
    throw new Error("Please, provide another id!");
  }

  return updatedTodo;
}

function updateContentById(id: UUID, content: string): ITodo {
  return update(id, { content });
}

function deleteById(id: UUID) {
  const todos = read();
  const todosWithoutOne = todos.filter((todo) => todo.id !== id);

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos: todosWithoutOne,
      },
      null,
      1
    )
  );
}

function CLEAR_DB(): void {
  fs.writeFileSync(DB_FILE_PATH, "");
}

CLEAR_DB();
const firstTodo = create("Primeira TODO!");
const secondTodo = create("Segunda TODO!");
const thirdTodo = create("Terceira TODO!");

deleteById(firstTodo.id);

update(secondTodo.id, {
  content: "Segunda TODO   A T U A L I Z A D A",
  done: true,
});

updateContentById(thirdTodo.id, "Atualizando conteúdo");

console.log(read());
