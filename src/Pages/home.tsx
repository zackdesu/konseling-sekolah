const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-lg">Selamat datang di</p>
      <h1 className="mb-3 -mt-1">{import.meta.env.VITE_PRODUCT_NAME}!</h1>
      <div className="">
        <button className="normalbutton">Buat Akun</button>
        <button className="invertedbutton">Masuk Akun</button>
      </div>
    </div>
  );
};

export default Home;
