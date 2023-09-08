import { BiLockAlt } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { RiEarthLine } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { useState } from "react";

const user: User = {
  username: "zackdesu",
  realname: "Wongso Wijaya",
  gender: "Laki-Laki",
  mbti: "INFJ",
  likedPost: [],
  likedQuotes: [],
  img: "/unknown.jpg",
  email: "",
  tempatLahir: "",
  tanggalLahir: new Date(2007, 1, 8),
  password: "12345678",
};

const PostCard = ({ data }: { data: DataPost }) => {
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
      console.log(user.likedPost);
      user.likedPost.push(data);
    }
    console.log(user.likedPost);
  };

  return (
    <div className="bg-zinc-100 rounded-lg w-[90%] h-[45%] max-sm:h-[100px] max-sm:mx-auto sm:w-[45%] m-2 p-2 flex flex-col justify-between">
      <p className="text-xs sm:text-base">{data.post}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-medium">
            {data.private ? <BiLockAlt /> : <RiEarthLine />}
          </span>
          <span className="mx-1">·</span>
          <span className="font-medium max-sm:text-xs truncate w-[70px]">
            {data.anonym ? "Anonym" : data.username}
          </span>
          <span className="ml-10" onClick={handleLikeClick}>
            <AiFillLike className={liked ? "text-blue-500" : ""} />
          </span>
          <p className="ml-4 text-sm">{likes}</p>
        </div>
        <CiMenuKebab />
      </div>
    </div>
  );
};

export default PostCard;
