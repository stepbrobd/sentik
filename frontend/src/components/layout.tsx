import { ReactNode, useState, useEffect } from "react";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";

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
      className="light-mode-background-color dark:dark-mode-background-color
                 light-mode-text-color dark:dark-mode-text-color
                 light-mode-border-color dark:dark-mode-border-color
                 transition duration-100 ease-in-out selection:bg-[#f81ce5]"
    >
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

export default Layout;
