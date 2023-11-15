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
export const StyledAccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

export const StyledAccordionDetails = styled(MuiAccordionDetails)(
  ({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  })
);

type Content = {
  title: string;
  type: string;
  items: Content[];
  description?: string;
};

export const AccordionGroup = ({
  item,
  children,
}: {
  item: Content;
  children: React.ReactNode;
}) => {
  if (item.type === "item") {
    return <AccordionItem item={item}>{children}</AccordionItem>;
  }
  if (item.type === "group") {
    return (
      <AccordionItem item={item}>
        <Accordion contents={item.items} />
      </AccordionItem>
    );
  }
  return null;
};

export const AccordionItem = ({
  item,
  children,
}: {
  item: Content;
  children: React.ReactNode;
}) => {
  return (
    <StyledAccordion>
      <StyledAccordionSummary>
        {item.title} {item.type}
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Typography>{item.description ? item.description : ""}</Typography>
        <div>{children}</div>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export const Accordion = ({ contents }: { contents: Content[] }) => {
  if (!contents || !Array.isArray(contents)) return null;
  const Item = contents.map((item, itemIdx) => {
    if (item) {
      return (
        // <AccordionGroup
        //   item={item}
        //   key={JSON.stringify(item)}>
        //   {null}
        // </AccordionGroup>
        <StyledAccordion key={itemIdx}>
          <StyledAccordionSummary>
            {item.title} {item.type}
          </StyledAccordionSummary>
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
            {item.items.length > 0 ? (
              <div>
                <Accordion contents={item.items} />
              </div>
            ) : null}
          </StyledAccordionDetails>
        </StyledAccordion>
      );
    }
    return null;
  });
  return <div>{Item}</div>;
};
