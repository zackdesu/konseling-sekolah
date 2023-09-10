import PostCard from "../Components/postcard";
import { dataPost } from "../Components/data";
import { useState, useEffect } from "react";
import { infoAcc, refreshAcc } from "../api/api";
import Redirectuser from "../utils/redirecthome";

const Profile = () => {
  Redirectuser();

  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<IProfile>();

  useEffect(() => {
    refreshAcc<IAPISuccess>()
      .then((res) => res.token && setToken(res.token))
      .catch((err: IAPIError) => {
        console.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    if (!token) return;

    infoAcc<IProfile>(token)
      .then((res) => setUser(res))
      .catch((err: IAPIError) => console.error(err.response.data.message));
  }, [token]);

  const filteredPost = dataPost.filter(
    (u) => u.username === (user ? user.username : null)
  );

  return (
    <div className="sm:grid max-lg:grid-rows-3 lg:grid-cols-3 md:h-full mx-10 py-20 gap-4">
      <div className="max-sm:flex max-sm:flex-col max-lg:grid grid-cols-6 grid-rows-2 grid-flow-col lg:flex lg:flex-col mx-5 mt-5">
        <img
          src="/unknown.jpg"
          className="max-w-[240px] max-sm:w-2/6 max-lg:w-full lg:w-9/12 max-lg:row-span-2 place-self-center rounded-full"
        />
        <h1 className="max-sm:text-center max-sm:mt-5 lg:mt-3 lg:mb-1 max-lg:col-span-3 max-sm:self-center max-lg:self-end sm:ml-5">
          {user ? user.realname : null}
        </h1>
        <p className="text-zinc-400 mt-2 max-lg:col-span-2 max-sm:self-center lg:mb-1 sm:ml-6">
          {user ? user.gender : null} ·{" "}
          {user ? (user.mbti ? user.mbti : "Set MBTI") : null}
        </p>
        <p className="max-lg:hidden sm:ml-6">Belum ada bio.</p>
        <button className="invertedbutton w-3/4 max-lg:col-start-5 max-lg:col-span-2 max-lg:row-span-2 place-self-center">
          Edit Profile
        </button>
      </div>

      <div className="w-full sm:w-[90%] max-lg:row-span-3 lg:col-span-2 mx-auto lg:mx-5 py-5 flex flex-wrap overflow-y-auto">
        {filteredPost.length > 0 ? (
          filteredPost.map((e, i) => <PostCard data={e} key={i} />)
        ) : (
          <div className="flex items-center justify-center w-full h-full text-center">
            Sepertinya kamu belum pernah <br /> membuat postingan sebelumnya
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
