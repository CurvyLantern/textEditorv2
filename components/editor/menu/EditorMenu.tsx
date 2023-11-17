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
  const [formats, setFormats] = React.useState(() => ["italic"]);
  const [splitter, setSplitter] = React.useState(() => ["split"]);
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats);
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
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting">
        <ToggleButton
          onClick={onToggleBold}
          value="bold"
          aria-label="bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton
          value="italic"
          aria-label="italic"
          onClick={onToggleItalic}>
          <FormatItalicIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider
        flexItem
        orientation="vertical"
        sx={{ mx: 0.5, my: 1 }}
      />
      <StyledToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment">
        <ToggleButton
          value="right"
          aria-label="right aligned"
          onClick={onToggleIndent}>
          <FormatAlignRightIcon />
        </ToggleButton>
        <ToggleButton
          value="left"
          aria-label="left aligned"
          onClick={onToggleOutdent}>
          <FormatAlignLeftIcon />
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
    </Paper>
  );
}
