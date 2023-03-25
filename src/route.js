const {
  addBook,
  getAllBook,
  getDetailBook,
  EditBookById,
  deleteBookById,
} = require("./handler");

const bookRoute = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBook,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getDetailBook,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: EditBookById,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBookById,
  },
];

module.exports = { bookRoute };
