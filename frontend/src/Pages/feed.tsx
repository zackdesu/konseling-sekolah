import { dataPost } from "../Components/data";
import FeedPost from "../Components/feedpost";

const Feed = () => {
  return (
    <>
      <div className="py-20 flex flex-wrap items-center justify-center mx-5">
        <button className="normalbutton ml-auto mr-12">+ Buat Feed</button>
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
