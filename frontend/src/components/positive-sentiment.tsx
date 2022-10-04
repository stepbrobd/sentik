import Link from "next/link";
import Image from "next/image";

const Positive = () => {
    return (
      <Link href="/" passHref aria-label="positive sentiment">
        <div className="flex h-[30px] w-auto items-center justify-center">
          <div className="h-[30px] w-[30px]">
              <Image
                src="/positive.png"
                alt="Positive"
                width={30}
                height={30}
                quality={50}
                placeholder="blur"
                blurDataURL="/positive.png"
                priority={true}
              />
          </div>
        </div>
      </Link>
    );
};

export default Positive;
