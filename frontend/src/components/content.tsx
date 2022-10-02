import { ReactNode, Fragment, useState } from "react";
import { useRouter } from "next/router";
import Footer from "./footer";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Year from "./year";
import Link from "next/link";

type Props = {
  children?: ReactNode;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Content = ({ children }: Props) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { name: "SQQQ", href: "/SQQQ", current: false },
    { name: "AAPL", href: "/AAPL", current: false },
    { name: "SPY", href: "/SPY", current: false },
    { name: "TSLA", href: "/TSLA", current: false },
    { name: "DIA", href: "/DIA", current: false },
    { name: "DAL", href: "/DAL", current: false },
  ]);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <h1 className="mt-5 px-2 text-2xl font-black">History</h1>
                    <nav className="mt-5 space-y-1 px-2">
                      {history.map((item) => (
                        <Link href={item.href} key={item.name}>
                          <a
                            key={item.name}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                            )}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </div>
              <h1 className="mt-5 px-2 text-3xl font-black">History</h1>
              <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                {history.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <a
                      key={item.name}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 md:px-8">
                <div className="z-10 w-full space-y-5 rounded-lg bg-[#84367C] px-8 py-10">
                  <Year />

                  <h1 className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-white">
                      From: Twitter
                    </span>
                    <span className="text-3xl font-bold text-white">
                      To: <b className="text-[#F5FA09]">You</b>
                    </span>
                  </h1>

                  <h2 className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">
                      <b className="text-[#F5FA09]">LIVE</b> stock sentiment
                      report
                    </span>
                  </h2>

                  <p className="text-sm text-white">
                    <span>We get you </span>
                    <span>money advice</span>
                    <span> and save you the only non-monetary currency: </span>
                    <span className="text-[#F5FA09]"> your time</span>
                    <span>.</span>
                  </p>

                  <div className="flex flex-col items-center justify-center">
                    <div className="mt-1">
                      <input
                        type="text"
                        name="ticker"
                        id="ticker"
                        className="border-color block h-9 w-24 rounded-md"
                        placeholder="Ticker"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            router.push(`/${input}`);
                            history.push({
                              name: input,
                              href: `/${input}`,
                              current: true,
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                {children}
                <Footer />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Content;
