import { useEffect, useState } from "react";
import Redirectuser from "../utils/redirecthome";
import toast from "react-hot-toast";
import { infoAcc } from "../api/api";
import { Link } from "react-router-dom";
import { socket } from "../utils/socket";

const ListChat = () => {
  const [list, setList] = useState<IMessageID[]>([]);
  const [user, setUser] = useState<IProfile>();
  const token = Redirectuser();

  useEffect(() => {
    if (!token) return;

    infoAcc<IProfile>(token)
      .then((res) => setUser(res))
      .catch((err: IAPIError) => toast.error(err.response.data.message));
  }, [token]);

  useEffect(() => {
    if (!user) return;

    const postChat = (m: IMessageID[]) => {
      console.log(m);
      setList(m);
    };

    socket.emit("getMessage", user.id);
    socket.on("postMessage", postChat);

    return () => {
      socket.off("postChat", postChat);
    };
  }, [user]);

  return (
    <div className="py-20">
      {list.map((e, i) => (
        <Link to={`/chat/${e.userId}/${e.socketId}`} key={i}>
          {e.socketId}
        </Link>
      ))}
    </div>
  );
};

export default ListChat;
