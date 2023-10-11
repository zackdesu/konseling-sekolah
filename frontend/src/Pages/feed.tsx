import { Link } from "react-router-dom";
import FeedPost from "../Components/feedpost";
import { useCallback, useEffect, useState } from "react";
import { connectApi } from "../api/api";
import toast from "react-hot-toast";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import useAccContext from "../context/useAllContext";
import Redirectuser from "../utils/redirecthome";

const Feed = () => {
  const [dataPost, setDataPost] = useState<DataPost[]>([]);
  const [isExist, setIsExist] = useState(true);
  const { user } = useAccContext();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const token = Redirectuser();

  const fetchData = useCallback(() => {
    isExist &&
      void (() => {
        connectApi<DataPost[]>("/post", "GET", "", { params: { page } })
          .then((res) => {
            if (res.length === 0) return setIsExist(false);
            setDataPost((prev) => {
              const newPosts = res.filter(
                (newPost) =>
                  !prev.some((prevPost) => prevPost.id === newPost.id)
              );
              return [...prev, ...newPosts];
            });
          })
          .catch((err: IAPIError) => toast.error(err.response.data.message))
          .finally(() => setLoading(false));
      })();
  }, [isExist, page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => {
        return prev + 1;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="py-20 flex flex-col flex-wrap items-center justify-center mx-5">
        <Link to={"/createfeed"} className="ml-auto normalbutton mr-12">
          + Buat Feed
        </Link>

        {!loading ? (
          dataPost ? (
            dataPost
              .filter((e) => !e.private)
              .map((e, i) => (
                <FeedPost
                  data={e}
                  key={i}
                  user={user}
                  token={token}
                  func={fetchData}
                />
              ))
          ) : (
            "Postingan tidak ditemukan..."
          )
        ) : (
          <CgSpinnerTwoAlt className="mx-auto animate-spin my-1" size={50} />
        )}
      </div>
    </>
  );
};

export default Feed;
