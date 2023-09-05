import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col">
      <img src="/notfound.svg" className="h-[45%]" />
      <h2>Halaman tidak ditemukan...</h2>
      <p>
        Kembali ke{" "}
        <Link className="underline text-blue-500" to={"/"}>
          halaman utama
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
