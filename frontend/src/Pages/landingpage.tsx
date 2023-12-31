import { Link } from "react-router-dom";
import Footer from "../Components/footer";
import MenuParent from "../Components/menuparent";
import { QuotesData } from "../Components/data";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const Card = ({
    href = "/",
    img = "sharing",
    title,
    desc,
    button,
  }: {
    href?: string;
    img?: string;
    title: string;
    desc: string;
    button: string;
  }) => (
    <div className="w-[240px] h-[328px] lg:w-[300px] lg:h-[410px] bg-zinc-100 border-2 m-8 flex flex-col justify-between shadow-md">
      <div>
        <img
          src={`/${img}.svg`}
          alt={img}
          className="w-full max-lg:w-[236px] h-[155px] lg:h-[296px]"
          loading="lazy"
        />
        <h5 className="mx-3">{title}</h5>
        <p className="mx-3 text-zinc-400 text-sm">{desc}</p>
      </div>
      <div className="mb-2 ml-2">
        {href.includes("http") ? (
          <a href={href} target="_blank" rel="noreferrer">
            <button className="normalbutton">
              <p>{button}</p>
            </button>
          </a>
        ) : (
          <Link to={href}>
            <button className="normalbutton">
              <p>{button}</p>
            </button>
          </Link>
        )}
      </div>
    </div>
  );

  const [Quote, setQuote] = useState<DataQuotes>();

  useEffect(() => {
    const mathRandom = Math.round(Math.random() * QuotesData.length);
    setQuote(QuotesData[mathRandom]);
  }, [Quote, setQuote]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="pt-20 flex flex-col items-center justify-center h-full overflow-y-auto">
        <img
          src="/therapy.svg"
          alt="therapy"
          className="w-[300px] md:w-[360px]"
          loading="lazy"
        />
        <h1>{import.meta.env.VITE_PRODUCT_NAME}</h1>
        <p className="text-zinc-600 text-center w-[90%]">
          Tempat kamu bercerita tentang masalah yang kamu hadapi.
        </p>
        <a href="#menu">
          <button className="normalbutton mt-5">Mulai Konseling</button>
        </a>
        {Quote && (
          <p className="text-center italic text-zinc-400 mt-5 w-[90%]">
            &quot;{Quote.quote}&quot; <br /> - {Quote.creator}
          </p>
        )}
      </div>
      <MenuParent
        title="Are you okay?"
        desc="Tempat untuk meluapkan semua energi negatifmu."
        id="menu"
      >
        <Card
          img="sharing"
          title="Sharing"
          desc="Curhat masalahmu disini"
          button="Curhat disini"
          href="/talks"
        />
        <Card
          img="tests"
          title="Tes Kepribadian"
          desc="Cek Kepribadianmu disini"
          button="Lihat tes"
          href="https://satupersen.net/quizzes"
        />
        <Card
          img="reflection"
          title="Refleksi Diri"
          desc="Refleksi dirimu disini"
          button="Refleksi disini"
          href="/reflection"
        />
      </MenuParent>
      {/* <MenuParent
        title="How's your day?"
        desc="Mempelajari hal-hal baru dan mengisi energi positif."
      >
        <Card
          href="quotes"
          img="quotes"
          title="Quotes"
          desc="Kumpulan quotes menarik dari kami"
          button="Baca Quotes"
        />
        <Card
          img="article"
          title="Artikel"
          desc="Kumpulan artikel menarik"
          button="Baca artikel"
        />
        <Card
          img="tips"
          title="Tips-tips"
          desc="Tips dalam menghadapi hari-harimu"
          button="Lihat tips"
        />
      </MenuParent> */}
      <Footer />
    </>
  );
};

export default LandingPage;
