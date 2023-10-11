import { FormEvent, useState } from "react";
import Redirectuser from "../utils/redirecthome";
import toast from "react-hot-toast";
import { connectApi } from "../api/api";
import useAccContext from "../context/useAllContext";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const EditAcc = () => {
  const { user, setUser } = useAccContext();
  const token = Redirectuser();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    const data = {
      realname: user.realname,
      username: user.username,
      mbti: user.mbti,
      phonenumber: user.phonenumber,
    };

    setLoading(true);

    connectApi<IAPISuccess>("/account", "PUT", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => toast.success(res.message))
      .catch((err: IAPIError) => toast.error(err.response.data.message))
      .finally(() => setLoading(false));
  };

  if (!user) return;

  return (
    <form
      className="flex flex-col items-center justify-center w-full pt-20"
      onSubmit={handleSubmit}
    >
      <h1 className="my-5">Edit Akun</h1>
      <label htmlFor="realname" className="labelinput">
        Nama Lengkap
      </label>
      <input
        id="realname"
        name="realname"
        type="text"
        className="userinput"
        value={user.realname}
        onChange={(e) =>
          setUser((prev) => prev && { ...prev, realname: e.target.value })
        }
      />
      <label className="labelinput">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        className="userinput"
        required
        autoComplete="off"
        value={user.username}
        onChange={(e) =>
          setUser((prev) => prev && { ...prev, username: e.target.value })
        }
      />
      <label htmlFor="mbti" className="labelinput2">
        MBTI
      </label>
      <input
        type="mbti"
        id="mbti"
        name="mbti"
        className="userinput"
        autoComplete="off"
        value={user.mbti ?? ""}
        onChange={(e) =>
          setUser((prev) => prev && { ...prev, mbti: e.target.value })
        }
      />
      <label htmlFor="phonenumber" className="labelinput">
        Nomor WhatsApp
      </label>
      <input
        type="phonenumber"
        id="phonenumber"
        name="phonenumber"
        className="userinput"
        autoComplete="off"
        value={user.phonenumber ?? ""}
        onChange={(e) =>
          setUser((prev) => prev && { ...prev, phonenumber: e.target.value })
        }
      />
      <button className="normalbutton">
        {" "}
        {loading ? (
          <CgSpinnerTwoAlt className="mx-auto animate-spin my-1" />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default EditAcc;
