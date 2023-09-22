import { useState, useEffect } from "react";
import { connectApi, infoAcc } from "../api/api";
import Redirectuser from "../utils/redirecthome";
import FeedPost from "../Components/feedpost";
import toast from "react-hot-toast";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const Profile = () => {
  const token = Redirectuser();

  const [dataPost, setDataPost] = useState<DataPost[]>();
  const [user, setUser] = useState<IProfile>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    infoAcc<IProfile>(token)
      .then((res) => setUser(res))
      .catch((err: IAPIError) => toast.error(err.response.data.message));

    setLoading(false);
  }, [token]);

  const fetchData = () =>
    void (() => {
      connectApi<DataPost[]>("/user/post")
        .then((res) => setDataPost(res))
        .catch((err: IAPIError) => toast.error(err.response.data.message));
    })();

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPost = dataPost
    ? dataPost.filter(
        (post) => post.Account?.username === (user && user.username)
      )
    : [];

  return user ? (
    <div className="sm:grid lg:grid-cols-3 mx-10 pt-20 pb-10 gap-4">
      <div className="max-sm:flex max-sm:flex-col max-lg:grid grid-cols-6 grid-rows-2 grid-flow-col lg:flex lg:flex-col mx-5 mt-5">
        <img
          src="/unknown.jpg"
          className="max-w-[240px] max-sm:w-2/6 max-lg:w-full lg:w-9/12 max-lg:row-span-2 place-self-center rounded-full"
        />
        <h2 className="max-sm:text-center max-sm:mt-5 lg:mt-3 lg:mb-1 max-lg:col-span-3 max-sm:self-center max-lg:self-end sm:ml-5">
          {user.realname}
        </h2>
        <p className="text-zinc-400 mt-2 max-lg:col-span-2 max-sm:self-center lg:mb-1 sm:ml-6 font-semibold">
          @{user.username}
        </p>
        <p className="text-zinc-400 mt-2 max-lg:hidden mb-1 ml-6">
          {user.gender} · {user.mbti ? user.mbti : "Set MBTI"}
        </p>
        <p className="max-lg:hidden sm:ml-6">Belum ada bio.</p>
        <button className="invertedbutton w-3/4 max-lg:col-start-5 max-lg:col-span-2 max-lg:row-span-2 place-self-center">
          Edit Profile
        </button>
      </div>

      <div className="w-full sm:w-[90%] mx-auto col-span-2 overflow-y-auto h-[80vh]">
        {!loading ? (
          filteredPost.length > 0 ? (
            filteredPost.map((e, i) => (
              <FeedPost
                data={e}
                key={i}
                user={user}
                token={token}
                func={fetchData}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full text-center">
              Sepertinya kamu belum pernah <br /> membuat postingan sebelumnya
            </div>
          )
        ) : (
          <CgSpinnerTwoAlt className="mx-auto animate-spin my-1" />
        )}
      </div>
    </div>
  ) : (
    <>
      <CgSpinnerTwoAlt className="mx-auto animate-spin my-1" size={50} />
    </>
  );
};

export default Profile;
