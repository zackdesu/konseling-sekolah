import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-cyan-600 border-2 grid grid-rows-2 grid-cols-5 text-white px-8 max-md:grid-rows-3 max-md:grid-flow-col pt-5 pb-14">
      <div className="col-span-3 self-center max-md:col-span-full max-md:text-center">
        <h3>{import.meta.env.VITE_PRODUCT_NAME}</h3>
        <p className="mt-8">
          Aplikasi ini adalah aplikasi yang kami rancang untuk para remaja yang
          sedang menghadapi banyak masalah baik di rumah maupun di lingkungan
          sekolah agar bisa menjadi pribadi yang lebih baik.
        </p>
      </div>
      <div className="col-span-2 flex flex-col justify-center items-center max-md:col-span-full">
        <h6 className="mb-5">Layanan</h6>
        <p>Kontak Kami</p>
        <p>Ajukan Pengaduan</p>
        <p>Dukungan</p>
        <p>Tentang Kami</p>
      </div>
      <div className="col-span-full flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <BiLogoFacebook size={40} className="mx-2 rounded-full border p-1" />
          <BiLogoInstagram size={40} className="mx-2 rounded-full border p-1" />
          <BiLogoTwitter size={40} className="mx-2 rounded-full border p-1" />
        </div>
        <p className="mt-3">&copy; {year} Copyright. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
