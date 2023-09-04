import { FormEvent } from "react";
import { Link } from "react-router-dom";

type Data = {
  username: string;
  password: string;
};

const Login = () => {
  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: Data = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
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
