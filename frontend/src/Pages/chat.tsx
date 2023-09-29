// import { Link, useParams } from "react-router-dom";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { AiOutlineSend } from "react-icons/ai";
// import { FormEvent, useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { connectApi } from "../api/api";
// import { socket } from "../utils/socket";
// import useAccContext from "../context/useAllContext";

// const Chat = () => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const { id, socketId } = useParams();

//   const chatBox = useRef<HTMLDivElement>(null);
//   const { user } = useAccContext();
//   const [message, setMessage] = useState<IMessage[]>([]);
//   const [data, setData] = useState<ICounselor>();
//   const [room, setRoom] = useState<IMessageID>();
//   useEffect(() => {
//     connectApi<ICounselor>("/counselor", "GET", "", { params: { id } })
//       .then((res) => setData(res))
//       .catch((err: IAPIError) => toast.error(err.response.data.message));
//   }, [id]);

//   useEffect(() => {
//     const connect = () => {
//       socket.emit("createChat", {
//         consultantId: id,
//         userId: user && user.id,
//       });

//       socket.on("createChatReturn", (v: IMessageID) => {
//         console.log(v.socketId);
//         localStorage.setItem("socketId", v.socketId ?? "");
//       });

//       socket.emit("joinChat", room?.socketId);

//       return () => {
//         socket.off("createChatReturn", (v: IMessageID) => {
//           console.log(v.socketId);
//           localStorage.setItem("socketId", v.socketId ?? "");
//         });
//       };
//     };

//     socket.on("connect", connect);

//     return () => {
//       socket.off("connect", connect);
//     };
//   }, [user, id, room?.socketId]);

//   useEffect(() => {
//     const reply = (m: IMessage) => {
//       setMessage((prev) => [...prev, m]);
//     };

//     socket.on("reply", reply);

//     const chatbox = chatBox.current;

//     if (
//       chatbox &&
//       chatbox.scrollTop + chatbox.clientHeight === chatbox.scrollHeight
//     ) {
//       chatbox.scrollTop = chatbox.scrollHeight;
//     }

//     return () => {
//       socket.off("reply", reply);
//     };
//   }, []);

//   const sendMessage = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!inputRef.current || !user) return;

//     const data: IMessage = {
//       consultantId: id,
//       userId: user.id,
//       message: inputRef.current.value,
//       from: user.username,
//     };

//     socket.emit("sendMessage", data);
//     inputRef.current.value = "";
//   };

//   const Reply = ({ message }: { message?: string }) => (
//     <div className="bg-zinc-200 w-fit py-2 px-5 rounded mx-5 my-3 max-w-xs">
//       <p className="break-words">{message}</p>
//     </div>
//   );
//   const Send = ({ message }: { message?: string }) => (
//     <div className="bg-cyan-300 w-fit py-2 px-5 rounded mx-5 my-3 self-end max-w-xs">
//       <p className="break-words w-full">{message}</p>
//     </div>
//   );

//   if (!data) return;

//   return (
//     <div>
//       <div className="flex items-center justify-between py-5 px-8 fixed z-20 left-0 right-0 top-0 bg-cyan-500 text-white">
//         <Link to={"/talks"}>
//           <IoIosArrowRoundBack size={30} />
//         </Link>
//         <div className="flex items-center">
//           <img src="/unknown.jpg" className="w-[30px] rounded-full mr-5" />
//           <p>
//             {data.realname} · {data.role ?? ""}
//           </p>
//         </div>
//         <BsThreeDotsVertical size={20} />
//       </div>
//       <hr />
//       <div
//         className="pt-20 flex flex-col overflow-y-auto h-full pb-20"
//         ref={chatBox}
//       >
//         {message.map((m, i) =>
//           m.from === (user && user.username) ? (
//             <Send key={i} message={m.message} />
//           ) : (
//             <Reply key={i} message={m.message} />
//           )
//         )}
//       </div>
//       <form
//         onSubmit={sendMessage}
//         className="flex items-center justify-between py-5 px-8 fixed z-20 left-0 right-0 bottom-0 bg-white"
//       >
//         <input
//           placeholder={socketId}
//           className="w-[90%] focus:outline-cyan-300 p-2 bg-zinc-200 rounded-xl"
//           ref={inputRef}
//         />
//         <button>
//           <AiOutlineSend className="bg-cyan-300 rounded-xl p-2" size={40} />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
