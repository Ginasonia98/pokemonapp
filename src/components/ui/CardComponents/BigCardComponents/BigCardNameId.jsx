import { PropTypes } from "prop-types";

function BigCardNameId({ name, id }) {
  return (
    <div className=" flex items-center justify-center">
      <h1 className="text-3xl capitalize font-bold xl:text-5xl text-purple-600">
        {name}
      </h1>
      <h1 className="text-xl capitalize ml-4 text-violet-500 xl:text-3xl">
        #{id.toString().padStart(4, "0")}
      </h1>
      {/* Menampilkan nomor ID dalam format string dengan menambahkan tanda "#" di depannya.
        Mengubah nomor ID menjadi 4 digit, dimana jika nomor ID kurang dari 4 digit, maka akan menambahkan "0" pada digit pertama hingga mencapai 4 digit. */}
    </div>
  );
}

BigCardNameId.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default BigCardNameId;