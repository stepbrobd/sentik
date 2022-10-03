import Image from "next/image";

const Footer = () => {
  return (
    <footer
      className="mt-auto flex items-center justify-center border-t-[1px] py-5"
      aria-label="Footer"
    >
      <div className="mx-3.5 max-w-3xl space-y-5 overflow-hidden pt-6 xl:mx-0">
        <p className="text-center text-sm">
          Copyright &copy; {new Date().getFullYear()} Sentik-Stocks for HackMIT
          2022.
        </p>
        <p className="text-center text-sm">All rights reserved.</p>
        <a
          className="flex h-[28px] items-center justify-center"
          href="https://creativecommons.org/licenses/by-nc/4.0/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="flex flex-row space-x-3">
            <div>
              <Image src="/cc.svg" alt="CC" width={24} height={24} />
            </div>
            <div>
              <Image src="/by.svg" alt="BY" width={24} height={24} />
            </div>
            <div>
              <Image src="/nc.svg" alt="NC" width={24} height={24} />
            </div>
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
