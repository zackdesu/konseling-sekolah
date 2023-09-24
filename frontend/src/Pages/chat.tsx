import { Link, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { io } from "socket.io-client";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { infoAcc } from "../api/api";
import Redirectuser from "../utils/redirecthome";

const Chat = () => {
  const { id } = useParams();
  const socket = io("http://localhost:3000");
  const inputRef = useRef<HTMLInputElement>(null);

  const token = Redirectuser();

  const [user, setUser] = useState<IProfile>();
  const [message, setMessage] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!token) return;

    infoAcc<IProfile>(token)
      .then((res) => setUser(res))
      .catch((err: IAPIError) => toast.error(err.response.data.message));
  }, [token]);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.emit("join_room", id);
  }, []);

  useEffect(() => {
    const reply = (m: IMessage) => {
      setMessage((prev) => [...prev, m]);
    };

    socket.on("reply", reply);

    return () => {
      socket.off("reply", reply);
    };
  }, []);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current || !user) return;

    const data: IMessage = {
      room: id,
      message: inputRef.current.value,
      from: user.username,
    };

    socket.emit("chat", data);
    inputRef.current.value = "";
  };

  const Reply = ({ message }: { message: string }) => (
    <div className="bg-zinc-200 w-fit py-2 px-5 rounded mx-5 my-3 max-w-xs">
      <p className="break-words">{message}</p>
    </div>
  );
  const Send = ({ message }: { message: string }) => (
    <div className="bg-cyan-300 w-fit py-2 px-5 rounded mx-5 my-3 self-end max-w-xs">
      <p className="break-words w-full">{message}</p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between py-5 px-8 fixed z-20 left-0 right-0 top-0 bg-cyan-500 text-white">
        <Link to={"/talks"}>
          <IoIosArrowRoundBack size={30} />
        </Link>
        <div className="flex items-center">
          <img src="/unknown.jpg" className="w-[30px] rounded-full mr-5" />
          <p>Wongso Wijaya · Typescript Prof</p>
        </div>
        <BsThreeDotsVertical size={20} />
      </div>
      <hr />
      <div className="pt-20 flex flex-col overflow-y-auto h-full pb-20">
        {message.map((m, i) =>
          m.from === (user && user.username) ? (
            <Send key={i} message={m.message} />
          ) : (
            <Reply key={i} message={m.message} />
          )
        )}
      </div>
      <form
        onSubmit={sendMessage}
        className="flex items-center justify-between py-5 px-8 fixed z-20 left-0 right-0 bottom-0 bg-white"
      >
        <input
          placeholder="Message"
          className="w-[90%] focus:outline-cyan-300 p-2 bg-zinc-200 rounded-xl"
          ref={inputRef}
        />
        <button>
          <AiOutlineSend className="bg-cyan-300 rounded-xl p-2" size={40} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
