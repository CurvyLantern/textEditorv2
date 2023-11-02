import * as RadixAccordion from "@radix-ui/react-accordion";
import { IconChevronCompactUp, IconChevronUp } from "@tabler/icons-react";

type Content = { title: string; type: string; items: Content[] };

export const AccordionGroup = ({
  item,
  children,
}: {
  item: Content;
  children: React.ReactNode;
}) => {
  if (item.type === "item") {
    return <AccordionItem item={item}>{children}</AccordionItem>;
  }
  if (item.type === "group") {
    return (
      <AccordionItem item={item}>
        <Accordion contents={item.items} />
      </AccordionItem>
    );
  }
  return null;
};

export const AccordionItem = ({
  item,
  children,
}: {
  item: Content;
  children: React.ReactNode;
}) => {
  return (
    <RadixAccordion.Item value={item.title}>
      <RadixAccordion.Header className="flex">
        <RadixAccordion.Trigger className="flex-1 p-2 bg-white border text-black font-semibold flex justify-between items-center">
          <span>
            {item.title}
            <span className="inline-flex items-center justify-center px-2  rounded-full bg-green-500 text-white ">
              {item.type}
            </span>
          </span>
          <span>
            <IconChevronUp size={20} />
          </span>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content>{children}</RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};

export const Accordion = ({ contents }: { contents: Content[] }) => {
  const Item = contents.map((item) => {
    if (item) {
      return (
        <AccordionGroup
          item={item}
          key={JSON.stringify(item)}>
          No description here
        </AccordionGroup>
      );
    }
    return null;
  });
  return (
    <RadixAccordion.Root
      collapsible
      type="single"
      className="p-3 flex flex-col gap-3">
      {Item}
    </RadixAccordion.Root>
  );
};
