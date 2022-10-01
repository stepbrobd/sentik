import { ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";
import MDXImage from "./mdx-image";

type Props = {
  children?: ReactNode;
};

const components = {
  img: MDXImage,
};

const Content = ({ children }: Props) => {
  return (
    <MDXProvider components={components}>
      <main
        className="mx-3.5 flex items-center justify-center xl:mx-0"
        aria-label="Content"
      >
        <article
          className="light-mode-text-color dark:dark-mode-text-color prose-a:light-mode-link-color
                     dark:prose-a:dark-mode-link-color container prose prose-neutral z-0
                     my-10 max-w-3xl dark:prose-invert"
        >
          {children}
        </article>
      </main>
    </MDXProvider>
  );
};

export default Content;
