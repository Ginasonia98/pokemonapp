import PropTypes from "prop-types";

function Pagination({ page, handlePrevClick, handleNextClick }) {
  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className={` ${
          page !== 1 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-400"
        } text-white font-bold py-2 px-4 rounded mr-2 ${
          page === 1 ? "cursor-not-allowed" : ""
        }`}
        onClick={handlePrevClick}
        disabled={page === 1}
        /**
         *className: menentukan kelas CSS untuk styling tombol. Nilai kelas CSS yang diterapkan akan bergantung pada nilai dari page, yaitu nomor halaman yang sedang ditampilkan, jika page sama dengan 1 maka kelas CSS bg-gray-400 akan ditambahkan ke dalam kelas CSS tombol, jika page bukan sama dengan 1 maka kelas CSS bg-purpleTheme hover:bg-yellowTheme akan ditambahkan ke dalam kelas CSS tombol.
          onClick: menentukan fungsi yang akan dieksekusi saat tombol diklik, yaitu handlePrevClick.
          disabled: menentukan apakah tombol akan dinonaktifkan atau tidak, jika page sama dengan 1 maka tombol akan dinonaktifkan.
         */
      >
        Back
      </button>
      <h1>{page}/11</h1>
      <button
        className={` ${
          page !== 11 ? "bg-rose-600 hover:bg-rose-500" : "bg-gray-400"
        } text-white font-bold py-2 px-4 ml-2 rounded ${
          page === 11 ? "cursor-not-allowed" : ""
        }`}
        onClick={handleNextClick}
        disabled={page === 11}
      >
        Continue
      </button>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  handlePrevClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
};

export default Pagination;