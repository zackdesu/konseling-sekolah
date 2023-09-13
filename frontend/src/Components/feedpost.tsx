import { CiMenuKebab, CiWarning } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { BiPen, BiTrash } from "react-icons/bi";
import { api, refreshAcc } from "../api/api";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const FeedPost = ({ data, user }: { data: DataPost; user?: IProfile }) => {
  // const [liked, setLiked] = useState<boolean>();
  // const [likes, setLikes] = useState(data.likes ? data.likes.length : 0);

  // const navigate = useNavigate()

  // const handleLikeClick = () => {
  //   if(!user) return navigate('/')
  //   if (liked) {
  //     setLiked(false);
  //     setLikes(likes - 1);
  //     user.likedPost = user.likedPost ? user.likedPost.filter((post) => post.id !== data.id) : undefined
  //   } else {
  //     setLiked(true);
  //     setLikes(likes + 1);
  //     user.likedPost ? user.likedPost.push({ id: data.id }) : null
  //   }
  //   console.log(user.likedPost);
  // };

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    refreshAcc<IAPISuccess>()
      .then((res) => setToken(res.token))
      .catch((err: IAPIError) => console.error(err.response.data.message));
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  document.addEventListener("click", (e) => {
    const button = buttonRef.current;
    if (!button) return;
    const svgbutton = button.childNodes[0];
    const pathfill = svgbutton.childNodes[0];

    if (e.target === button || e.target === svgbutton || e.target === pathfill)
      return;
    else setOpen(false);
  });

  const handleDelete = () => {
    api
      .delete(`/post/${data.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse<{ message: string }>) =>
        alert(res.data.message)
      )
      .catch((err: IAPIError) => console.error(err.response.data.message));
  };

  const Menu = ({ className }: { className?: string }) => {
    return (
      <div className={className}>
        <button className="flex items-center text-red-600 my-1">
          <CiWarning className="mr-2" /> Report
        </button>
        {data.Account.username == (user ? user.username : null) ? (
          <>
            <Link
              to={"/editfeed/" + data.id}
              className="flex items-center my-1"
            >
              <BiPen className="mr-2" /> Edit
            </Link>
            <button onClick={handleDelete} className="flex items-center my-1">
              <BiTrash className="mr-2" /> Delete
            </button>
          </>
        ) : null}
      </div>
    );
  };

  // const stringLike = likes.toLocaleString();

  // const nominal =
  //   stringLike.length <= 7
  //     ? "K"
  //     : stringLike.length <= 14
  //     ? "M"
  //     : stringLike.length <= 21
  //     ? "B"
  //     : "";

  return (
    <>
      <div className="bg-zinc-100 rounded-lg w-[90%] max-sm:mx-auto m-2 p-2 flex flex-col justify-between relative border">
        <div className="flex items-center">
          <img
            src={data.Account.img ? data.Account.img : "/unknown.jpg"}
            width={30}
            className="rounded-full"
          />
          <p className="ml-3">
            {!data.anonym ? data.Account.username : "Anonym"}
          </p>
          <span className="mx-2">·</span>
          <p className="text-zinc-400">3d</p>
        </div>
        <p className="text-xs sm:text-base py-4 px-10">{data.post}</p>
        <div className="flex items-center justify-between border-t py-1 mx-10">
          <div className="flex items-center">
            {/* <span onClick={handleLikeClick}>
              <AiFillLike className={liked ? "text-blue-500" : ""} />
            </span>
            <p className="ml-4 text-sm">
              {stringLike.length > 4
                ? stringLike.split(",")[0] + nominal
                : stringLike}
            </p> */}
            <span>
              <AiFillLike />
            </span>
            <p className="ml-4 text-sm">{data.likes ? data.likes.length : 0}</p>
          </div>
          <button ref={buttonRef} onClick={() => setOpen(!open)}>
            <CiMenuKebab />
          </button>
          <Menu
            className={`absolute top-full right-5 z-10 rounded-lg p-2 bg-white border ${
              open ? "" : "hidden"
            }`}
          />
        </div>
      </div>
    </>
  );
};

export default FeedPost;
