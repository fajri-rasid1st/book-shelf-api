/**
 * Fungsi yang mengembalikan response saat request berhasil.
 *
 * @param h: objek yang digunakan untuk menanggapi permintaan
 * @param status: status response yang dikembalikan
 * @param message: pesan response yang dikembalikan
 */
const successResponse = (h, status, message) => {
	const response = h.response({
		status,
		message,
	});

	response.code(200);

	return response;
};

/**
 * Fungsi yang mengembalikan response saat request penambahan data berhasil.
 *
 * @param h: objek yang digunakan untuk menanggapi permintaan
 * @param status: status response yang dikembalikan
 * @param message: pesan response yang dikembalikan
 * @param bookId: id buku yang dikembalikan
 */
const createdSuccessResponse = (h, status, message, bookId) => {
	const response = h.response({
		status,
		message,
		data: {
			bookId,
		},
	});

	response.code(201);

	return response;
};

/**
 * Fungsi yang mengembalikan response saat request gagal, diakibatkan karena
 * request yang tidak valid dari client.
 *
 * @param h: objek yang digunakan untuk menanggapi permintaan
 * @param status: status response yang dikembalikan
 * @param message: pesan response yang dikembalikan
 */
const badRequestResponse = (h, status, message) => {
	const response = h.response({
		status,
		message,
	});

	response.code(400);

	return response;
};

/**
 * Fungsi yang mengembalikan response saat request gagal, diakibatkan karena
 * halaman yang di-request tidak tersedia.
 *
 * @param h: objek yang digunakan untuk menanggapi permintaan
 * @param status: status response yang dikembalikan
 * @param message: pesan response yang dikembalikan
 */
const notAvailableResponse = (h, status, message) => {
	const response = h.response({
		status,
		message,
	});

	response.code(404);

	return response;
};

/**
 * Fungsi yang mengembalikan response saat request gagal, diakibatkan karena
 * alasan umum (generic error)
 *
 * @param h: objek yang digunakan untuk menanggapi permintaan
 * @param status: status response yang dikembalikan
 * @param message: pesan response yang dikembalikan
 */
const internalServerErrorResponse = (h, status, message) => {
	const response = h.response({
		status,
		message,
	});

	response.code(500);

	return response;
};

module.exports = {
	successResponse,
	createdSuccessResponse,
	badRequestResponse,
	notAvailableResponse,
	internalServerErrorResponse,
};
