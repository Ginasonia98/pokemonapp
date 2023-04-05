import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
/**
 *QueryClient adalah objek yang merepresentasikan klien untuk mengelola data caching dan fetching menggunakan React Query. QueryClient digunakan untuk mengatur cache default dan pengaturan lainnya seperti waktu kadaluarsa cache atau strategi cache. Anda bisa membuat instance dari QueryClient untuk mengatur client-nya dengan preferensi Anda.
QueryClientProvider adalah komponen React yang digunakan untuk memberikan instance QueryClient ke seluruh aplikasi React. QueryClientProvider akan membungkus komponen-komponen React yang membutuhkan data fetching menggunakan React Query, sehingga data bisa di-fetch dan disimpan di cache dengan mudah.
Dalam penggunaannya, QueryClientProvider diletakkan diatas komponen-komponen yang memerlukan data fetching dengan React Query, dengan menggunakan prop client untuk memberikan instance QueryClient yang telah diatur. Dengan demikian, semua komponen tersebut bisa mengakses data caching dan fetching yang diatur oleh instance QueryClient yang sama.
 */
import { useState } from "react";

import Layout from "./components/layouts/Layout";
import Home from "./pages/Home";
import BigCard from "./components/ui/CardComponents/BigCard";
import Backdrop from "./components/ui/CardComponents/Backdrop";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  /**
   *defaultOptions adalah sebuah objek yang memiliki properti queries, dan properti queries ini memungkinkan untuk menentukan opsi-opsi default untuk semua permintaan query yang akan dibuat dengan instance QueryClient ini. Dalam kode tersebut, kita menetapkan refetchOnWindowFocus: false sebagai opsi default untuk semua query.
    refetchOnWindowFocus: false mematikan pengambilan ulang data (refetch) secara otomatis ketika window focus diubah, seperti ketika pengguna beralih dari aplikasi dan kembali ke aplikasi tersebut. Opsi ini berguna untuk mencegah pengambilan ulang data yang tidak perlu, dan mempercepat kinerja aplikasi.
   */

  const [searchTerm, setSearchTerm] = useState("");
  const [bigCardIsOpen, setBigCardIsOpen] = useState(false);
  const [bigCardData, setBigCardData] = useState(null);

  function openBigCard(id, image) {
    setBigCardIsOpen(true);
    setBigCardData({ id, image });
  }
  /**
   *Pertama, fungsi ini memanggil setBigCardIsOpen(true). setBigCardIsOpen adalah sebuah state setter function yang memperbarui nilai dari state bigCardIsOpen dalam React component. Dalam hal ini, setBigCardIsOpen(true) memperbarui nilai dari state bigCardIsOpen menjadi true. State bigCardIsOpen digunakan untuk menentukan apakah card yang lebih besar sedang ditampilkan atau tidak.
    Selanjutnya, fungsi ini memanggil setBigCardData({ id, image }). setBigCardData adalah sebuah state setter function yang memperbarui nilai dari state bigCardData dalam React component. Dalam hal ini, setBigCardData({ id, image }) memperbarui nilai dari state bigCardData menjadi sebuah objek dengan dua properti: id dan image. Properti id diisi dengan nilai id yang diberikan sebagai argumen, sedangkan properti image diisi dengan nilai image yang diberikan sebagai argumen. State bigCardData digunakan untuk menampilkan data pada card yang lebih besar.
   */

  function closeBigCard() {
    setBigCardIsOpen(false);
  }
  /**
   *pertama, fungsi ini memanggil setBigCardIsOpen(false). setBigCardIsOpen adalah sebuah state setter function yang memperbarui nilai dari state bigCardIsOpen dalam React component. Dalam hal ini, setBigCardIsOpen(false) memperbarui nilai dari state bigCardIsOpen menjadi false. State bigCardIsOpen digunakan untuk menentukan apakah card yang lebih besar sedang ditampilkan atau tidak.
   */

  return (
    <QueryClientProvider client={client}>
      <Layout onSearch={setSearchTerm}>
        <Home searchTerm={searchTerm} openBigCard={openBigCard} />
      </Layout>
      {bigCardIsOpen && <Backdrop closeBigCard={closeBigCard} />}
      {bigCardIsOpen && (
        <BigCard
          closeBigCard={closeBigCard}
          id={bigCardData.id}
          image={bigCardData.image}
        />
      )}
    </QueryClientProvider>
    /**
     *Kode yang diberikan merupakan implementasi dari QueryClientProvider yang digunakan untuk memberikan akses ke QueryClient ke seluruh komponen React dalam aplikasi. QueryClientProvider menerima satu prop, yaitu client, yang harus diisi dengan instance dari QueryClient.
      Dalam konteks kode di atas, client telah diinisialisasi pada baris kode sebelumnya dengan defaultOptions yang diberikan pada queries. Pada defaultOptions, opsi yang diberikan adalah refetchOnWindowFocus: false yang berguna untuk mencegah pengambilan data ulang pada saat pengguna fokus kembali pada aplikasi setelah membuka aplikasi lain atau tab yang berbeda.
      Selanjutnya, terdapat komponen Layout yang diberikan prop onSearch={setSearchTerm}. Prop onSearch adalah sebuah callback yang akan dipanggil ketika pengguna melakukan pencarian pada aplikasi, dan kemudian akan menjalankan fungsi setSearchTerm. Fungsi setSearchTerm akan memperbarui nilai dari state searchTerm dalam React component.
      Kemudian, terdapat komponen Home yang diberikan prop searchTerm dan openBigCard. Prop searchTerm merupakan state searchTerm yang telah diubah sebelumnya dengan setSearchTerm ketika pengguna melakukan pencarian. Sedangkan prop openBigCard adalah sebuah callback yang akan dipanggil ketika pengguna mengklik sebuah card, dan akan membuka card yang lebih besar.
      Terakhir, terdapat kondisi yang mengecek apakah bigCardIsOpen bernilai true. Jika iya, maka komponen Backdrop dan BigCard akan ditampilkan. Backdrop adalah sebuah komponen yang menampilkan latar belakang gelap dan digunakan untuk menandakan bahwa card yang lebih besar sedang ditampilkan. Sedangkan BigCard adalah sebuah komponen yang menampilkan card yang lebih besar dengan informasi lebih detail. Keduanya diberikan prop closeBigCard, yaitu sebuah callback yang akan dipanggil ketika pengguna menutup card yang lebih besar dengan mengklik tombol close. Callback ini akan memanggil fungsi closeBigCard() yang telah dijelaskan sebelumnya.
     */
  );
}

export default App;
