import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connectApi } from "../api/api";
import toast from "react-hot-toast";

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
    <div className="pt-24 mx-10">
      <div className="grid grid-flow-col grid-cols-[.4fr,2fr,1fr] grid-rows-2">
        <img src="/unknown.jpg" className="w-[120px] rounded-full row-span-2" />
        <h2 className="self-end ml-5">{data.realname}</h2>
        <p className="ml-6">{data.role ?? "User belum membuat role"}</p>
        <Link to={`/chat/${id}`} className="row-span-2 place-self-center">
          <button className="normalbutton">Berkonsultasi sekarang!</button>
        </Link>
      </div>
      <div className="mt-10 indent-10">
        {data.description ?? "User belum memberikan deskripsi tentang dirinya"}
      </div>
    </div>
  );
};

export default CounselorInfo;
