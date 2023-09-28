import { FormEvent } from "react";
import Redirectuser from "../utils/redirecthome";
import toast from "react-hot-toast";
import { connectApi } from "../api/api";
import useAccContext from "../context/useAllContext";

const EditAcc = () => {
  const { user, setUser } = useAccContext();
  const token = Redirectuser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    const data = {
      realname: user.realname,
      username: user.username,
      mbti: user.mbti,
    };

    connectApi<IAPISuccess>("/account", "PUT", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => toast.success(res.message))
      .catch((err: IAPIError) => toast.error(err.response.data.message));
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
      <label htmlFor="mbti" className="labelinput">
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
      <label htmlFor="mbti" className="labelinput">
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
      <button className="normalbutton">Submit</button>
    </form>
  );
};

export default EditAcc;
