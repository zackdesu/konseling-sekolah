import { BiLockAlt } from "react-icons/bi";
import { RiEarthLine } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";

type DataPost = {
  name: string;
  private: boolean;
  anonym: boolean;
  likes: number;
  post: string;
};

const Profile = () => {
  const user = {
    name: "Wongso Wijaya",
    gender: "Laki-Laki",
    mbti: "INFJ",
  };

  const dataPost: Array<DataPost> = [
    {
      name: "Wongso Wijaya",
      private: true,
      anonym: true,
      likes: 123,
      post: "Jika aku adalah sebuah burung, mungkin aku akan terbebas dari segala pengekangan yang saya alami.",
    },
    {
      name: "Wongso Wijaya",
      private: true,
      anonym: true,
      likes: 123,
      post: "Jika aku adalah sebuah burung, mungkin aku akan terbebas dari segala pengekangan yang saya alami.",
    },
    {
      name: "Wongso Wijaya",
      private: true,
      anonym: true,
      likes: 123,
      post: "Jika aku adalah sebuah burung, mungkin aku akan terbebas dari segala pengekangan yang saya alami.",
    },
    {
      name: "Wongso Wijaya",
      private: true,
      anonym: true,
      likes: 123,
      post: "Jika aku adalah sebuah burung, mungkin aku akan terbebas dari segala pengekangan yang saya alami.",
    },
    {
      name: "Wongso Wijaya",
      private: true,
      anonym: true,
      likes: 123,
      post: "Jika aku adalah sebuah burung, mungkin aku akan terbebas dari segala pengekangan yang saya alami.",
    },
    {
      name: "Wongso Wijaya",
      private: true,
      anonym: true,
      likes: 123,
      post: "Jika aku adalah sebuah burung, mungkin aku akan terbebas dari segala pengekangan yang saya alami.",
    },
    {
      name: "Wongso Wijaya",
      private: false,
      anonym: false,
      likes: 123,
      post: "Jika selama ini dunia adalah kebohongan, lantas mengapa aku harus berusaha untuk kebohongan ini?",
    },
    {
      name: "Jofan Cristoferry Tan",
      private: false,
      anonym: false,
      likes: 123,
      post: "Banyaknya tuntutan dan masalah-masalah belum terselesaikan.",
    },
    {
      name: "Heskiel Jeremia Natanael",
      private: false,
      anonym: false,
      likes: 123,
      post: "Demam panggung...",
    },
  ];

  return (
    <div className="grid grid-flow-col grid-cols-8 grid-rows-6 h-full mx-10 pt-20 pb-8 gap-4">
      <img
        src="/unknown.jpg"
        className="w-9/12 place-self-center col-span-2 row-span-3 rounded-full"
      />
      <div className="row-span-3 col-span-3 flex flex-col mx-5 -mt-4">
        <h1 className="-mb-2 pb-3">{user.name}</h1>
        <p className="-mb-1 text-zinc-400 py-3">
          {user.gender} · {user.mbti}
        </p>
        <p>Belum ada bio.</p>
        <button className="invertedbutton w-3/4">Edit Profile</button>
      </div>

      <div className="w-[90%] col-start-4 row-span-full col-span-5 mx-5 py-5 flex flex-wrap overflow-y-auto">
        {dataPost
          .filter((u) => u.name === user.name)
          .map((e, i) => (
            <div
              className="bg-zinc-100 rounded-lg w-[45%] h-2/6 m-2 p-2 flex flex-col justify-between"
              key={i}
            >
              <p>{e.post}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium">
                    {e.private ? <BiLockAlt /> : <RiEarthLine />}
                  </span>
                  <span className="mx-1">·</span>
                  <span className="font-medium">
                    {e.anonym ? "Anonym" : e.name}
                  </span>
                </div>
                <CiMenuKebab />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
