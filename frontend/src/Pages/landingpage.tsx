const LandingPage = () => {
  const Card = ({
    img = "sharing",
    title,
    desc,
    button,
  }: {
    img?: string;
    title: string;
    desc: string;
    button: string;
  }) => (
    <div className="w-[300px] h-[410px] bg-zinc-100 border-2 m-8 flex flex-col justify-between shadow-md">
      <div>
        <img src={`/${img}.svg`} alt={img} className="w-full" />
        <h5 className="mx-3">{title}</h5>
        <p className="mx-3 text-zinc-400 text-sm">{desc}</p>
      </div>
      <div className="mb-2 ml-2">
        <button className="normalbutton">{button}</button>
      </div>
    </div>
  );

  return (
    <>
      <div className="pt-20 flex flex-col items-center justify-center h-full overflow-y-auto">
        <img
          src="/therapy.svg"
          alt="therapy"
          className="w-[300px] md:w-[360px]"
        />
        <h1>{import.meta.env.VITE_PRODUCT_NAME}</h1>
        <p className="text-zinc-600 text-center w-[90%]">
          Tempat kamu bercerita tentang masalah yang kamu hadapi.
        </p>
        <a href="#menu">
          <button className="normalbutton mt-5">Mulai Konseling</button>
        </a>
        <p className="text-center italic text-zinc-400 mt-5 w-[90%]">
          &quot;Bersyukur dengan apa yang kamu punya&quot; <br /> - Unknown
        </p>
      </div>
      <div
        id="menu"
        className="w-full min-[1092px]:h-full flex justify-center items-center flex-wrap"
      >
        <Card
          img="sharing"
          title="Sharing"
          desc="Curhat masalahmu disini"
          button="Curhat disini"
        />
        <Card
          img="tests"
          title="Tes Kepribadian"
          desc="Cek Kepribadianmu disini"
          button="Lihat tes"
        />
        <Card
          img="reflection"
          title="Refleksi Diri"
          desc="Refleksi dirimu disini"
          button="Refleksi disini"
        />
      </div>
      <div className="h-[70%] bg-cyan-600 border-2"></div>
    </>
  );
};

export default LandingPage;
