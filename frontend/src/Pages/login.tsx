import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connectApi } from "../api/api";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import toast from "react-hot-toast";

interface Data {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const refUsername = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!refUsername.current || !refPassword.current)
      return console.log("Masukkan data dengan lengkap!");

    const data: Data = {
      username: refUsername.current?.value,
      password: refPassword.current?.value,
    };
    setLoading(true);
    connectApi<IAPISuccess>("/login", "POST", data)
      .then((res) => {
        toast.success(res.message);
        return navigate("/");
      })
      .catch((err: IAPIError) => toast.error(err.response.data.message))
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={formSubmit}
      className="flex flex-col items-center justify-center h-full w-full"
    >
      <h1 className="my-8 text-zinc-800">Masuk ke Akun</h1>
      <label htmlFor="username" className="labelinput">
        Username / E-mail
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
      <button
        type="submit"
        disabled={loading}
        className="normalbutton w-9/12 sm:w-1/3 lg:w-1/4"
      >
        {loading ? (
          <CgSpinnerTwoAlt className="mx-auto animate-spin my-1" />
        ) : (
          "Submit"
        )}
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
