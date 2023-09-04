import { FormEvent } from "react";
import { Link } from "react-router-dom";

type Data = {
  username: string;
  tempatLahir: string;
  tanggalLahir: Date;
  password: string;
};

const Register = () => {
  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: Data = {
      username: e.currentTarget.username.value,
      tempatLahir: e.currentTarget.tempatlahir.value,
      tanggalLahir: e.currentTarget.tanggallahir.value,
      password: e.currentTarget.password.value,
    };
    console.log(data);
  };

  return (
    <form
      onSubmit={formSubmit}
      className="flex flex-col items-center justify-center h-full w-full"
    >
      <h2 className="my-8 text-zinc-800">Buat Akun Baru</h2>
      <label htmlFor="username" className="labelinput">
        Nama Lengkap
      </label>
      <input
        type="text"
        id="username"
        name="username"
        className="userinput"
        required
      />
      <label htmlFor="tempatlahir" className="labelinput">
        Tempat Lahir
      </label>
      <input
        type="text"
        id="tempatlahir"
        name="tempatlahir"
        className="userinput"
        required
      />
      <label htmlFor="tanggallahir" className="labelinput">
        Tanggal Lahir
      </label>
      <input
        type="date"
        id="tanggallahir"
        name="tanggallahir"
        className="userinput"
        required
      />
      <label htmlFor="password" className="labelinput">
        Kata Sandi
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="userinput"
      />
      <button className="normalbutton w-1/2 sm:w-1/3 lg:w-1/4">Submit</button>

      <p className="mt-2">
        Sudah punya akun?{" "}
        <Link to={"/login"} className="text-blue-600 underline">
          Klik disini!
        </Link>
      </p>
    </form>
  );
};

export default Register;
