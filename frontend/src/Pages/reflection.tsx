import { ReactNode, useEffect } from "react";

interface ISection {
  title: string;
  img?: string;
  desc?: string;
  children?: ReactNode;
  href?: string;
}

const Card = ({ title, img, href }: ISection) => (
  <div className="flex flex-col p-2 m-2 border items-center min-w-[260px] max-w-[260px]">
    <img
      src={`/channel/${img}`}
      className="w-60 rounded-full border object-cover"
      alt={title}
      loading="lazy"
    />
    <h3 className="my-4">{title}</h3>
    <a href={href} target="_blank" rel="noreferrer">
      <button className="normalbutton">Kunjungi YouTube</button>
    </a>
  </div>
);

const NewSection = ({ title, desc, children }: ISection) => (
  <>
    {" "}
    <div className="mx-10 my-7">
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
    <div className="flex mx-5 overflow-x-auto">{children}</div>
  </>
);

const Reflection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="py-20">
      <NewSection
        title="Video Improvisasi Diri"
        desc="Jadilah pribadi yang lebih baik."
      >
        <Card
          img="/satupersen.jpg"
          title="Satu Persen"
          href="https://www.youtube.com/@SatuPersenIndonesianLifeschool"
        />
        <Card
          img="/timothyronald.jpg"
          title="Timothy Ronald"
          href="https://youtube.com/@timothyronald"
        />
        <Card
          img="/zahidibrahim.jpg"
          title="Zahid Ibrahim"
          href="https://youtube.com/@zahidibr"
        />
      </NewSection>
      <NewSection
        title="Ilmu Pengetahuan"
        desc="Kembangkan ilmumu terus-menerus."
      >
        <Card
          img="/kokbisa.jpg"
          title="Kok Bisa?"
          href="https://www.youtube.com/@KokBisa"
        />
        <Card
          img="/neuron.jpg"
          title="Neuron"
          href="https://www.youtube.com/@Neuronmedia"
        />
      </NewSection>
      <NewSection
        title="Podcast"
        desc="Dengarkan podcast yang berisi pengalaman orang sukses."
      >
        <Card
          img="/deddycorbuzier.jpg"
          title="Deddy Corbuzier"
          href="https://youtube.com/@corbuzier"
        />
      </NewSection>
    </section>
  );
};

export default Reflection;
