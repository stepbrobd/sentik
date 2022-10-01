type Props = {
  text: string;
};

const Divider = (props: Props) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="light-mode-border-color dark:dark-mode-border-color w-full border-t" />
      </div>
      <div className="relative flex justify-center">
        <span className="light-mode-background-color dark:dark-mode-background-color px-2 text-xs text-neutral-500 dark:text-neutral-400">
          {props.text}
        </span>
      </div>
    </div>
  );
};

export default Divider;
