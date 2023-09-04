const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-lg">Selamat datang di</p>
      <h1 className="mb-3 -mt-1">{import.meta.env.VITE_PRODUCT_NAME}!</h1>
      <div className="">
        <button className="text-white px-4 py-2 mx-2 my-2 rounded-xl bg-cyan-500">
          Buat Akun
        </button>
        <button className="px-4 py-2 mx-2 my-2 rounded-xl border-2 border-cyan-500">
          Masuk Akun
        </button>
      </div>
    </div>
  );
};

export default Home;
