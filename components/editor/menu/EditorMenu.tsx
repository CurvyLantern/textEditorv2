import * as React from "react";
import { styled } from "@mui/material/styles";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Editor } from "@tiptap/react";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

type TEditorMenuProps = {
  // onToggleBold: () => void;
  // onToggleItalic: () => void;
  // onToggleIndent: () => void;
  // onToggleOutdent: () => void;
  editor: Editor | null;
  onToggleSplit: () => void;
};
export default function EditorMenu({
  // onToggleBold,
  // onToggleIndent,
  // onToggleItalic,
  // onToggleOutdent,
  editor,
  onToggleSplit,
}: TEditorMenuProps) {
  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState<string[]>(() => []);
  const [splitter, setSplitter] = React.useState(() => ["split"]);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    const arr = [];
    if (editor?.isActive("bold")) {
      console.log("hello there 2");
      arr.push("bold");
    }
    if (editor?.isActive("italic")) {
      arr.push("italic");
    }
    setFormats(arr);
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const handleSplitter = (
    event: React.MouseEvent<HTMLElement>,
    newSplitter: string[]
  ) => {
    setSplitter(newSplitter);
  };

  const onToggleBold = () => editor?.commands.toggleBold();
  const onToggleItalic = () => editor?.commands.toggleItalic();
  const onToggleIndent = () =>
    editor?.chain().focus().sinkListItem("listItem").run();
  const onToggleOutdent = () =>
    editor?.chain().focus().liftListItem("listItem").run();

  const [menuToggleButtonFormats, setMenuToggleButtonFormats] = React.useState<
    string[]
  >(["bold", "italic", "indent", "outdent"]);
  // React.useLayoutEffect(() => {
  //   if (!editor) {
  //     return undefined;
  //   }
  //   setBoldAndItalicFormats((prev) => {
  //     const newFormats = ["bold", "italic", "left", "right"].filter((format) =>
  //       editor.isActive(format)
  //     );

  //     if (JSON.stringify(newFormats) === JSON.stringify(prev)) {
  //       return prev;
  //     }

  //     return newFormats;
  //   });
  // setBoldAndItalicFormats((prev) => {
  //   const arr = [];

  //   if (editor?.isActive("bold")) {
  //     arr.push("bold");
  //   }

  //   if (editor?.isActive("italic")) {
  //     arr.push("italic");
  //   }

  //   if (arr.length === 0) {
  //     if (prev.length > 0) {
  //       return arr;
  //     } else {
  //       return prev;
  //     }
  //   }
  //   if (arr.length !== prev.length) {
  //     return arr;
  //   }

  //   const sameAsPrev = arr.reduce((acc, item) => {
  //     acc = prev.includes(item);
  //     return acc;
  //   }, true);

  //   if (sameAsPrev) {
  //     return prev;
  //   } else {
  //     return arr;
  //   }
  // });
  // });

  console.log({
    a: editor?.can().liftListItem("listItem"),
    b: editor?.can().sinkListItem("listItem"),
  });

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        px: (t) => t.spacing(1),
        py: (t) => t.spacing(0.5),
        border: (theme) => `1px solid ${theme.palette.divider}`,
        flexWrap: "wrap",
      }}>
      <StyledToggleButtonGroup
        size="small"
        value={menuToggleButtonFormats}
        aria-label="text formatting">
        <ToggleButton
          onClick={onToggleBold}
          value={editor?.isActive("bold") ? "bold" : ""}
          aria-label="bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton
          value={editor?.isActive("italic") ? "italic" : ""}
          aria-label="italic"
          onClick={onToggleItalic}>
          <FormatItalicIcon />
        </ToggleButton>

        <Divider
          flexItem
          orientation="vertical"
          sx={{ mx: 0.5, my: 1 }}
        />

        <ToggleButton
          value={editor?.can().liftListItem("listItem") ? "" : "outdent"}
          disabled={!editor?.can().liftListItem("listItem")}
          aria-label="Outdent"
          onClick={onToggleOutdent}>
          <FormatIndentDecreaseIcon />
        </ToggleButton>

        <ToggleButton
          value={editor?.can().sinkListItem("listItem") ? "" : "indent"}
          disabled={!editor?.can().sinkListItem("listItem")}
          aria-label="Indent"
          onClick={onToggleIndent}>
          <FormatIndentIncreaseIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>

      <StyledToggleButtonGroup
        value={splitter}
        onChange={handleSplitter}
        sx={{
          marginLeft: "auto",
        }}
        size="small"
        aria-label="text formatting">
        <ToggleButton
          onClick={onToggleSplit}
          value="split"
          aria-label="split content">
          <VerticalSplitIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
      {editor?.can().liftListItem("listItem") ? "nasim" : "siam"}
    </Paper>
  );
}
