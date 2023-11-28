import { JSONContent, generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { useMemo, useState } from "react";
export type TProcessedNodeObj = {
  title: string;
  context: "info" | "cave";
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
const allowedContextValues = ["info", "cave"] as const;
function formatBulletList(node: Node, arr: any[] = []) {
  if (node.type === "bulletList") {
    // const arr: any[] = [];
    for (const item of node.content) {
      const obj: TProcessedNodeObj = {
        title: "",
        description: "",
        context: "info",
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
    context: "info",
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
            const titleWithContext = contentSepareted[0].trim();
            const delimiter = ":";
            const matchedContext = allowedContextValues.find((cxt) =>
              titleWithContext.startsWith(`${cxt}:`)
            );
            if (matchedContext) {
              obj.context = matchedContext;
              obj.title = titleWithContext.replace(`${matchedContext}:`, "");
            } else {
              obj.title = titleWithContext;
            }
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

  const temp = formatBulletList(obj);
  return temp;
};
const useFormattedListFromEditor = () => {
  const [json, setJson] = useState<JSONContent | null>(null);
  const formattedNestedList = useMemo(() => {
    if (!json) return null;
    const formattedJson = Array.isArray(json.content) && json.content[0];
    return converter(formattedJson);
  }, [json]);

  const returnObj = useMemo(
    () => ({ setJson, formattedNestedList }),
    [formattedNestedList]
  );
  return returnObj;
};

export default useFormattedListFromEditor;
