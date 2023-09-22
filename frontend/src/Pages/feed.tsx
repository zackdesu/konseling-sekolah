import { Link } from "react-router-dom";
import FeedPost from "../Components/feedpost";
import { useCallback, useEffect, useState } from "react";
import { connectApi, infoAcc } from "../api/api";
import Redirectuser from "../utils/redirecthome";

const Feed = () => {
  const [dataPost, setDataPost] = useState<DataPost[]>([]);
  const [isExist, setIsExist] = useState(true);
  const [user, setUser] = useState<IProfile>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const token = Redirectuser();

  useEffect(() => {
    if (!token) return;

    infoAcc<IProfile>(token)
      .then((res) => setUser(res))
      .catch((err: IAPIError) => console.error(err.response.data.message));

    setLoading(false);
  }, [token]);

  const fetchData = useCallback(() => {
    isExist &&
      void (() => {
        connectApi<DataPost[]>("/post", "GET", "", { params: { page } })
          .then((res) => {
            if (res.length === 0) return setIsExist(false);
            setDataPost((prev) => [...prev, ...res]);
          })
          .catch((err: IAPIError) => console.log(err.response.data.message))
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
    // const intervalId = setInterval(() => {
    //   fetchData();
    // }, 5000);

    fetchData();

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [fetchData]);

  return (
    <>
      <div className="py-20 flex flex-col flex-wrap items-center justify-center mx-5">
        <Link to={"/createfeed"} className="ml-auto normalbutton mr-12">
          + Buat Feed
        </Link>

        {!loading
          ? dataPost
            ? dataPost
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
            : "Postingan tidak ditemukan..."
          : "Loading..."}
      </div>
    </>
  );
};

export default Feed;
