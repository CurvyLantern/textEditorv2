import BaseEditor from "@/components/editor/BaseEditor";
import { Accordion } from "@/components/ui/Accordion";
import { Box, Container, Stack } from "@mui/material";
import { JSONContent, generateJSON, generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useMemo, useState } from "react";
import { arrayBuffer } from "stream/consumers";

export type TProcessedNodeObj = {
  title: string;
  meta: {
    infos: string[];
  };
  description: string;
  items: TProcessedNodeObj[];
  type: "group" | "item";
};

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
const regex = /^&gt;[^\s].*/;
const regexDescriptionDelimiter = /^&gt;/;
function formatBulletList(node: Node, arr: any[] = []) {
  if (node.type === "bulletList") {
    // const arr: any[] = [];
    for (const item of node.content) {
      const obj: TProcessedNodeObj = {
        title: "",
        description: "",
        meta: {
          infos: [],
        },
        items: [],
        type: "item",
      };
      const v = formatListItem(item, obj, arr);
      if (v && v.title) {
        arr.push(v);
      }
    }
    return arr;
  }
  return null;
}

function descriptionToNormalText(description: string) {
  // return regex.test(description) ? description.slice(1) : description;
  return regex.test(description)
    ? description.replace(regexDescriptionDelimiter, "")
    : description;
}

function formatListItem(
  node: Node,
  obj: TProcessedNodeObj = {
    title: "",
    description: "",
    meta: {
      infos: [],
    },
    items: [],
    type: "item",
  },
  arr: any[]
) {
  try {
    if (node.type === "listItem") {
      let isDescriptionNode = false;
      let returnValue = obj;
      for (const item of node.content) {
        if (item.type === "bulletList") {
          const v = formatBulletList(item);
          if (returnValue.type === "item") {
            returnValue.type = "group";
            returnValue.description = "";
          }

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
            const contentSepareted = content.split("|");
            obj.title += contentSepareted[0];

            if (contentSepareted.length > 1) {
              for (let i = 1; i < contentSepareted.length; i++) {
                const item = contentSepareted[i].trim();
                const infos = item.split(",").map((s) => s.trim());
                obj.meta.infos.push(...infos);
              }
            }
          }
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
  if (!obj) return;
  // console.clear();
  // console.log(obj);
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
  const [json, setJson] = useState<JSONContent>();

  const formattedNestedList = useMemo(() => {
    if (!json) return null;
    const formattedJson = Array.isArray(json.content) && json.content[0];
    return converter(formattedJson);
  }, [json]);

  return (
    <Box sx={{ py: (t) => t.spacing(5) }}>
      <Container maxWidth={"lg"}>
        <Stack
          spacing={5}
          direction={{
            md: "row",
            xs: "column",
          }}>
          <BaseEditor
            onUpdate={(str: string, json: JSONContent) => {
              setJson(json);
            }}>
            <Accordion
              contents={formattedNestedList ? formattedNestedList : []}
            />
          </BaseEditor>
          {/* <Box sx={{ flex: 1 }}>
          
          </Box> */}
        </Stack>
        <pre>
          <code>{JSON.stringify(formattedNestedList, null, 2)}</code>
        </pre>
        {/* {JSON.stringify(organizedNestedList, null, 2)} */}
      </Container>
    </Box>
  );
};

export default HomePage;
