import { ReactNode } from "react";

const MenuParent = ({
  id,
  title,
  desc,
  children,
}: {
  id?: string;
  title: string;
  desc: string;
  children: ReactNode;
}) => {
  return (
    <div className="w-full">
      <div className="max-md:text-center md:mx-20 lg:mx-36" id={id}>
        <h3>{title}</h3>
        <p className="text-zinc-500">{desc}</p>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        {children}
      </div>
    </div>
  );
};

export default MenuParent;
