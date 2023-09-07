import { BiLockAlt } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { RiEarthLine } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { useEffect, useState } from "react";

interface User {
  username: string;
  name: string;
  gender: string;
  mbti: string;
  likedPost: DataPost[];
  img: string;
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
    mbti: "INFJ",
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
      console.log(user.likedPost);
      user.likedPost.push(data);
    }
    console.log(user.likedPost);
  };

  const postOwner = allUsers.find((user) => data.username === user.username);

  useEffect(() => {
    console.log(postOwner?.img);
  }, [postOwner]);

  return (
    <div className="bg-zinc-100 rounded-lg w-[90%] max-sm:mx-auto m-2 p-2 flex flex-col justify-between">
      <div className="flex items-center">
        <img
          src={postOwner ? postOwner.img : "/unknow.jpg"}
          width={30}
          className="rounded-full"
        />
        <p className="ml-3">{postOwner ? postOwner.username : "???"}</p>
      </div>
      <p className="text-xs sm:text-base py-6 my-3 border">{data.post}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-medium">
            {data.private ? <BiLockAlt /> : <RiEarthLine />}
          </span>
          <span className="mx-1">·</span>
          <span className="font-medium max-sm:text-xs truncate w-[100px]">
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

export default FeedPost;
