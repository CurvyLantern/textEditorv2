import BaseEditor from "@/components/editor/BaseEditor";
import { Accordion } from "@/components/ui/Accordion";
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
  if (Array.isArray(item[1])) {
    obj.type = "group";
    obj.items = item[1].map((childItem) => {
      const items = organizedRecursion(childItem);
      return items;
    });
  }
  return obj;
};
const HomePage = () => {
  const [jsonStr, setJsonStr] = useState("");
  const [json, setJson] = useState<JSONContent>();
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

  // useEffect(() => {
  //   console.clear();
  //   console.log(formattedNestedList, "formattedNestedList");
  //   console.log(organizedNestedList, "organizedNestedList");
  // }, [organizedNestedList]);

  return (
    <div className="pt-20">
      <div className="max-w-3xl w-full mx-auto">
        <BaseEditor
          onUpdate={(str: string, json: JSONContent) => {
            setJsonStr(str);
            setJson(json);
          }}
        />
      </div>

      {/* {JSON.stringify(formattedNestedList, null, 2)} */}

      <div>
        <Accordion contents={organizedNestedList} />
      </div>
    </div>
  );
};

export default HomePage;
