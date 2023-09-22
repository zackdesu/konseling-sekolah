import { Link } from "react-router-dom";
import Redirectuser from "../utils/redirecthome";

const Options = () => {
  Redirectuser();

  const SettingsMenu = ({
    title,
    desc,
    href,
  }: {
    title: string;
    desc: string;
    href: string;
  }) => (
    <Link
      to={href}
      className="bg-zinc-100 p-2 border-2 w-[95%] sm:w-8/12 md:w-2/3 h-[60px] grid grid-rows-2 cursor-pointer mb-5"
    >
      <h5 className="self-end">{title}</h5>
      <p className="text-zinc-500">{desc}</p>
    </Link>
  );

  return (
    <div className="py-20 flex flex-col items-center">
      <h2 className="my-5">Informasi Akun</h2>
      <SettingsMenu
        title="Edit Akun"
        desc="Ubah informasi akun anda"
        href="/settings/acc"
      />
    </div>
  );
};
export default Options;
