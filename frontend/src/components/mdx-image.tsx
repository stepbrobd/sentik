import { useState } from "react";
import Image from "next/image";

const MDXImage = (props: any) => {
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
  });

  return (
    <span className="relative z-0 block">
      <span className="absolute z-10 block min-w-full rounded-md text-center">
        <Image
          className="rounded-md"
          src={props.src}
          alt={props.alt}
          layout="responsive"
          quality={75}
          placeholder="blur"
          blurDataURL={props.src}
          width={imageSize.width}
          height={imageSize.height}
          priority={true}
          onLoadingComplete={(image) => {
            setImageSize({
              width: image.naturalWidth,
              height: image.naturalHeight,
            });
          }}
          {...props}
        />
      </span>
      <span className="z-0 block min-w-full text-center blur-md">
        <Image
          src={props.src}
          alt={props.alt}
          layout="responsive"
          quality={75}
          placeholder="blur"
          blurDataURL={props.src}
          width={imageSize.width}
          height={imageSize.height}
          priority={true}
          onLoadingComplete={(image) => {
            setImageSize({
              width: image.naturalWidth,
              height: image.naturalHeight,
            });
          }}
          {...props}
        />
      </span>
      <span
        className="flex items-center justify-center px-5 pt-5 text-sm
        text-neutral-500 dark:text-neutral-400"
      >
        <span>{props.alt}</span>
      </span>
    </span>
  );
};

export default MDXImage;
