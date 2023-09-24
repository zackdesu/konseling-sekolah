import { Link, useParams } from "react-router-dom";

const CounselorInfo = () => {
  const { id } = useParams();
  return (
    <div className="pt-24 mx-10">
      <div className="grid grid-flow-col grid-cols-[.4fr,2fr,1fr] grid-rows-2">
        <img src="/unknown.jpg" className="w-[120px] rounded-full row-span-2" />
        <h2 className="self-end ml-5">Wongso Wijaya</h2>
        <p className="ml-6">Typescript prof</p>
        <Link to={`/chat/${id}`}>
          <button className="normalbutton row-span-2 place-self-center">
            Berkonsultasi sekarang!
          </button>
        </Link>
      </div>
      <div className="mt-10 indent-10">
        Halo, saya adalah seorang fullstack developer Halo, saya adalah seorang
        fullstack developer Halo, saya adalah seorang fullstack developer Halo,
        saya adalah seorang fullstack developer Halo, saya adalah seorang
        fullstack developer Halo, saya adalah seorang fullstack developer
      </div>
    </div>
  );
};

export default CounselorInfo;
