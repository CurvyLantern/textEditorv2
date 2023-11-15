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
const regex = /^:[^\s].*/;
function formatBulletList(node: Node, arr: any[] = []) {
  if (node.type === "bulletList") {
    // const arr: any[] = [];
    for (const item of node.content) {
      const obj = {
        title: "",
        description: "",
        items: [],
      };
      const v = formatListItem(item, obj, arr);
      if (v) {
        arr.push(v);
      }
    }
    return arr;
  }
  return null;
}

function descriptionToNormalText(description: string) {
  return regex.test(description) ? description.slice(1) : description;
}

function formatListItem(
  node: Node,
  obj: {
    title: string;
    description: string;
    items: any[];
  } = {
    title: "",
    description: "",
    items: [],
  },
  arr: any[]
) {
  try {
    if (node.type === "listItem") {
      // const arr: any[] = [];

      // const descriptionNode = node.content[0];
      // if (descriptionNode.type === "paragraph") {
      //   const content = genHtml(descriptionNode);
      //   if (regex.test(content)) {
      //     const prevNode = arr[arr.length - 1];
      //     prevNode.description += " " + content;
      //   }
      // }
      let isDescriptionNode = false;
      let returnValue = obj;
      for (const item of node.content) {
        if (item.type === "bulletList") {
          const v = formatBulletList(item);
          returnValue.items = v ? v : [];
        } else {
          if (!item.content) continue;
          const content = genHtml(item).trim();
          const matched = regex.test(content);

          if (matched) {
            returnValue = arr[arr.length - 1] ? arr[arr.length - 1] : obj;
            returnValue.description = [
              returnValue.description,
              descriptionToNormalText(content),
            ]
              .filter(Boolean)
              .join("\n");
            if (arr[arr.length - 1]) {
              isDescriptionNode = true;
            } else {
              isDescriptionNode = false;
            }
          } else {
            obj.title += content;
          }
          // arr.push(content);
        }
      }
      return isDescriptionNode ? null : returnValue;
      // return arr;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}

const converter = (obj: any) => {
  console.clear();
  console.log(obj);
  const temple = formatBulletList(obj);
  return temple;
};
const organizedRecursion = (item: any[], obj: any = {}) => {
  if (!item) return obj;
  obj.title = item[0];
  obj.type = "item";
  // for (const subItem of item.slice(1, item.length)) {
  //   if (Array.isArray(subItem)) {
  //     obj.type = "group";
  //     obj.items = subItem.map((childItem) => {
  //       const items = organizedRecursion(childItem);
  //       return items;
  //     });
  //   } else {
  //     let prevDescription =
  //       typeof obj.description === "string" ? obj.description : "";
  //     // obj.description = `${prevDescription} ${subItem}`;
  //     obj.description = [prevDescription, subItem].join(" ");
  //   }
  // }

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
    const regex = /^:[^\s].*[^:\s]:$/;
    for (const [itemIdx, item] of formattedNestedList.entries()) {
      const itemContent = item[0];

      if (typeof itemContent === "string" && regex.test(itemContent)) {
        const prevDescription =
          organizedArr[organizedArr.length - 1].description;

        organizedArr[organizedArr.length - 1].description = [
          prevDescription ?? "",
          itemContent.slice(1, itemContent.length - 1),
        ].join(" ");
      } else {
        const obj = organizedRecursion(item);

        organizedArr.push(obj);
      }
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
    <Box sx={{ py: (t) => t.spacing(5) }}>
      <Container maxWidth={"lg"}>
        <Stack
          spacing={5}
          direction={{
            md: "row",
            xs: "column",
          }}>
          <Box
            sx={{
              px: 2,
              flex: 1,
            }}>
            <BaseEditor
              onUpdate={(str: string, json: JSONContent) => {
                setJsonStr(str);
                setJson(json);
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Accordion
              contents={formattedNestedList ? formattedNestedList : []}
            />
          </Box>
        </Stack>
        <pre>
          <code>{JSON.stringify(formattedNestedList, null, 2)}</code>
        </pre>
        {/* {JSON.stringify(organizedNestedList, null, 2)} */}
      </Container>
    </Box>
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
