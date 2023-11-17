import * as RadixAccordion from "@radix-ui/react-accordion";
import { IconChevronCompactUp, IconChevronUp } from "@tabler/icons-react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Chip, Stack } from "@mui/material";
import { TProcessedNodeObj } from "@/pages";

export const StyledAccordion = styled((props: AccordionProps) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    square
    {...props}
  />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
export const StyledAccordionSummary = styled(
  (props: AccordionSummaryProps & { showIcon: boolean }) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ),
  {
    shouldForwardProp: (prop: string) => prop !== "showIcon",
  }
)(({ theme, showIcon }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper": {
    display: showIcon ? "block" : "none",
    "&.Mui-expanded": {
      transform: "rotate(90deg)",
    },
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    gap: "1rem",
    alignItems: "center",

    "& .MuiTypography-subtitle2": {
      color: theme.palette.grey[500],
      display: "flex",
      alignItems: "center",
    },
  },
}));

export const StyledAccordionDetails = styled(MuiAccordionDetails)(
  ({ theme }) => ({
    // padding: theme.spacing(2),
    // padding: 0,
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  })
);

// type Content = {
//   title: string;
//   type: string;
//   items: Content[];
//   description?: string;
// };

type Content = TProcessedNodeObj;

// export const AccordionGroup = ({
//   item,
//   children,
// }: {
//   item: Content;
//   children: React.ReactNode;
// }) => {
//   if (item.type === "item") {
//     return <AccordionItem item={item}>{children}</AccordionItem>;
//   }
//   if (item.type === "group") {
//     return (
//       <AccordionItem item={item}>
//         <Accordion contents={item.items} />
//       </AccordionItem>
//     );
//   }
//   return null;
// };

// export const AccordionItem = ({
//   item,
//   children,
// }: {
//   item: Content;
//   children: React.ReactNode;
// }) => {
//   return (
//     <StyledAccordion>
//       <StyledAccordionSummary>
//         {item.title} {item.type}
//       </StyledAccordionSummary>
//       <StyledAccordionDetails>
//         <Typography>{item.description ? item.description : ""}</Typography>
//         <div>{children}</div>
//       </StyledAccordionDetails>
//     </StyledAccordion>
//   );
// };

export const Accordion = ({ contents }: { contents: Content[] | null }) => {
  if (!contents || !Array.isArray(contents)) return null;
  if (contents.length <= 0) {
    return (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}>
        <Typography>
          Write your content in the editor and it will be shown here.
        </Typography>
      </Stack>
    );
  }
  const Item = contents.map((item, itemIdx) => {
    if (item) {
      const isTypeItem = item.type === "item";
      const hasDescription =
        isTypeItem &&
        Boolean(item.description) &&
        typeof item.description === "string";
      return (
        // <AccordionGroup
        //   item={item}
        //   key={JSON.stringify(item)}>
        //   {null}
        // </AccordionGroup>
        <StyledAccordion key={itemIdx}>
          <StyledAccordionSummary
            showIcon={item.type === "group" || hasDescription}>
            <Typography variant="body1">{item.title}</Typography>
            {item.meta.infos.length > 0 ? (
              <Typography variant="subtitle2">
                {item.meta.infos.join(",")}
              </Typography>
            ) : null}
            {/* <Chip
              label={item.type}
              color="primary"
              size="small"
            /> */}
          </StyledAccordionSummary>
          {hasDescription ? (
            <StyledAccordionDetails>
              <Typography
                component={"p"}
                dangerouslySetInnerHTML={{
                  __html: item.description ? item.description : "",
                }}
                sx={{
                  whiteSpace: "pre",
                }}
              />
            </StyledAccordionDetails>
          ) : null}

          {item.type === "group" && item.items.length > 0 ? (
            <StyledAccordionDetails>
              <div>
                <Accordion contents={item.items} />
              </div>
            </StyledAccordionDetails>
          ) : null}
        </StyledAccordion>
      );
    }
    return null;
  });
  return <div>{Item}</div>;
};
