import Link from "next/link";
import Image from "next/image";

const Negative = () => {
    return (
      <Link href="/" passHref aria-label="negative sentiment">
        <div className="flex h-[30px] w-auto items-center justify-center">
          <div className="h-[30px] w-[30px]">
              <Image
                src="/negative.png"
                alt="Negative"
                width={30}
                height={30}
                quality={50}
                placeholder="blur"
                blurDataURL="/negative.png"
                priority={true}
              />
          </div>
        </div>
      </Link>
    );
};

export default Negative;
