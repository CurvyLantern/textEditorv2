import BaseEditor from "@/components/editor/BaseEditor";
import { Accordion } from "@/components/ui/Accordion";
import { Box, Container, Stack } from "@mui/material";
import { JSONContent, generateJSON, generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useMemo, useState } from "react";
import { arrayBuffer } from "stream/consumers";

const genHtml = (json: JSONContent) =>
  json
    ? generateHTML(json, [
        StarterKit.configure({
          bulletList: {
            keepAttributes: true,
            keepMarks: true,
          },
        }),
      ])
    : "";

const jsonData = {
  type: "bulletList",
  content: [
    {
      type: "listItem",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Hello",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "There",
                    },
                  ],
                },
                {
                  type: "bulletList",
                  content: [
                    {
                      type: "listItem",
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: "How are you",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
type Node = {
  type: string;
  content: Node[];
};
function formatBulletList(node: Node) {
  if (node.type === "bulletList") {
    const arr: any[] = [];
    for (const item of node.content) {
      const v = formatListItem(item);
      arr.push(v);
    }
    return arr;
  }
  return null;
}

function formatListItem(node: Node) {
  if (node.type === "listItem") {
    const arr: any[] = [];
    for (const item of node.content) {
      if (item.type === "bulletList") {
        const v = formatBulletList(item);
        arr.push(v);
        // continue;
      } else {
        arr.push(genHtml(item));
      }
    }
    return arr;
  }
  return null;
}

const converter = (obj: any) => {
  const temple = formatBulletList(obj);
  return temple;
};
const organizedRecursion = (item: any[], obj: any = {}) => {
  if (!item) return obj;
  obj.title = item[0];
  obj.type = "item";
  for (const subItem of item.slice(1, item.length)) {
    if (Array.isArray(subItem)) {
      obj.type = "group";
      obj.items = subItem.map((childItem) => {
        const items = organizedRecursion(childItem);
        return items;
      });
    } else {
      let prevDescription =
        typeof obj.description === "string" ? obj.description : "";
      // obj.description = `${prevDescription} ${subItem}`;
      obj.description = [prevDescription, subItem].join(" ");
    }
  }

  return obj;
};
const HomePage = () => {
  const [jsonStr, setJsonStr] = useState("");
  const [json, setJson] = useState<JSONContent>();

  // console.clear();
  // console.log({ json });
  const formattedJson = useMemo(
    () => (json && json.content ? json.content[0] : []),
    [json]
  );
  const formattedNestedList = useMemo(() => {
    return converter(formattedJson);
  }, [formattedJson]);

  const organizedNestedList = useMemo(() => {
    if (!formattedNestedList) return [];
    const organizedArr = [];
    for (const item of formattedNestedList) {
      const obj = organizedRecursion(item);
      organizedArr.push(obj);
    }
    return organizedArr;
  }, [formattedNestedList]);

  const [step, setStep] = useState(1);
  const [initialStep, setInitialStep] = useState(1);
  const [stepLimit, setStepLimit] = useState(3);
  const goToPreviousStep = () => {
    setStep(step > initialStep && step < stepLimit ? step - 1 : step);
  };
  const goToNextStep = () => {
    setStep(step < stepLimit ? step + 1 : step);
  };
  return (
    <div>
      {/* <Container maxWidth="md">
        <div className="flex items-center justify-between p-5">
          <button
            onClick={goToPreviousStep}
            className="px-6 py-2 rounded-md bg-orange-500 text-white">
            Previous
          </button>
          <button
            onClick={goToNextStep}
            className="px-6 py-2 rounded-md bg-orange-500 text-white">
            Next
          </button>
        </div>
        <div></div>
      </Container> */}
      <Container maxWidth={"lg"}>
        <Box
          sx={{
            px: 2,
          }}>
          <BaseEditor
            onUpdate={(str: string, json: JSONContent) => {
              setJsonStr(str);
              setJson(json);
            }}
          />
        </Box>
        <div>{JSON.stringify(formattedNestedList, null, 2)}</div>
        {JSON.stringify(organizedNestedList, null, 2)}

        <Accordion contents={organizedNestedList} />
      </Container>
    </div>
  );
};

const Stepper = ({
  activeStep,
  step,
  children,
}: {
  children: React.ReactNode;
  activeStep: number;
  step: number;
}) => {
  return (
    <div className={`${activeStep !== step ? "hidden" : "block"} `}>
      {children}
    </div>
  );
};

export default HomePage;
