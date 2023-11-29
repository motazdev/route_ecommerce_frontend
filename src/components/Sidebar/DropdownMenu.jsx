import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
export const DropdownMenu = ({ icon, title, list }) => {
  return (
    <Accordion.Root className="w-auto rounded-md " type="single" collapsible>
      <Accordion.AccordionItem
        value="item-1"
        className=" mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b  "
      >
        <Accordion.Header className="flex">
          <Accordion.Trigger className="flex peer relative w-full group items-center border-l-indigo-500 py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-indigo-500 focus:border-l-4">
            <span className="flex mr-5 w-5">{icon}</span>
            {title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600 transition peer-checked:rotate-180 ease-[cubic-bezier(0.87,_0,_0.13,_1)]  duration-300 group-data-[state=open]:rotate-180 peer-hover:text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="text-mauve11  data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">
          <div className="py-[15px] px-3">{list}</div>
        </Accordion.Content>
      </Accordion.AccordionItem>
    </Accordion.Root>
  );
};
