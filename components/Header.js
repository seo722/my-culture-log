/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  CollectionIcon,
  MenuIcon,
  XIcon,
  DocumentSearchIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

const books = [
  {
    name: "My List",
    description: "Look at my List",
    href: "/books",
    icon: CollectionIcon,
  },
  {
    name: "Search",
    description: "Go to search",
    href: "/books/search",
    icon: DocumentSearchIcon,
  },
];
const movies = [
  {
    name: "My List",
    description: "Look at my List",
    href: "/movies",
    icon: CollectionIcon,
  },
  {
    name: "Search",
    description: "Go to search",
    href: "/movies/search",
    icon: DocumentSearchIcon,
  },
];
const dramas = [
  {
    name: "My List",
    description: "Look at my List",
    href: "/dramas",
    icon: CollectionIcon,
  },
  {
    name: "Search",
    description: "Go to search",
    href: "/dramas/search",
    icon: DocumentSearchIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const onHomeClick = () => {
    router.push("/");
  };
  return (
    <Popover className="top-0 sticky bg-white dark:bg-zinc-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <span
              className="cursor-pointer font-bold dark:text-white"
              onClick={onHomeClick}
            >
              Home
            </span>
          </div>
          {session && (
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button
                className="bg-white dark:bg-inherit rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 
                dark:text-zinc-100 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 focus:outline-none 
                focus:ring-2 focus:ring-inset focus:ring-black dark:focus:ring-zinc-200"
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          )}

          {session && (
            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-gray-900 dark:text-zinc-100"
                          : "text-gray-500 dark:text-zinc-400",
                        "group bg-white dark:bg-inherit rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      )}
                    >
                      <span>Books</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0 ml-[100px]">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white dark:bg-zinc-600 px-5 py-6 sm:gap-8 sm:p-8">
                            {books.map((item) => (
                              <div
                                key={item.name}
                                onClick={() => {
                                  router.push(item.href);
                                }}
                                className="cursor-pointer -m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700"
                              >
                                <item.icon
                                  className="flex-shrink-0 h-6 w-6 text-black/80 dark:text-zinc-200"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-zinc-200">
                                    {item.name}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-gray-900 dark:text-zinc-100"
                          : "text-gray-500 dark:text-zinc-400",
                        "group bg-white dark:bg-inherit rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      )}
                    >
                      <span>Movies</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0 ml-[100px]">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white dark:bg-zinc-600 px-5 py-6 sm:gap-8 sm:p-8">
                            {movies.map((item) => (
                              <div
                                key={item.name}
                                onClick={() => {
                                  router.push(item.href);
                                }}
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700"
                              >
                                <item.icon
                                  className="flex-shrink-0 h-6 w-6 text-black/80 dark:text-zinc-200"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-zinc-200">
                                    {item.name}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-gray-900 dark:text-zinc-100"
                          : "text-gray-500 dark:text-zinc-400",
                        "group bg-white dark:bg-inherit rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      )}
                    >
                      <span>Dramas</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0 ml-[100px]">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white dark:bg-zinc-600 px-5 py-6 sm:gap-8 sm:p-8">
                            {dramas.map((item) => (
                              <div
                                key={item.name}
                                onClick={() => {
                                  router.push(item.href);
                                }}
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700"
                              >
                                <item.icon
                                  className="flex-shrink-0 h-6 w-6 text-black/80 dark:text-zinc-200"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-zinc-200">
                                    {item.name}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </Popover.Group>
          )}

          {session && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <span
                onClick={signOut}
                className="cursor-pointer ml-8 whitespace-nowrap inline-flex items-center justify-center 
                px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white 
                bg-black hover:bg-black/70 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-400"
              >
                Sign out
              </span>
            </div>
          )}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-zinc-600 divide-y-2 divide-black-80">
            <div className="pt-5 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <span
                    onClick={onHomeClick}
                    className="cursor-pointer font-bold "
                  >
                    Home
                  </span>
                </div>
                <div className="-mr-2">
                  <Popover.Button
                    className="bg-white dark:bg-zinc-600 rounded-md p-2 inline-flex items-center justify-center 
                  text-gray-400 dark:text-gray-200 hover:text-gray-500 hover:bg-gray-100 
                  dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black dark:focus:ring-white"
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6"></div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="flex flex-col justify-center items-start">
                {["Books", "Movies", "Dramas"].map((item) => (
                  <span
                    onClick={() => {
                      router.push(`/${item.toLowerCase()}`);
                    }}
                    key={item}
                    className="w-full cursor-pointer my-0.5 p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
              {!session ? (
                <div>
                  <button
                    onClick={signIn}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={signOut}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm 
                    text-base font-medium text-white dark:text-zinc-800 bg-black hover:bg-black/70 dark:bg-zinc-200 dark:hover:bg-zinc-300"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
