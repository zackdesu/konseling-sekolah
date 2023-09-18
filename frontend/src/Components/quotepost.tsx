import { CiMenuKebab } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { useState } from "react";

const QuotePost = ({ data }: { data: DataQuotes }) => {
  const [liked] = useState<boolean>();
  const [likes] = useState(data.likes);

  // const handleLikeClick = () => {
  //   if (liked) {
  //     setLiked(false);
  //     setLikes(likes - 1);
  //     user.likedQuotes = user.likedQuotes.filter((post) => post.id !== data.id);
  //   } else {
  //     setLiked(true);
  //     setLikes(likes + 1);
  //     console.log(user.likedQuotes);
  //     user.likedQuotes.push(data);
  //   }
  //   console.log(user.likedQuotes);
  // };

  return (
    <div className="bg-zinc-100 rounded-lg w-[90%] max-sm:mx-auto m-2 p-2 flex flex-col justify-between">
      <p className="text-xs sm:text-base my-3">{data.quote}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-medium max-sm:text-xs truncate w-[200px]">
            {data.creator}
          </span>
          {/* <span className="ml-10" onClick={handleLikeClick}>
            <AiFillLike className={liked ? "text-blue-500" : ""} />
          </span> */}
          <span className="ml-10">
            <AiFillLike className={liked ? "text-blue-500" : ""} />
          </span>
          <p className="ml-4 text-sm">{likes}</p>
        </div>
        <CiMenuKebab />
      </div>
    </div>
  );
};

export default QuotePost;
