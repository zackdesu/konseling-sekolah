import { Link } from "react-router-dom";

const Home = () => {
  const randomize = [
    "/random/1.svg",
    "/random/2.svg",
    "/random/3.svg",
    "/random/4.svg",
  ];
  const randomMath = Math.round(Math.random() * 3);
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <img src={randomize[randomMath]} width={296} height={296} />
      <p className="text-lg">Selamat datang di</p>
      <h1 className="mb-3 -mt-1">{import.meta.env.VITE_PRODUCT_NAME}!</h1>
      <div className="">
        <Link to={"/register"}>
          <button className="normalbutton">Buat Akun</button>
        </Link>
        <Link to={"/login"}>
          <button className="invertedbutton">Masuk Akun</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
