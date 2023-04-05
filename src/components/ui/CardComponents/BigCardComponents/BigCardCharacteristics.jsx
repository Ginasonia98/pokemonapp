import { PropTypes } from "prop-types";

function BigCardCharacteristics({ abilities, height, image, weight }) {
  return (
    <div className=" container flex flex-col items-center justify-start xl:flex-row">
      <img src={image} alt="Pokemon" className="max-h-40 xl:max-h-64 "></img>

      <div className="p-0 xl:p-4 w-min h-min ">
        <div className=" h-full bg-white rounded-3xl flex-row justify-center xl:justify-start xl:flex ">
          <div className=" h-full w-36 xl:w-1/2 ">
            <div className=" h-1/2 flex flex-col justify-center p-0 xl:p-8 ">
              <p className="text-lg text-pink-700 text-center xl:text-2xl">
                Weight:
              </p>
              <p className="text-lg text-orange-300 text-center xl:text-2xl">
                {weight}
              </p>
            </div>

            <div className=" h-1/2 flex flex-col justify-center p-0 xl:p-8 pt-0 ">
              <p className="text-lg text-pink-700 text-center xl:text-2xl">
                Height:
              </p>
              <p className="text-lg text-orange-300  text-center xl:text-2xl">
                {height}
              </p>
            </div>
          </div>
          <div className=" h-full w-36 xl:w-1/2 p-0 xl:p-8 xl:pr-10 overflow-auto">
            <p className=" h-1/4 text-pink-700 text-lg text-center mb-0 xl:mb-1 xl:text-2xl">
              Abilities:
            </p>
            <div className="flex flex-col justify-center">
              {abilities.map((ability, index) => (
                <p
                  key={index}
                  className="text-lg text-orange-300 xl:text-end text-center capitalize xl:text-2xl"
                >
                  {ability.ability.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BigCardCharacteristics.propTypes = {
  abilities: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
};
/**
 *Pada kasus ini, kita memiliki sebuah komponen bernama BigCardCharacteristics yang menerima props berupa abilities, height, image, dan weight. Dengan menambahkan prop-types pada komponen ini, kita memastikan bahwa:
  abilities harus bertipe array of object dan wajib ada (isRequired)
  height harus bertipe number dan wajib ada (isRequired)
  image harus bertipe string dan wajib ada (isRequired)
  weight harus bertipe number dan wajib ada (isRequired)
  Dalam hal ini, penggunaan prop-types membantu kita memastikan bahwa data yang diterima oleh komponen adalah sesuai dengan yang kita harapkan dan jika terjadi kesalahan tipe data, maka akan muncul pesan error pada console. Dengan begitu, kita dapat menghindari bug dan meningkatkan keamanan dan kestabilan aplikasi.
 */

export default BigCardCharacteristics;