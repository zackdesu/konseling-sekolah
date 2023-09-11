import { CiMenuKebab, CiWarning } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { useRef, useState } from "react";
import { BiTrash } from "react-icons/bi";

interface User {
  username: string;
  name: string;
  gender: string;
  mbti: string | null;
  likedPost: IId[];
  img: string;
}

interface IId {
  id?: string | null;
}

const user: User = {
  username: "zackdesu",
  name: "Wongso Wijaya",
  gender: "Laki-Laki",
  mbti: "INFJ",
  likedPost: [],
  img: "/unknown.jpg",
};
const allUsers: User[] = [
  {
    username: "zackdesu",
    name: "Wongso Wijaya",
    gender: "Laki-Laki",
    mbti: null,
    likedPost: [],
    img: "/unknown.jpg",
  },
  {
    username: "jofanctan",
    name: "Jofan Cristoferry Tan",
    gender: "Laki-Laki",
    mbti: null,
    likedPost: [],
    img: "/unknown.jpg",
  },
  {
    username: "kielll97",
    name: "Wongso Wijaya",
    gender: "Laki-Laki",
    mbti: null,
    likedPost: [],
    img: "/unknown.jpg",
  },
];

const FeedPost = ({ data }: { data: DataPost }) => {
  const [liked, setLiked] = useState<boolean>();
  const [likes, setLikes] = useState(data.likes);

  const handleLikeClick = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
      user.likedPost = user.likedPost.filter((post) => post.id !== data.id);
    } else {
      setLiked(true);
      setLikes(likes + 1);
      user.likedPost.push({ id: data.id });
    }
    console.log(user.likedPost);
  };

  const postOwner = allUsers.find((user) => data.username === user.username);

  const [open, setOpen] = useState(false);
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

  const Menu = ({ className }: { className?: string }) => {
    return (
      <div className={className}>
        <button className="flex items-center text-red-600 my-1">
          <CiWarning className="mr-2" /> Report
        </button>
        <button className="flex items-center my-1">
          <BiTrash className="mr-2" />
          Delete
        </button>
      </div>
    );
  };

  const stringLike = likes.toLocaleString();

  const nominal =
    stringLike.length <= 7
      ? "K"
      : stringLike.length <= 14
      ? "M"
      : stringLike.length <= 21
      ? "B"
      : "";

  return (
    <>
      <div className="bg-zinc-100 rounded-lg w-[90%] max-sm:mx-auto m-2 p-2 flex flex-col justify-between relative border">
        <div className="flex items-center">
          <img
            src={postOwner ? postOwner.img : "/unknown.jpg"}
            width={30}
            className="rounded-full"
          />
          <p className="ml-3">
            {postOwner ? (!data.anonym ? postOwner.username : "Anonym") : "???"}
          </p>
          <span className="mx-2">·</span>
          <p className="text-zinc-400">3d</p>
        </div>
        <p className="text-xs sm:text-base py-4 px-10">{data.post}</p>
        <div className="flex items-center justify-between border-t py-1 mx-10">
          <div className="flex items-center">
            <span onClick={handleLikeClick}>
              <AiFillLike className={liked ? "text-blue-500" : ""} />
            </span>
            <p className="ml-4 text-sm">
              {stringLike.length > 4
                ? stringLike.split(",")[0] + nominal
                : stringLike}
            </p>
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
