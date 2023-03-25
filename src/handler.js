const books = require("./books");
const { v4: uuidv4 } = require("uuid");
const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount;
  const checkReadPage = readPage <= pageCount;
  const id = uuidv4();
  if (name !== undefined && checkReadPage === true) {
    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
      insertedAt,
      finished,
    };
    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
      const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }
  }
  const response = h.response({
    status: "fail",
    message:
      name === undefined
        ? "Gagal menambahkan buku. Mohon isi nama buku"
        : "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
  });
  response.code(400);
  return response;
};

const getAllBook = (request, h) => {
  const { reading, finished, name } = request.query;
  if (reading || finished || name) {
    if (finished === "1") {
      const finishedBook = books.filter((book) => book.finished);
      const response = h.response({
        status: "success",
        data: {
          books: finishedBook.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
    if (reading === "1") {
      const readingBook = books.filter((book) => book.reading > 0);
      const response = h.response({
        status: "success",
        data: {
          books: readingBook.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
    if (reading === "0") {
      const unReading = books.filter((book) => book.reading <= 0);
      const response = h.response({
        status: "success",
        data: {
          books: unReading.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
    if (finished === "0") {
      const unFinishedBook = books.filter((book) => !book.finished);
      const response = h.response({
        status: "success",
        data: {
          books: unFinishedBook.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    } else {
      const spesificBookName = books.filter((book) =>
        book.name.toLowerCase().includes(name.toLowerCase())
      );
      const response = h.response({
        status: "success",
        data: {
          books: spesificBookName.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
  } else {
    const simplifiedBooks = books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    const response = h.response({
      status: "success",
      data: {
        books: simplifiedBooks,
      },
    });
    response.code(200);
    return response;
  }
};

const getDetailBook = (request, h) => {
  const { id } = request.params;
  const book = books.filter((item) => item.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const EditBookById = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount;
  const checkReadPage = readPage <= pageCount;
  const checkId = books.findIndex((book) => book.id === id);
  if (checkId !== -1) {
    if (name !== undefined && checkReadPage === true) {
      books[checkId] = {
        ...books[checkId],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        updatedAt,
      };
      const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: "fail",
      message:
        name === undefined
          ? "Gagal memperbarui buku. Mohon isi nama buku"
          : "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteBookById = (request, h) => {
  const { id } = request.params;
  const checkId = books.findIndex((book) => book.id === id);

  if (checkId !== -1) {
    books.splice(checkId, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBook,
  getAllBook,
  getDetailBook,
  EditBookById,
  deleteBookById,
};
