import { Link } from "react-router-dom";
import FeedPost from "../Components/feedpost";
import { useEffect, useState } from "react";
import { connectApi, infoAcc } from "../api/api";
import Redirectuser from "../utils/redirecthome";

const Feed = () => {
  const [dataPost, setDataPost] = useState<DataPost[]>();
  const [user, setUser] = useState<IProfile>();
  const [loading, setLoading] = useState(true);

  const token = Redirectuser();

  useEffect(() => {
    if (!token) return;

    infoAcc<IProfile>(token)
      .then((res) => setUser(res))
      .catch((err: IAPIError) => console.error(err.response.data.message));

    setLoading(false);
  }, [token]);

  const fetchData = () =>
    void (() => {
      connectApi<DataPost[]>("/post")
        .then((res) => {
          setDataPost(res);
        })
        .catch((err: IAPIError) => console.log(err.response.data.message))
        .finally(() => setLoading(false));
    })();

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    fetchData();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
                .reverse()
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
