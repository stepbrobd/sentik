import Headroom from "react-headroom";
import Logo from "./logo";
import NavigationSwitch from "./navigation-switch";
import ThemeSwitch from "./theme-switch";

const Header = () => {
  return (
    <Headroom style={{ transition: "all 0.25s ease-in-out" }}>
      <header
        className="light-mode-border-color dark:dark-mode-border-color sticky top-0 z-40
                         flex h-[60px] min-h-[60px] items-center
                         justify-center border-b-[1px]
                         bg-opacity-90 py-[4.5px]
                         backdrop-blur-[3px] backdrop-filter"
        aria-label="Header"
      >
        <div
          className="container mx-3.5 flex max-w-3xl flex-row
                        items-center justify-between xl:mx-0"
        >
          <Logo />
          <div className="container flex w-[85px] min-w-[85px] flex-row items-center justify-between">
            <ThemeSwitch />
            <NavigationSwitch />
          </div>
        </div>
      </header>
    </Headroom>
  );
};

export default Header;
