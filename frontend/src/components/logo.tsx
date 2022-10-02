import Link from "next/link";
import Image from "next/image";

const Logo = () => {
    return (
      <Link href="/" passHref aria-label="Logo">
        <div className="flex h-[50px] w-auto items-center justify-center">
          <div className="h-[50px] w-[50px]">
              <Image
                src="/logo.png"
                alt="Logo"
                width={50}
                height={50}
                quality={50}
                placeholder="blur"
                blurDataURL="/logo.png"
                priority={true}
              />
          </div>
        </div>
      </Link>
    );
};

export default Logo;
