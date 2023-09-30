import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connectApi } from "../api/api";
import toast from "react-hot-toast";
import { AiOutlineWhatsApp } from "react-icons/ai";

const CounselorInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState<ICounselor>();
  useEffect(() => {
    connectApi<ICounselor>("/counselor", "GET", "", { params: { id } })
      .then((res) => setData(res))
      .catch((err: IAPIError) => toast.error(err.response.data.message));
  }, [id]);
  if (!data) return;

  return (
    <div className="pt-24 mx-10 md:mx-20">
      <div className="grid grid-flow-col grid-cols-[.4fr,2fr,1fr] grid-rows-2 md:mx-5">
        <img
          src="/unknown.jpg"
          className="w-[120px] rounded-full row-span-2 self-center"
        />
        <h2 className="self-end sm:ml-5 ml-3 max-sm:text-sm">
          {data.realname}
        </h2>
        <p className="sm:ml-6 ml-3 max-sm:text-xs">
          {data.role ?? "User belum membuat role"}
        </p>
        <a
          href={`http://wa.me/${data.phonenumber}?text=Selamat+siang,+saya+ingin+konsultasi+mengenai+permasalahan+saya.`}
          className="row-span-2 place-self-center"
          target="_blank"
          rel="noreferrer"
        >
          <button
            className="normalbutton bg-green-500 flex items-center"
            disabled={!data.phonenumber}
          >
            <AiOutlineWhatsApp className="md:mr-3" />
            <p className="max-md:hidden">Berkonsultasi sekarang!</p>
          </button>
        </a>
      </div>
      <div className="mt-10 indent-10">
        {data.description ?? "User belum memberikan deskripsi tentang dirinya"}
      </div>
    </div>
  );
};

export default CounselorInfo;
