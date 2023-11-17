import {
  useEditor,
  EditorContent,
  JSONContent,
  generateJSON,
  generateHTML,
  FloatingMenu,
} from "@tiptap/react";
import TaskItem from "@tiptap/extension-task-item";
import _TaskList from "@tiptap/extension-task-list";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconBold,
  IconBoldOff,
  IconItalic,
  IconIndentDecrease,
  IconIndentIncrease,
} from "@tabler/icons-react";
import {
  Button,
  Popover,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  Box,
  Collapse,
} from "@mui/material";
import EditorMenu from "./menu/EditorMenu";
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

const BaseEditor = ({
  onUpdate,
  children,
}: {
  children: React.ReactNode;
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

  const [showContentBox, setShowContentBox] = useState(true);

  const turnOnBulletListMode = useCallback(() => {
    if (editor?.isActive("bulletList")) {
      return;
    } else {
      return editor?.chain().focus().toggleBulletList().run();
    }
  }, [editor]);

  useEffect(() => {
    editor?.commands.focus(0);
    turnOnBulletListMode();
  }, [editor, turnOnBulletListMode]);

  const onToggleSplit = useCallback(() => {
    setShowContentBox((p) => !p);
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <Box
      sx={{
        boxShadow: (t) => t.shadows[1],
        borderRadius: (t) => t.shape.borderRadius,
        overflow: "hidden",
        p: (t) => t.spacing(2),
        width: "100%",
      }}
      // className="border-2 border-solid border-black rounded-md min-h-[25rem]"
      onKeyDown={(evt) => {
        if (evt.code === "Tab") {
          if (!editor.isActive("bulletList")) {
            turnOnBulletListMode();
          }
          evt.preventDefault();
        }
      }}>
      {/* <div className="flex items-center gap-5 p-2 border-b-2 editor_menu">
        <button
          onClick={}
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
      </div> */}

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
            {children}
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
