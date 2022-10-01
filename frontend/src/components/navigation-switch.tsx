import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { navigation } from "../utils/navigation";
import Link from "next/link";

const NavigationSwitch = () => {
  const [isMounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!isMounted)
    return <div className="h-[50px] min-h-[50px] w-[30px] min-w-[30px]" />;
  else
    return (
      <div className="flex h-[50px] min-h-[50px] w-[30px] min-w-[30px] items-center justify-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="light-mode-border-color     hover:light-mode-bg-action-color     active:light-mode-bg-action-color
                         dark:dark-mode-border-color dark:hover:dark-mode-bg-action-color dark:active:dark-mode-bg-action-color
                         flex h-[30px] w-[30px] items-center justify-center
                         rounded-md border focus:outline-none"
              aria-label="Navigation Switch"
            >
              {resolvedTheme === "light" ? (
                <EllipsisVerticalIcon
                  className="h-5 w-5"
                  fill="dimgray"
                  aria-hidden="true"
                />
              ) : (
                <EllipsisVerticalIcon
                  className="h-5 w-5"
                  fill="white"
                  aria-hidden="true"
                />
              )}
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="w-30 absolute right-0 mt-[30px] origin-top-right rounded-md bg-opacity-90 outline-none ring-[1px]
            ring-neutral-300 backdrop-blur-[3px] backdrop-filter dark:ring-neutral-700"
            >
              <nav className="py-1">
                {navigation.main.map((item) => (
                  <Link key={item.name} href={item.href} passHref>
                    <Menu.Item key={item.name}>
                      <a className="light-mode-link-color dark:dark-mode-link-color block px-4 py-2 text-center text-sm">
                        {item.name}
                      </a>
                    </Menu.Item>
                  </Link>
                ))}
              </nav>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
};

export default NavigationSwitch;
