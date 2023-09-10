import { Link } from "react-router-dom";
import { dataPost } from "../Components/data";
import FeedPost from "../Components/feedpost";
import Redirectuser from "../utils/redirecthome";

const Feed = () => {
  Redirectuser();
  return (
    <>
      <div className="py-20 flex flex-wrap items-center justify-center mx-5">
        <Link to={"/createfeed"} className="ml-auto normalbutton mr-12">
          + Buat Feed
        </Link>
        {dataPost
          .filter((e) => !e.private)
          .map((e, i) => (
            <FeedPost data={e} key={i} />
          ))}
      </div>
    </>
  );
};

export default Feed;
