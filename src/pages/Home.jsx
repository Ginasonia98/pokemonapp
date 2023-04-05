import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import PropTypes from "prop-types";

import BackgroundImage from "../components/ui/BackgroundImage";
import CardsContainer from "../components/ui/CardComponents/CardsContainer";
import SmallCard from "../components/ui/CardComponents/SmallCard";
import Loader from "../components/ui/Loader";
import Error from "./errors/Error";
import Pagination from "../components/ui/Pagination";

function Home({ searchTerm, openBigCard }) {
  const [page, setPage] = useState(1);
  const limit = 200;
  /*
  const limit = 100; adalah sebuah variabel konstan yang memiliki nilai 100. Variabel ini bisa digunakan di dalam program untuk membatasi jumlah data yang diambil atau diproses, tergantung pada implementasinya. Misalnya, jika variabel ini digunakan di dalam program yang mengambil data dari sebuah API, maka variabel ini bisa digunakan untuk membatasi jumlah data yang diambil hanya sebanyak 100 saja.
   */

  const {
    data: pokemonData,
    isLoading,
    isError,
  } = useQuery(
    ["pokemon", searchTerm, page],
    () =>
      searchTerm
        ? Axios.get(
            `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
          ).then((res) => res.data)
        : Axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${
              (page - 1) * limit
            }&limit=${limit}`
          ).then((res) => {
            const { results } = res.data;
            const requests = results.map((result) => Axios.get(result.url));
            return Promise.all(requests).then((pokemonResponses) =>
              pokemonResponses.map((pokemonRes) => pokemonRes.data)
            );
          }),
    {
      keepPreviousData: false,
    }
  );
  /**
   *Kode tersebut merupakan penggunaan hook useQuery dari library react-query yang digunakan untuk melakukan fetching data dari API yang diberikan. Terdapat beberapa parameter yang diberikan pada useQuery, yaitu:
    ["pokemon", searchTerm, page]: parameter pertama adalah key untuk menentukan data apa yang akan di-fetch. Key ini akan dipakai untuk caching data. Key ini diisi dengan array dengan beberapa value, dalam hal ini adalah string "pokemon", searchTerm, dan page.
    () => ...: parameter kedua adalah function yang berisi async request untuk mengambil data dari API. Pada function ini, dilakukan request dengan Axios untuk mengambil data dari API. Jika searchTerm tidak kosong, maka API endpoint yang diambil adalah https://pokeapi.co/api/v2/pokemon/[searchTerm], sedangkan jika searchTerm kosong, maka diambil endpoint https://pokeapi.co/api/v2/pokemon?offset=[page-1]*[limit]&limit=[limit]. Jika searchTerm kosong, maka akan dilakukan request yang mengambil banyak data dalam satu kali request dengan memanfaatkan Promise.all.
    { keepPreviousData: false }: parameter ketiga adalah options yang diberikan untuk useQuery. Pada kode di atas, diberikan opsi keepPreviousData yang bernilai false, artinya data sebelumnya tidak akan disimpan oleh react-query.
   */

  function hasHomeSprite(data) {
    if (data?.id >= 906 && data?.id <= 1008) {
      return false;
    } else {
      return true;
    }
  }
  /**
   * 
    Fungsi hasHomeSprite() digunakan untuk memeriksa apakah data pokemon yang diberikan memiliki sprite rumah atau tidak. Sprite rumah adalah gambar yang menampilkan pokemon dengan ukuran yang lebih kecil dan biasanya digunakan pada halaman detail pokemon.
    Fungsi ini memeriksa id pokemon dan mengembalikan nilai boolean true jika id-nya tidak berada dalam rentang id pokemon yang tidak memiliki sprite rumah, dan mengembalikan false jika id-nya berada dalam rentang tersebut.
    Rentang id pokemon yang tidak memiliki sprite rumah adalah dari 906 hingga 1008. Karena itulah, jika id pokemon yang diberikan berada di dalam rentang tersebut, fungsi akan mengembalikan nilai false, yang menandakan bahwa pokemon tersebut tidak memiliki sprite rumah. Sebaliknya, jika id pokemon berada di luar rentang tersebut, fungsi akan mengembalikan nilai true, yang menandakan bahwa pokemon tersebut memiliki sprite rumah.
   */

  function isPokemonAvailable(data) {
    if (data?.id >= 1009) {
      return false;
    } else {
      return true;
    }
  }
  /**
   *Fungsi isPokemonAvailable adalah untuk mengecek apakah pokemon dengan data yang diberikan tersedia di game atau tidak. Fungsi ini menerima sebuah objek data yang memiliki properti id. Jika id-nya lebih besar atau sama dengan 1009, maka fungsi akan mengembalikan nilai false yang berarti pokemon tersebut tidak tersedia di dalam game. Jika id-nya lebih kecil dari 1009, maka fungsi akan mengembalikan nilai true yang berarti pokemon tersebut tersedia di dalam game. Fungsi ini digunakan dalam beberapa bagian dari aplikasi ini untuk mengatur tampilan dan perilaku sesuai dengan ketersediaan pokemon.
   */

  const getHomeSprite = useMemo(
    () => (data) => data.sprites.other.home.front_default,
    []
  );

  const getArtworkSprite = useMemo(
    () => (data) => data.sprites.other["official-artwork"]["front_default"],
    []
  );

  function handlePrevClick() {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function handleNextClick() {
    setPage((prevPage) => prevPage + 1);
  }
  /**
   *getHomeSprite adalah fungsi yang digunakan untuk mendapatkan sprite (gambar) home Pokémon. Fungsi ini menerima satu parameter data, yang berisi data Pokémon. Nilai yang dikembalikan oleh fungsi ini adalah sprite home dari Pokémon tersebut.
    getArtworkSprite adalah fungsi yang digunakan untuk mendapatkan sprite (gambar) artwork Pokémon. Fungsi ini menerima satu parameter data, yang berisi data Pokémon. Nilai yang dikembalikan oleh fungsi ini adalah sprite artwork dari Pokémon tersebut.
    handlePrevClick adalah fungsi yang digunakan untuk mengatur state page agar berkurang satu saat tombol prev (sebelumnya) ditekan. Jika nilai page sudah berada di halaman 1, maka state page tidak akan berkurang lagi.
    handleNextClick adalah fungsi yang digunakan untuk mengatur state page agar bertambah satu saat tombol next (selanjutnya) ditekan.
   */

  if (isLoading) {
    return (
      <BackgroundImage>
        <Loader></Loader>
      </BackgroundImage>
    );
  } else if (isError) {
    return (
      <BackgroundImage>
        <Error />
      </BackgroundImage>
    );
  } else if (searchTerm) {
    let imageValue;

    if (!isPokemonAvailable(pokemonData)) {
      return (
        <BackgroundImage>
          <Error />
        </BackgroundImage>
      );
    }

    if (hasHomeSprite(pokemonData)) {
      imageValue = getHomeSprite(pokemonData);
    } else {
      imageValue = getArtworkSprite(pokemonData);
    }
    /*
    Jika gambar home sprite tersedia, maka gambar akan diambil dari sprite tersebut dengan memanggil fungsi getHomeSprite(). Namun, jika gambar home sprite tidak tersedia, maka gambar akan diambil dari sprite artwork dengan memanggil fungsi getArtworkSprite(). Hal ini dilakukan karena tidak semua Pokemon memiliki gambar home sprite, terutama Pokemon yang berasal dari game terbaru.
     */

    return (
      <BackgroundImage>
        <CardsContainer>
          <SmallCard
            height={pokemonData.height}
            id={pokemonData.id}
            image={imageValue}
            key={pokemonData.id}
            name={pokemonData.species.name}
            weight={pokemonData.weight}
            openBigCard={openBigCard}
          />
        </CardsContainer>
      </BackgroundImage>
    );
  } else {
    return (
      <BackgroundImage>
        <CardsContainer>
          {Array.isArray(pokemonData) &&
            pokemonData.map((pokemon) => {
              let imageValue;

              if (!isPokemonAvailable(pokemon)) {
                return null;
              }

              if (hasHomeSprite(pokemon)) {
                imageValue = getHomeSprite(pokemon);
              } else {
                imageValue = getArtworkSprite(pokemon);
              }

              return (
                <SmallCard
                  height={pokemon.height}
                  id={pokemon.id}
                  image={imageValue}
                  key={pokemon.id}
                  name={pokemon.species.name}
                  weight={pokemon.weight}
                  openBigCard={openBigCard}
                />
              );
            })}
        </CardsContainer>
        {/* Kode tersebut berfungsi untuk menampilkan kumpulan kartu kecil (SmallCard) yang menampilkan detail Pokemon. Kumpulan kartu kecil ini didapatkan dari data pokemon yang diperoleh melalui penggunaan useQuery di React Query.
          Dalam perulangan map(), setiap objek pokemon akan diperiksa terlebih dahulu dengan menggunakan fungsi isPokemonAvailable(). Jika objek pokemon tidak tersedia (id-nya lebih dari atau sama dengan 1009), maka akan diabaikan dan tidak akan ditampilkan kartunya.
          Selanjutnya, untuk setiap objek pokemon yang tersedia, kode akan menentukan jenis gambar apa yang akan ditampilkan, apakah home sprite atau artwork sprite. Hal ini dilakukan melalui pemanggilan fungsi hasHomeSprite() dan perintah penggunaan conditional statement. Jika objek pokemon memiliki home sprite, maka imageValue akan diset dengan nilai home sprite-nya melalui pemanggilan fungsi getHomeSprite(), tetapi jika tidak, maka imageValue akan diset dengan artwork sprite-nya melalui pemanggilan fungsi getArtworkSprite().
          Setelah itu, kartu kecil akan dibuat untuk setiap objek pokemon menggunakan komponen SmallCard dengan properti yang dibutuhkan seperti id, nama, tinggi, berat, dan image. Setiap kartu juga akan memiliki properti openBigCard yang merupakan fungsi untuk membuka tampilan besar (BigCard) untuk objek pokemon terkait. */}
        <Pagination
          page={page}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />
      </BackgroundImage>
    );
  }
}

Home.propTypes = {
  searchTerm: PropTypes.string,
  openBigCard: PropTypes.func,
};

export default Home;