import { useState, useRef } from "react";
import PropTypes from "prop-types";
import SearchIcon from "./SearchIcon";
import miniLogo from "../../img/pokedex_mini_logo.png";

function SearchBar({ placeHolder, onSearch }) {
  const inputRef = useRef(null);
  /**
   *useRef adalah hook pada React yang digunakan untuk membuat referensi ke suatu elemen HTML atau komponen React.
   */
  const [searchTerm, setSearchTerm] = useState("");

  const handleIconClick = () => {
    inputRef.current.focus();
  };

  const handleSmallScreenClick = () => {
    onSearch("");
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };
  /*
  handleIconClick(): Fungsi ini akan dipanggil ketika tombol icon search pada layar kecil di klik. Tujuannya adalah untuk mengarahkan fokus input pada kolom pencarian.
  handleSmallScreenClick(): Fungsi ini akan dipanggil ketika area kosong di sekitar tombol search pada layar kecil di klik. Tujuannya adalah untuk menghapus teks yang sudah diketik pada kolom pencarian.
  handleInputChange(event): Fungsi ini akan dipanggil ketika ada perubahan nilai pada input kolom pencarian. Tujuannya adalah untuk mengatur nilai searchTerm state sesuai dengan nilai yang baru diinputkan.
  handleSearch(): Fungsi ini akan dipanggil ketika tombol search pada kolom pencarian di klik. Tujuannya adalah untuk memanggil fungsi onSearch() yang diberikan oleh komponen induk dengan argumen searchTerm. Sehingga nantinya komponen induk bisa mengambil nilai searchTerm dan melakukan proses pencarian sesuai dengan kata kunci yang dimasukkan pengguna.
   */

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };
  /**
   *Fungsi ini memiliki parameter event yang merepresentasikan event yang terjadi. Pada kondisi if, kita memeriksa apakah key yang ditekan sama dengan "Enter". Jika iya, maka kita memanggil onSearch function dengan searchTerm sebagai argument. Hal ini akan memicu pencarian pada aplikasi.
    Dengan begitu, handleKeyPress berfungsi untuk menangani aksi ketika user menekan tombol "Enter" pada saat input search aktif.
   */

  return (
    <div className=" items-center justify-between w-96 p-2 rounded-3xl shadow-md bg-white focus-within:ring-2 focus-within:ring-yellowTheme focus-within:outline-none">
      <div className=" flex items-center justify-between w-full">
        <img
          src={miniLogo}
          alt="PokeDex Logo"
          className="w-9 h-9 hidden md:block "
          onClick={handleIconClick}
          draggable="false"
        />
        <img
          src={miniLogo}
          alt="PokeDex Logo"
          className="w-9 h-9 block md:hidden cursor-pointer"
          onClick={handleSmallScreenClick}
          draggable="false"
        />
        <input
          type="text"
          placeholder={placeHolder}
          className="mx-2 w-full outline-none bg-white text-purpleTheme"
          ref={inputRef}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <SearchIcon onClick={handleSearch} />
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;