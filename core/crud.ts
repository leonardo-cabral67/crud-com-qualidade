import fs from "fs";

console.log("CRUD");

const DB_FILE_PATH = "./core/db";

function create(content: string) {
  fs.writeFileSync(DB_FILE_PATH, content);
  return content;
}

function read() {
  const contentFromDb = fs.readFileSync("./core/db");
  return contentFromDb;
}

console.log(
  create("Estou fazendo o curso crud com qualidade. Tem uma ótima didática!")
);
