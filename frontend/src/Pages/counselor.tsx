import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { infoAcc } from "../api/api";
import Redirectuser from "../utils/redirecthome";
import { useNavigate } from "react-router-dom";
import { connectApi } from "../api/api";

const Counselor = () => {
  const token = Redirectuser();
  const [user, setUser] = useState<IProfile>();
  const [data, setData] = useState<IAdmin[]>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    infoAcc<IProfile>(token)
      .then((res) => {
        if (!res.isAdmin) navigate("/");
        setUser(res);
      })
      .catch((err: IAPIError) => toast.error(err.response.data.message));
  }, [navigate, token]);

  useEffect(() => {
    connectApi<IAdmin[]>("/admin")
      .then((res) => setData(res))
      .catch((err: IAPIError) => toast.error(err.response.data.message));
  }, []);

  const Card = ({
    id,
    img,
    realname,
    username,
    counselor,
  }: {
    id: string;
    img: string | null;
    realname: string;
    username: string;
    counselor: boolean;
  }) => {
    const [isCounselor, setIsCounselor] = useState(counselor);
    const [text, setText] = useState(
      isCounselor ? "Jadikan Member" : "Jadikan Konselor"
    );

    const handleSubmit = (id: string) => {
      connectApi<IAPISuccess>("/admin", "POST", { id })
        .then((res) => {
          toast.success(res.message);
          setIsCounselor(!isCounselor);
          setText(!isCounselor ? "Jadikan Member" : "Jadikan Konselor");
        })
        .catch((err: IAPIError) => toast.error(err.response.data.message))
        .finally(() => console.log(isCounselor));
    };

    return (
      <div className="w-[45%] bg-zinc-100 m-3 p-3 rounded-lg grid grid-flow-col grid-cols-[1fr,2fr,2fr] grid-rows-2">
        <img
          src={img ?? "/unknown.jpg"}
          className="row-span-2 w-[60px] rounded-full self-center"
        />
        <h5 className="self-end">{realname}</h5>
        <h6 className="text-sm">@{username}</h6>
        <button
          className="invertedbutton w-2/3 row-span-2 place-self-center text-xs"
          onClick={() => handleSubmit(id)}
        >
          {text}
        </button>
      </div>
    );
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="py-20 flex flex-wrap justify-center">
      {data &&
        data.map((u, i) => (
          <Card
            id={u.id}
            img={u.img}
            realname={u.realname}
            username={u.username}
            key={i}
            counselor={u.isCounselor}
          />
        ))}
    </div>
  );
};

export default Counselor;
