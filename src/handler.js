const { nanoid } = require("nanoid");
const books = require("./books");
const {
	successResponse,
	createdSuccessResponse,
	badRequestResponse,
	notAvailableResponse,
	internalServerErrorResponse,
} = require("./utilities");

/**
 * Fungsi handler untuk menyimpan atau menambahkan buku.
 *
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param h: objek yang digunakan untuk menanggapi permintaan
 */
const addBookHandler = (request, h) => {
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

	const id = nanoid(16);
	const finished = pageCount === readPage;
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	const newBook = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished,
		reading,
		insertedAt,
		updatedAt,
	};

	if (name === undefined || readPage > pageCount) {
		const message =
			name === undefined
				? "Gagal menambahkan buku. Mohon isi nama buku"
				: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount";

		return badRequestResponse(h, "fail", message);
	}

	books.push(newBook);

	const isSuccess = books.filter((book) => book.id === id).length > 0;

	if (isSuccess) {
		return createdSuccessResponse(
			h,
			"success",
			"Buku berhasil ditambahkan",
			id
		);
	}

	return internalServerErrorResponse(h, "error", "Buku gagal ditambahkan");
};

/**
 * Fungsi handler untuk menampilkan seluruh buku.
 *
 * @param request: objek yang berisikan informasi terkait permintaan
 */
const getAllBooksHandler = (request) => {
	const { name } = request.query;
	const { reading } = request.query;
	const { finished } = request.query;

	let allBooks = books;

	allBooks = allBooks
		.filter((book) => {
			if (name !== undefined) {
				const queryNameLower = name.toLowerCase();
				const bookNameLower = book.name.toLowerCase();

				return bookNameLower.includes(queryNameLower);
			}

			return true;
		})
		.filter((book) => {
			if (reading !== undefined) {
				if (reading == 0) {
					return book.reading == false;
				} else if (reading == 1) {
					return book.reading == true;
				}
			}

			return true;
		})
		.filter((book) => {
			if (finished !== undefined) {
				if (finished == 0) {
					return book.finished == false;
				} else if (finished == 1) {
					return book.finished == true;
				}
			}

			return true;
		});

	allBooks = allBooks.map((book) => {
		return {
			id: book.id,
			name: book.name,
			publisher: book.publisher,
		};
	});

	return {
		status: "success",
		data: {
			books: allBooks,
		},
	};
};

/**
 * Fungsi handler untuk menampilkan detail buku secara spesifik
 *
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param h: objek yang digunakan untuk menanggapi permintaan
 */
const getBookByIdHandler = (request, h) => {
	const id = request.params.bookId;

	const book = books.filter((book) => book.id === id)[0];

	if (book !== undefined) {
		return {
			status: "success",
			data: {
				book,
			},
		};
	}

	return notAvailableResponse(h, "fail", "Buku tidak ditemukan");
};

/**
 * Fungsi handler untuk mengubah data buku
 *
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param h: objek yang digunakan untuk menanggapi permintaan
 */
const editBookByIdHandler = (request, h) => {
	const id = request.params.bookId;

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

	const updatedAt = new Date().toISOString();

	if (name === undefined || readPage > pageCount) {
		const message =
			name === undefined
				? "Gagal memperbarui buku. Mohon isi nama buku"
				: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount";

		return badRequestResponse(h, "fail", message);
	}

	const index = books.findIndex((book) => book.id === id);

	if (index !== -1) {
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
			updatedAt,
		};

		return successResponse(h, "success", "Buku berhasil diperbarui");
	}

	return notAvailableResponse(
		h,
		"fail",
		"Gagal memperbarui buku. Id tidak ditemukan"
	);
};

/**
 * Fungsi handler untuk menghapus buku
 *
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param h: objek yang digunakan untuk menanggapi permintaan
 */
const deleteBookByIdHandler = (request, h) => {
	const id = request.params.bookId;

	const index = books.findIndex((book) => book.id === id);

	if (index !== -1) {
		books.splice(index, 1);

		return successResponse(h, "success", "Buku berhasil dihapus");
	}

	return notAvailableResponse(
		h,
		"fail",
		"Buku gagal dihapus. Id tidak ditemukan"
	);
};

module.exports = {
	addBookHandler,
	getAllBooksHandler,
	getBookByIdHandler,
	editBookByIdHandler,
	deleteBookByIdHandler,
};
