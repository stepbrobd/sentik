import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  const [isMounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!isMounted)
    return (
      <div
        className="h-[50px] min-h-[50px] w-[85px] min-w-[85px]"
        aria-label="Logo"
      />
    );
  else
    return (
      <Link href="/" passHref aria-label="Logo">
        <div className="flex h-[50px] w-auto items-center justify-center">
          <div className="h-[30px] w-[85px]">
            {resolvedTheme === "light" ? (
              <Image
                src="/logo-light-mode.webp"
                alt="Logo"
                width={170}
                height={60}
                quality={50}
                placeholder="blur"
                blurDataURL="/logo-light-mode.webp"
                priority={true}
              />
            ) : (
              <Image
                src="/logo-dark-mode.webp"
                alt="Logo"
                width={170}
                height={60}
                quality={50}
                placeholder="blur"
                blurDataURL="/logo-dark-mode.webp"
                priority={true}
              />
            )}
          </div>
        </div>
      </Link>
    );
};

export default Logo;
