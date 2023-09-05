import { FormEvent, useRef } from "react";
import { Link } from "react-router-dom";

interface Data {
  username: string;
  password: string;
}

const Login = () => {
  const refUsername = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!refUsername.current || !refPassword.current)
      return console.log("Masukkan data dengan lengkap!");

    const data: Data = {
      username: refUsername.current?.value,
      password: refPassword.current?.value,
    };
    console.log(data);
  };

  return (
    <form
      onSubmit={formSubmit}
      className="flex flex-col items-center justify-center h-full w-full"
    >
      <h2 className="my-8 text-zinc-800">Masuk ke Akun</h2>
      <label htmlFor="username" className="labelinput">
        Nama Lengkap
      </label>
      <input
        type="text"
        id="username"
        name="username"
        className="userinput"
        required
        ref={refUsername}
      />
      <label htmlFor="password" className="labelinput">
        Kata Sandi
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="userinput"
        ref={refPassword}
      />
      <button type="submit" className="normalbutton w-1/2 sm:w-1/3 lg:w-1/4">
        Submit
      </button>
      <p className="mt-2">
        Belum punya akun?{" "}
        <Link to={"/register"} className="text-blue-600 underline">
          Klik disini!
        </Link>
      </p>
    </form>
  );
};

export default Login;
