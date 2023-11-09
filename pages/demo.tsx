import React, { useMemo, useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import Details from "@tiptap-pro/extension-details";
import DetailsSummary from "@tiptap-pro/extension-details-summary";
import DetailsContent from "@tiptap-pro/extension-details-content";
import { Container, getContainerUtilityClass } from "@mui/material";
import {
  useEditor,
  EditorContent,
  JSONContent,
  generateJSON,
  generateHTML,
} from "@tiptap/react";
import TaskItem from "@tiptap/extension-task-item";
import _TaskList from "@tiptap/extension-task-list";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect } from "react";

import {
  IconBold,
  IconBoldOff,
  IconItalic,
  IconIndentDecrease,
  IconIndentIncrease,
} from "@tabler/icons-react";

const extensions = [
  StarterKit,
  Details.configure({
    persist: true,
    HTMLAttributes: {
      class: "details",
    },
  }),
  DetailsSummary,
  DetailsContent,
  Placeholder.configure({
    includeChildren: true,
    placeholder: ({ node }) => {
      if (node.type.name === "detailsSummary") {
        return "Summary";
      }
      return "";
    },
  }),
];
const genHtml = (json: JSONContent) =>
  json ? generateHTML(json, extensions) : "";

type TContentObj = {
  title?: string;
  description?: string;
  items?: TContentObj[] | TContentObj;
};

const detailsContentParser = (json: JSONContent) => {
  const obj: TContentObj = {
    description: "",
    items: [],
  };
  if (json.type !== "detailsContent") return obj;
  json.content?.forEach((item) => {
    if (item.type === "paragraph") {
      obj.description = genHtml(item);
    }
    if (item.type === "details") {
      obj.items = convert(item);
    }
  });
  return obj;
};
const convert = (json: JSONContent) => {
  if (json) {
    const content = json.content;

    if (json.type === "details") {
      console.clear();
      console.log(json, "57");
      const obj: TContentObj = {
        title: "",
        description: "",
        items: [],
      };
      content?.forEach((item) => {
        if (item.type === "detailsSummary") {
          obj.title = genHtml(item);
        }
        if (item.type === "detailsContent") {
          const contentObj = detailsContentParser(item);
          obj.description = contentObj.description;
          obj.items = contentObj.items;
        }
      });
      return obj;
    } else [] as TContentObj[];
  } else {
    return [] as TContentObj[];
  }
};

const DemoPage = () => {
  const [baseJson, setBaseJson] = useState<JSONContent>();
  const [baseHtml, setBaseHtml] = useState("");
  const [plainText, setPlainText] = useState("");

  const convertedOutput = useMemo(() => {
    const content = baseJson?.content;
    const arr = [];
    if (content) {
      for (const item of content) {
        const convertedItem = convert(item);
        arr.push(convertedItem);
      }
    }
    return arr;
  }, [baseJson]);

  useEffect(() => {
    console.log(convertedOutput, "convertedOutput");
  }, [convertedOutput]);

  useEffect(() => {
    if (baseJson) {
      setPlainText(genHtml(baseJson));
    }
  }, [baseJson]);

  const editor = useEditor({
    onFocus: (param) => {
      console.log(param, "param");
      // const pos = param.transaction.curSelection.$head.pos;
      const node = param.editor.commands.selectParentNode();
      console.log(node, "node");
    },
    onUpdate: (param) => {
      console.log(param.editor, "editor");
      const json = param.editor.getJSON();
      const html = param.editor.getHTML();
      if (html) {
        setBaseHtml(html);
      }
      if (json) {
        setBaseJson(json);
      }
    },
    extensions,
    content: baseHtml,
  });

  const setDetails = () => {
    if (editor) {
      editor.chain().focus().setDetails().run();
    }
  };
  const unsetDetails = () => {
    if (editor) {
      editor.chain().focus().unsetDetails().run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <div
        className="border-2 border-solid border-black rounded-md min-h-[25rem]"
        onKeyDown={(evt) => {
          if (evt.code === "Tab") {
            console.log(evt);
            if (evt.shiftKey) {
              unsetDetails();
            } else {
              setDetails();
            }
            evt.preventDefault();
          }
        }}>
        <div className="flex items-center gap-5 p-2 border-b-2 editor_menu">
          <button
            onClick={() => setDetails()}
            disabled={!editor.can().setDetails()}>
            setDetails
          </button>
          <button
            onClick={() => unsetDetails()}
            disabled={!editor.can().unsetDetails()}>
            unsetDetails
          </button>
          <button
            onClick={() => editor.commands.toggleBold()}
            className={editor.isActive("bulletList") ? "is-active" : ""}>
            <IconBold size={15} />
          </button>
          <button
            onClick={() => editor.commands.toggleBold()}
            className={editor.isActive("bulletList") ? "is-active" : ""}>
            <IconItalic size={15} />
          </button>
        </div>
        <EditorContent
          editor={editor}
          className="editor_textarea"
        />
      </div>
      <p> {plainText} </p>
      <pre>
        <code>{JSON.stringify(baseJson, null, 2)}</code>
      </pre>
    </Container>
  );
};
const data = [
  {
    title: "title1",
    content: "This is description1",
    items: [
      {
        title: "subtitle1",
        content: "sub description1",
      },
    ],
  },
  {
    title: "title2",
    content: "This is description2",
    items: [
      {
        title: "subtitle2",
        content: "sub description2",
      },
    ],
  },
];
export default DemoPage;
