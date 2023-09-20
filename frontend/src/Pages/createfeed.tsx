import { FormEvent, useEffect, useRef, useState } from "react";
import Redirectuser from "../utils/redirecthome";
import { api, postThePosts, refreshAcc } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";

const CreateFeed = () => {
  Redirectuser();
  const { id } = useParams();
  const post = useRef<HTMLTextAreaElement>(null);
  const isPrivate = useRef<HTMLInputElement>(null);
  const isAnonym = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    refreshAcc<IAPISuccess>()
      .then((res) => setToken(res.token))
      .catch((err: IAPIError) => console.error(err.response.data.message));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentPost = post.current;
    const currentPrivate = isPrivate.current;
    const currentAnonym = isAnonym.current;

    if (!currentPost || !currentPrivate || !currentAnonym) return;

    const data = {
      postVal: currentPost.value,
      privateVal: currentPrivate.checked,
      anonymVal: currentAnonym.checked,
    };

    if (id) {
      api
        .put("/post/" + id, data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res: AxiosResponse<{ message: string }>) => {
          alert(res.data.message);
          navigate("/feed");
        })
        .catch((err: IAPIError) => console.error(err.response.data.message));
      return false;
    }
    postThePosts<IAPISuccess>(data, token)
      .then((res) => {
        alert(res.message);
        navigate("/feed");
      })
      .catch((err: IAPIError) => alert(err.response.data.message));
  };

  return (
    <div className="py-20">
      <form
        onSubmit={handleSubmit}
        className="my-10 flex flex-col items-center"
      >
        <h2>{id ? "Edit Feed" : "Create Feed"}</h2>
        <textarea
          rows={5}
          name="post"
          id="post"
          className="my-5 border outline-none p-1 w-11/12 md:w-1/2"
          ref={post}
          placeholder="Apa yang sedang anda pikirkan..."
        />

        <div className="">
          <div className="flex ml-3 mb-2">
            <input
              type="checkbox"
              name="private"
              id="private"
              ref={isPrivate}
            />
            <label htmlFor="private" className="ml-5 text-xs md:text-base">
              Jadikan sebagai pribadi / private
            </label>
          </div>
          <div className="flex ml-3 mb-5 self-start">
            <input type="checkbox" name="anonym" id="anonym" ref={isAnonym} />
            <label htmlFor="anonym" className="ml-5 text-xs md:text-base">
              Jadikan sebagai anonim (tidak diketahui)
            </label>
          </div>
        </div>

        <button type="submit" className="normalbutton">
          {id ? "Edit postingan" : "Buat Postingan"}
        </button>
      </form>
    </div>
  );
};

export default CreateFeed;
