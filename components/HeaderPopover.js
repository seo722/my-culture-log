import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function HeaderPopover({ value, name }) {
  const router = useRouter();

  return (
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
            <span>{name}</span>
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
                  {value.map((item) => (
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
  );
}

export default HeaderPopover;
