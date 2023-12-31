import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connectApi } from "../api/api";
import { useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import toast from "react-hot-toast";

const Register = () => {
  const refUsername = useRef<HTMLInputElement>(null);
  const refRealname = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refTempatLahir = useRef<HTMLInputElement>(null);
  const refTanggalLahir = useRef<HTMLInputElement>(null);
  const refGender = useRef<HTMLSelectElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !refUsername.current ||
      !refRealname.current ||
      !refEmail.current ||
      !refTempatLahir.current ||
      !refTanggalLahir.current ||
      !refGender.current ||
      !refPassword.current
    )
      return;

    const data: IRegisterData = {
      username: refUsername.current.value,
      realname: refRealname.current.value,
      email: refEmail.current.value,
      tempatLahir: refTempatLahir.current.value,
      tanggalLahir: new Date(refTanggalLahir.current.value),
      gender: refGender.current.value,
      password: refPassword.current.value,
    };

    setLoading(true);
    connectApi<IAPISuccess>("/register", "POST", data)
      .then((res) => {
        toast.success(res.message);
        navigate("/login", { preventScrollReset: true });
      })
      .catch((err: IAPIError) => toast.error(err.response.data.message))
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={formSubmit}
      className="flex flex-col items-center justify-center w-full pt-20"
    >
      <h1 className="my-8 text-zinc-800">Buat Akun Baru</h1>
      <label htmlFor="username" className="labelinput">
        Username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        className="userinput"
        required
        autoComplete="off"
        ref={refUsername}
      />
      <label htmlFor="realname" className="labelinput">
        Nama Lengkap
      </label>
      <input
        type="text"
        id="realname"
        name="realname"
        className="userinput"
        required
        autoComplete="off"
        ref={refRealname}
      />
      <label htmlFor="email" className="labelinput">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="userinput"
        required
        autoComplete="off"
        ref={refEmail}
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
        autoComplete="off"
        ref={refTempatLahir}
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
        autoComplete="off"
        ref={refTanggalLahir}
      />
      <label htmlFor="gender" className="labelinput">
        Jenis Kelamin
      </label>
      <select
        id="gender"
        name="gender"
        className="userinput"
        required
        autoComplete="off"
        ref={refGender}
      >
        <option value={""}>-- Pilih Jenis Kelamin --</option>
        <option value={"Laki-Laki"}>Laki-Laki</option>
        <option value={"Perempuan"}>Perempuan</option>
      </select>
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
      <div className="w-9/12 sm:w-1/2 lg:w-1/4 flex mb-2">
        <input type="checkbox" id="check" name="check" required />
        <label htmlFor="check" className="ml-3 text-xs sm:text-[.9rem]">
          Saya yakin dengan mendaftar aplikasi ini saya menyetujui dengan syarat
          & persyaratan.
        </label>
      </div>
      <button
        disabled={loading}
        className="normalbutton w-1/2 sm:w-1/3 lg:w-1/4"
      >
        {" "}
        {loading ? (
          <CgSpinnerTwoAlt className="mx-auto animate-spin my-1" />
        ) : (
          "Submit"
        )}
      </button>
      <p className="my-4">
        Sudah punya akun?{" "}
        <Link to={"/login"} className="text-blue-600 underline">
          Klik disini!
        </Link>
      </p>
    </form>
  );
};

export default Register;
