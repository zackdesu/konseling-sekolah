import { CiMenuKebab, CiWarning } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { BiPen, BiTrash } from "react-icons/bi";
import { api } from "../api/api";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const FeedPost = ({
  data,
  user,
  token,
  func,
}: {
  data: DataPost;
  token: string;
  user: IProfile | null;
  func: (...args: never[]) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(
      data.likes.find((data) => data.userId === (user && user.id))
        ? true
        : false
    );
  }, [data.likes, user]);

  const navigate = useNavigate();

  const handleLikeClick = () => {
    if (!user) return navigate("/");
    setLoading(true);
    api
      .post(`/post/${data.id}`)
      .then(() => {
        func();
        data.likes.length = !liked
          ? data.likes.length + 1
          : data.likes.length - 1;
        setLiked(!liked);
      })
      .catch((err: IAPIError) => toast.error(err.response.data.message))
      .finally(() => setLoading(false));
  };

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const handleDelete = () => {
    api
      .delete(`/post/${data.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse<{ message: string }>) => {
        func();
        toast.success(res.data.message);
      })
      .catch((err: IAPIError) => toast.error(err.response.data.message));
  };

  const Menu = ({ className }: { className?: string }) => {
    return (
      <div className={className}>
        <button className="flex items-center text-red-600 my-1">
          <CiWarning className="mr-2" /> Report
        </button>
        {(data.Account && data.Account.username) == (user && user.username) ||
        (user && user.isAdmin) ? (
          <>
            <Link
              to={"/editfeed/" + data.id}
              className="flex items-center my-1"
            >
              <BiPen className="mr-2" /> Edit
            </Link>
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center my-1"
            >
              <BiTrash className="mr-2" /> Delete
            </button>
          </>
        ) : null}
      </div>
    );
  };

  const stringLike = data.likes.length.toLocaleString();

  const nominal =
    stringLike.length <= 3
      ? data.likes.length
      : stringLike.length <= 7
      ? "K"
      : stringLike.length <= 14
      ? "M"
      : stringLike.length <= 21
      ? "B"
      : "";

  const parseTime = new Date().getTime() - new Date(data.createdTime).getTime();

  const time =
    parseTime < 1000 * 60
      ? Math.floor(parseTime / 1000) + " detik yang lalu"
      : parseTime < 1000 * 60 * 60
      ? Math.floor(parseTime / (1000 * 60)) + " menit yang lalu"
      : parseTime > 1000 * 60 * 60 * 24
      ? Math.floor(parseTime / (1000 * 60 * 60 * 24)) + " hari yang lalu"
      : Math.floor(parseTime / (1000 * 60 * 60)) + " jam yang lalu";

  const DeleteModal = () => (
    <div className="bg-[rgba(0,0,0,.6)] fixed top-0 right-0 left-0 bottom-0 pt-20 z-10 flex items-center justify-items-center">
      <div className="w-[500px] bg-zinc-100 flex flex-col items-center p-5 rounded-xl">
        <h5>Apakah kamu yakin ingin menghapus postingan ini?</h5>
        <div>
          <button
            className="normalbutton"
            onClick={() => {
              handleDelete();
              setOpenModal(false);
            }}
          >
            Ya, saya yakin.
          </button>
          <button
            className="invertedbutton"
            onClick={() => setOpenModal(false)}
          >
            Tidak jadi.
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-zinc-100 rounded-lg w-[90%] max-sm:mx-auto m-2 p-2 flex flex-col justify-between relative border mx-auto">
        <div className="flex items-center">
          <img
            src={
              data.Account
                ? data.Account.img
                  ? data.Account.img
                  : "/unknown.jpg"
                : "/unknown.jpg"
            }
            width={30}
            className="rounded-full"
          />
          <h6 className="ml-3">
            {data.Account
              ? !data.anonym
                ? data.Account.username
                : "Anonym"
              : "Deleted Account"}
          </h6>
          <span className="mx-2">·</span>
          <p className="text-zinc-400">{time}</p>
        </div>
        <p className="text-xs sm:text-base my-4 px-10">{data.post}</p>
        <div className="flex items-center justify-between border-t py-1 mx-2 md:mx-5">
          <div className="flex items-center">
            <button disabled={loading} onClick={handleLikeClick}>
              <AiFillLike
                className={`cursor-pointer ${liked ? "text-blue-500" : ""}`}
              />
            </button>
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
      {openModal ? <DeleteModal /> : null}
    </>
  );
};

export default FeedPost;
