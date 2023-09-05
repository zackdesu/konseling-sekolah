import { BiLockAlt } from "react-icons/bi";
import { RiEarthLine } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";

type DataPost = {
  username: string;
  name: string;
  private: boolean;
  anonym: boolean;
  likes: number;
  post: string;
};

const Profile = () => {
  const user = {
    username: "zackdesu",
    name: "Wongso Wijaya",
    gender: "Laki-Laki",
    mbti: "INFJ",
  };

  const dataPost: Array<DataPost> = [
    // {
    //   username: "zackdesu",
    //   name: "Wongso Wijaya",
    //   private: true,
    //   anonym: true,
    //   likes: 123,
    //   post: "Jika aku adalah sebuah burung, mungkin aku akan terbebas dari segala pengekangan yang saya alami.",
    // },
    // {
    //   username: "zackdesu",
    //   name: "Wongso Wijaya",
    //   private: true,
    //   anonym: true,
    //   likes: 123,
    //   post: "Jika aku adalah sebuah burung, mungkin aku akan terbebas dari segala pengekangan yang saya alami.",
    // },
    // {
    //   username: "zackdesu",
    //   name: "Wongso Wijaya",
    //   private: true,
    //   anonym: true,
    //   likes: 123,
    //   post: "Jika aku adalah sebuah burung, mungkin aku akan terbebas dari segala pengekangan yang saya alami.",
    // },
    // {
    //   username: "zackdesu",
    //   name: "Wongso Wijaya",
    //   private: true,
    //   anonym: true,
    //   likes: 123,
    //   post: "Jika aku adalah sebuah burung, mungkin aku akan terbebas dari segala pengekangan yang saya alami.",
    // },
    // {
    //   username: "zackdesu",
    //   name: "Wongso Wijaya",
    //   private: true,
    //   anonym: true,
    //   likes: 123,
    //   post: "Jika aku adalah sebuah burung, mungkin aku akan terbebas dari segala pengekangan yang saya alami.",
    // },
    // {
    //   username: "zackdesu",
    //   name: "Wongso Wijaya",
    //   private: true,
    //   anonym: true,
    //   likes: 123,
    //   post: "Jika aku adalah sebuah burung, mungkin aku akan terbebas dari segala pengekangan yang saya alami.",
    // },
    // {
    //   username: "zackdesu",
    //   name: "Wongso Wijaya",
    //   private: false,
    //   anonym: false,
    //   likes: 123,
    //   post: "Jika selama ini dunia adalah kebohongan, lantas mengapa aku harus berusaha untuk kebohongan ini?",
    // },
    {
      username: "jofanctan",
      name: "Jofan Cristoferry Tan",
      private: false,
      anonym: false,
      likes: 123,
      post: "Banyaknya tuntutan dan masalah-masalah belum terselesaikan.",
    },
    // {
    //   username: "kielll97",
    //   name: "Heskiel Jeremia Natanael",
    //   private: false,
    //   anonym: false,
    //   likes: 123,
    //   post: "Demam panggung...",
    // },
  ];

  const filteredPost = dataPost.filter((u) => u.username === user.username);

  const PostCard = ({ data }: { data: DataPost }) => (
    <div className="bg-zinc-100 rounded-lg w-[90%] h-[45%] max-sm:h-[100px] max-sm:mx-auto sm:w-[45%] m-2 p-2 flex flex-col justify-between">
      <p className="text-xs sm:text-base">{data.post}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center truncate">
          <span className="font-medium">
            {data.private ? <BiLockAlt /> : <RiEarthLine />}
          </span>
          <span className="mx-1">·</span>
          <span className="font-medium max-sm:text-xs">
            {data.anonym ? "Anonym" : data.name}
          </span>
        </div>
        <CiMenuKebab />
      </div>
    </div>
  );

  return (
    <div className="sm:grid max-lg:grid-rows-3 lg:grid-cols-3 h-full mx-10 pt-20 pb-8 gap-4">
      <div className="max-sm:flex max-sm:flex-col max-lg:grid grid-cols-6 grid-rows-2 grid-flow-col lg:flex lg:flex-col mx-5 mt-5">
        <img
          src="/unknown.jpg"
          className="max-w-[240px] max-sm:w-2/6 max-lg:w-full lg:w-9/12 max-lg:row-span-2 place-self-center rounded-full"
        />
        <h1 className="max-sm:text-center max-sm:mt-5 lg:mt-3 lg:mb-1 max-lg:col-span-3 max-sm:self-center max-lg:self-end sm:ml-5">
          {user.name}
        </h1>
        <p className="text-zinc-400 mt-2 max-lg:col-span-2 max-sm:self-center lg:mb-1 sm:ml-6">
          {user.gender} · {user.mbti}
        </p>
        <p className="max-lg:hidden sm:ml-6">Belum ada bio.</p>
        <button className="invertedbutton w-3/4 max-lg:col-start-5 max-lg:col-span-2 max-lg:row-span-2 place-self-center">
          Edit Profile
        </button>
      </div>

      <div className="w-full sm:w-[90%] max-lg:row-span-3 lg:col-span-2 mx-auto lg:mx-5 py-5 flex flex-wrap overflow-y-auto">
        {filteredPost.length > 0 ? (
          filteredPost.map((e, i) => <PostCard data={e} key={i} />)
        ) : (
          <div className="flex items-center justify-center w-full h-full text-center">
            Sepertinya kamu belum pernah <br /> membuat postingan sebelumnya
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
