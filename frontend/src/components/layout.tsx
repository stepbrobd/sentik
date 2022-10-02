import { ReactNode, useState, useEffect } from "react";
import Content from "./content";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div
      className="background-color 
                 text-color 
                 border-color 
                 transition duration-100 ease-in-out selection:bg-[#f81ce5]"
    >
      <Content>{children}</Content>
     </div>
  );
};

export default Layout;
