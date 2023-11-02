import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import TaskItem from "@tiptap/extension-task-item";
import _TaskList from "@tiptap/extension-task-list";
import StarterKit from "@tiptap/starter-kit";
import { generateJSON } from "@tiptap/html";
import { useCallback, useEffect } from "react";
import {
  IconBold,
  IconBoldOff,
  IconItalic,
  IconIndentDecrease,
  IconIndentIncrease,
} from "@tabler/icons-react";
const TaskList = _TaskList.extend({
  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.sinkListItem("taskItem"),
    };
  },
});

const BaseEditor = ({
  onUpdate,
}: {
  onUpdate: (str: string, json: JSONContent) => void;
}) => {
  const editor = useEditor({
    autofocus: "start",
    onUpdate: (param) => {
      const json = param.editor.getJSON();
      onUpdate(JSON.stringify(json, null, 2), json);
      if (editor?.isActive("bulletList")) {
        return;
      } else {
        return editor?.chain().focus().toggleBulletList().run();
      }
    },
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
          HTMLAttributes: {
            class: "group",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "item",
          },
        },
      }),
    ],
    content: ``,
  });
  const turnOnBulletListMode = useCallback(() => {
    if (editor?.isActive("bulletList")) {
      return;
    } else {
      return editor?.chain().focus().toggleBulletList().run();
    }
  }, [editor]);

  useEffect(() => {
    turnOnBulletListMode();
  }, [turnOnBulletListMode]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className="border-2 rounded-md min-h-[25rem]"
      onKeyDown={(evt) => {
        if (evt.code === "Tab") {
          if (!editor.isActive("bulletList")) {
            turnOnBulletListMode();
          }
          evt.preventDefault();
        }
      }}>
      <div className="flex items-center gap-5 p-2 border-b-2 editor_menu">
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

        <button
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
          disabled={!editor.can().sinkListItem("listItem")}>
          <IconIndentIncrease size={15} />
        </button>
        <button
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
          disabled={!editor.can().liftListItem("listItem")}>
          <IconIndentDecrease size={15} />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="editor_textarea"
      />
    </div>
  );
};

export default BaseEditor;
