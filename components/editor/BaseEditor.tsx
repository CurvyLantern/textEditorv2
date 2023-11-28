import useFormattedListFromEditor from "@/hooks/useFormattedListFromEditor";
import { Box, Stack } from "@mui/material";
import _TaskList from "@tiptap/extension-task-list";
import {
  EditorContent,
  JSONContent,
  generateHTML,
  useEditor,
} from "@tiptap/react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useState } from "react";
import { Accordion } from "../ui/Accordion";
import EditorMenu from "./menu/EditorMenu";
import { Transaction } from "@tiptap/pm/state";
const TaskList = _TaskList.extend({
  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.sinkListItem("taskItem"),
    };
  },
});

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

const extensions = [
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
];
const BaseEditor = ({ defaultContent = "" }: { defaultContent?: string }) => {
  const { setJson, formattedNestedList } = useFormattedListFromEditor();
  const turnOnBulletListMode = useCallback((editor: Editor) => {
    if (editor && !editor.isActive("bulletList")) {
      editor.chain().toggleBulletList().run();
    }
  }, []);
  const editorOnUpdateHandler = useCallback(
    (editor: Editor) => {
      const json = editor.getJSON();
      // const text = param.editor.getText();
      // const html = param.editor.getHTML();
      // console.clear();
      // console.log(JSON.stringify(text), "text");
      // console.log(html, "html");
      // console.log(json, "json");
      setJson(json);
      turnOnBulletListMode(editor);
    },
    [setJson, turnOnBulletListMode]
  );

  const editor = useEditor(
    {
      // autofocus: "end",
      onCreate: ({ editor }) => {
        editor.commands.focus("end");
        turnOnBulletListMode(editor);
        editorOnUpdateHandler(editor);
      },
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        console.log(html, "html");
        editorOnUpdateHandler(editor);
      },
      extensions,
      content: defaultContent,
    },
    [defaultContent]
  );

  const [showContentBox, setShowContentBox] = useState(true);

  // useEffect(() => {
  //   editor?.commands.focus(0);
  //   turnOnBulletListMode();
  // }, [editor, turnOnBulletListMode]);

  const onToggleSplit = useCallback(() => {
    setShowContentBox((p) => !p);
  }, []);

  if (!editor) {
    return null;
  }

  const onKeyDownHandler = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    if (evt.code === "Tab") {
      if (!editor.isActive("bulletList")) {
        turnOnBulletListMode(editor);
      }
      evt.preventDefault();
      return;
    }
    if (evt.code === "Backspace") {
      const { selection } = editor.state;
      if (selection && selection.empty) {
        const { parentOffset, parent, pos } = selection.$anchor;
        const { nodeSize, content } = parent;
        const diff = nodeSize - content.size;
        if (parentOffset <= 0) {
          const from = pos - diff;
          const to = pos;
          editor.commands.deleteRange({ from, to });
          evt.preventDefault();
        }
      }
      return;
    }

    if (evt.code === "Delete") {
      const { selection } = editor.state;
      if (selection && selection.empty) {
        const { parentOffset, parent, pos } = selection.$anchor;
        const { nodeSize, content } = parent;
        const diff = nodeSize - content.size;
        if (parentOffset >= content.size) {
          const from = pos;
          const to = from + diff;
          editor.commands.deleteRange({ from, to });
          evt.preventDefault();
          return false;
        }
      }
    }
  };

  return (
    <Box
      sx={{
        boxShadow: (t) => t.shadows[1],
        borderRadius: (t) => t.shape.borderRadius,
        overflow: "hidden",
        p: (t) => t.spacing(2),
        width: "100%",
      }}
      onKeyDown={onKeyDownHandler}>
      <EditorMenu
        onToggleSplit={onToggleSplit}
        editor={editor}
      />
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          py: (t) => t.spacing(2),
        }}>
        <Box
          component={EditorContent}
          sx={{
            flex: 1,
            borderRadius: (t) => t.shape.borderRadius,
            "& .group": {
              padding: 0,
            },
            "& .item": {
              paddingLeft: (t) => t.spacing(2),
              listStyle: "none",
            },
            "& p": {
              margin: 0,
            },
          }}
          editor={editor}
          className="editor_textarea"
        />
        {showContentBox ? (
          <Box
            sx={{
              flex: 1,
              p: 2,
              border: "1px solid",
              borderColor: (t) => t.palette.grey[200],
              borderRadius: (t) => t.shape.borderRadius,
            }}>
            <Accordion
              contents={formattedNestedList ? formattedNestedList : null}
            />
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
};

export default BaseEditor;

/* 

 <FloatingMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        shouldShow={({ editor }) => {
          return editor.isActive("listItem") && !editor.isActive("text");
        }}>
        <Stack
          ref={floatingButtonParentRef}
          direction={"column"}
          p={1}
          sx={{
            // border: "1px solid",
            borderRadius: (t) => t.spacing(1),
            boxShadow: (t) => t.shadows[2],
          }}>
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}>
            Description
          </Button>
        </Stack>
        <Popover
          elevation={0}
          id={id}
          open={open}
          anchorEl={floatingButtonParentRef.current}
          onClose={handleClose}
          sx={{
            padding: 0,
            marginTop: 1,
            boxShadow: "none",
            border: "1px solid",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}>
          <Stack
            spacing={1}
            sx={{
              width: "50vw",
            }}>
            <TextField
              value={descriptionValue}
              onChange={(v) => {
                setDescriptionValue(v.currentTarget.value);
              }}
              multiline
              placeholder="Write your description"
            />
            <Box>
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  // const pos = editor.state.selection.$anchor.pos;
                  // const pos = currentActivePos;
                  // console.log({ pos, currentActivePosEnd });
                  // const from = currentActivePos;
                  // const to = currentActivePosEnd;

                  // const range = descriptionValue.length;
                  // setCurrentActivePosEnd(range + from);
                  // editor.commands.deleteRange({
                  //   from,
                  //   to,
                  // });
                  editor.commands.insertContentAt(
                    currentActivePos,
                    descriptionValue
                  );
                }}>
                Done
              </Button>
            </Box>
          </Stack>
        </Popover>
      </FloatingMenu>

*/
