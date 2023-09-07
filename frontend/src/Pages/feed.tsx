import { dataPost } from "../Components/data";
import FeedPost from "../Components/feedpost";

const Feed = () => {
  return (
    <div className="py-20 flex flex-wrap justify-center items-center mx-5">
      {dataPost
        .filter((e) => !e.private)
        .map((e, i) => (
          <FeedPost data={e} key={i} />
        ))}
    </div>
  );
};

export default Feed;
