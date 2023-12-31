import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connectApi } from "../api/api";
import toast from "react-hot-toast";
import { CgSpinnerTwoAlt } from "react-icons/cg";
const Talks = () => {
  const [data, setData] = useState<ICounselor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    connectApi<ICounselor[]>("/counselors")
      .then((res) => setData(res))
      .catch((err: IAPIError) => toast.error(err.response.data.message))
      .finally(() => setLoading(false));
  }, []);

  const Card = ({
    name,
    role,
    id,
    img,
  }: {
    name: string;
    role: string | null;
    id: string | null;
    img: string | null;
  }) => (
    <Link
      to={`/talks/${id}/info`}
      className="rounded-xl bg-zinc-100 border border-zinc-200 p-5 grid grid-rows-2 md:grid-cols-[.6fr,_2fr] my-2"
    >
      <img
        src={img ?? "/unknown.jpg"}
        className="rounded-full w-[40px] md:w-[60px] row-span-2 self-center max-md:mb-3"
      />
      <h6 className="self-end text-sm md:text-base truncate w-[250px]">
        {name}
      </h6>
      <p className="text-xs md:text-sm truncate w-[250px]">{role ?? "..."}</p>
    </Link>
  );

  return (
    <div className="py-20 flex flex-col items-center">
      <h2 className="my-5">Pilih konselormu</h2>
      {loading ? (
        <CgSpinnerTwoAlt className="mx-auto animate-spin my-1" size={50} />
      ) : (
        data.map((e, i) => (
          <Card name={e.realname} role={e.role} img={e.img} key={i} id={e.id} />
        ))
      )}
    </div>
  );
};

export default Talks;
