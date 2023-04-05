import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className={styles["profile-main-loader"]}>
        <div className={styles.loader}>
          <svg className={styles["circular-loader"]} viewBox="25 25 50 50">
            <circle
              className={styles["loader-path"]}
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#70c542"
              strokeWidth="2"
            />
            {/* Elemen SVG <circle> ini digunakan untuk membuat lingkaran pada halaman web. Dalam kode tersebut, atribut cx menentukan koordinat pusat lingkaran pada sumbu x, cy menentukan koordinat pusat lingkaran pada sumbu y, dan r menentukan radius lingkaran. Atribut fill menentukan warna isi dari lingkaran, sedangkan stroke menentukan warna garis lingkaran dan strokeWidth menentukan lebar garis lingkaran. Kelas styles["loader-path"] ditentukan pada objek styles di file CSS dan digunakan untuk menentukan gaya lingkaran. */}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Loader;