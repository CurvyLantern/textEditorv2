import { Accordion } from "@/components/ui/Accordion";

import data from "../data";
import BaseEditor from "@/components/editor/BaseEditor";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
const tempData = data.map((d) => ({ ...d, items: [] as any[] }));

const createTree = (
  data = tempData,
  parentKey: null | string = null,
  results: any[] = []
) => {
  for (let i = 0; i < data.length; i++) {
    const parentNode = data[i];

    if (parentKey === null || (parentKey && parentKey === parentNode.parent)) {
      results.push(parentNode);
      data.splice(i, 1);
      i = i - 1;
      const items = createTree(data, parentNode._id, parentNode.items);
    }
  }

  return results;
};

console.clear();
console.log("wow", createTree());

const createDataTree = (dataset = tempData) => {
  const hashTable = Object.create(null);
  dataset.forEach(
    (aData) => (hashTable[aData._id] = { ...aData, childNodes: [] })
  );
  const dataTree: any[] = [];
  dataset.forEach((aData) => {
    if (aData.parent)
      hashTable[aData.parent].childNodes.push(hashTable[aData._id]);
    else dataTree.push(hashTable[aData._id]);
  });
  return dataTree;
};

const temp = createDataTree(tempData);
// console.log(JSON.stringify(temp, null, 2));
// console.clear();
// console.log(temp, "temp");

const flashCardData = {
  _id: "53ypCDZvzyekLgzkR",
  content: {
    de: [
      {
        content: "Diagnostik",
        extended: null,
        timestamp: 1592222449,
        user: "5cfbf24a7b1260d8a3446fc7",
      },
    ],
  },
  order: 4,
  parent: "cXFgEyZ3LckStAYo8",
  main: "cXFgEyZ3LckStAYo8",
  type: "group",
  context: "default",
  reference: ["noReferenceNeeded"],
  childNodes: [
    {
      _id: "6RD6ZdFF8AmnPmvx8",
      content: {
        de: [
          {
            content: "Sono-Schädel bei V.a. IVH",
            extended: null,
            timestamp: 1592223497,
            user: "5cfbf24a7b1260d8a3446fc7",
          },
        ],
      },
      order: 4,
      parent: "53ypCDZvzyekLgzkR",
      main: "cXFgEyZ3LckStAYo8",
      type: "item",
      context: "default",
      reference: ["noReferenceNeeded"],
      childNodes: [],
    },
    {
      _id: "EjmCQBDKxxCCmuaie",
      content: {
        de: [
          {
            content:
              "Labor: BB, BGA, BZ, CRP, IL-6, BK bei V.a. Infektion oder metabolische Störung",
            extended: null,
            timestamp: 1592223523,
            user: "5cfbf24a7b1260d8a3446fc7",
          },
        ],
      },
      order: 3,
      parent: "53ypCDZvzyekLgzkR",
      main: "cXFgEyZ3LckStAYo8",
      type: "item",
      context: "default",
      reference: ["noReferenceNeeded"],
      childNodes: [],
    },
    {
      _id: "N3brXFdcQLafKjZkE",
      content: {
        de: [
          {
            content: "Trinkmengen und Medikamente überprüfen",
            extended: null,
            timestamp: 1589349338,
            user: "5cfbf24a7b1260d8a3446fc7",
          },
        ],
      },
      order: 1,
      parent: "53ypCDZvzyekLgzkR",
      main: "cXFgEyZ3LckStAYo8",
      type: "item",
      context: "default",
      reference: ["noReferenceNeeded"],
      childNodes: [],
    },
    {
      _id: "bWNA9GccJ7WkCKgTi",
      content: {
        de: [
          {
            content:
              "Klinische Untersuchung: Durchgängigkeit der Atemwege? Auskultation der Lungen, seitengleiches Atemgeräusch? Giemen? Zeichen der Obstruktion?",
            extended: null,
            timestamp: 1589349351,
            user: "5cfbf24a7b1260d8a3446fc7",
          },
        ],
      },
      order: 2,
      parent: "53ypCDZvzyekLgzkR",
      main: "cXFgEyZ3LckStAYo8",
      type: "item",
      context: "default",
      reference: ["noReferenceNeeded"],
      childNodes: [],
    },
  ],
};

const dataTreeConverter = (arr: any[]) => {
  return arr.map((item) => {
    return objConverter(item);
  });
};

const objConverter = (obj: any) => {
  if (Array.isArray(obj) || !obj) return null;
  return {
    title: obj.content.de[0].content,
    // title: obj.title,
    description: "",
    context: obj.context,
    meta: {
      infos: [],
    },
    items: dataTreeConverter(obj.childNodes),
    type: obj.type,
  };
};

const test2 = objConverter(flashCardData);
// console.log(test2, " testing ");

const makeEditable = (obj: any) => {
  if (obj.type === "group") {
    const parent = document.createElement("div");
    const ul = document.createElement("ul");
    ul.classList.add("group");

    const li = document.createElement("li");
    li.classList.add("item");
    const p = document.createElement("p");
    p.innerHTML = obj.title;
    li.insertAdjacentElement("beforeend", p);
    ul.insertAdjacentElement("beforeend", li);

    const groupUL = document.createElement("ul");
    groupUL.classList.add("group");

    obj.items.forEach((item) => {
      if (item.type === "item") {
        const li = document.createElement("li");
        li.classList.add("item");
        const p = document.createElement("p");
        p.innerHTML = item.title;
        li.insertAdjacentElement("beforeend", p);
        groupUL.insertAdjacentElement("beforeend", li);
      } else if (item.type === "group") {
        const nestedUl = makeEditable(item);
        groupUL.innerHTML += nestedUl ?? "";
      }
    });

    ul.insertAdjacentElement("beforeend", groupUL);
    parent.insertAdjacentElement("beforeend", ul);
    return parent.innerHTML;
  }

  return null;
};

const TrialPage = () => {
  const [defaultContent, setDefaultContent] = useState("");
  useEffect(() => {
    const hello = makeEditable(test2);
    // console.log(hello, "hello");
    setDefaultContent(hello ?? "");
  }, []);
  return (
    <div>
      <Stack direction={"row"}>
        <BaseEditor defaultContent={defaultContent} />
        <Accordion contents={[test2]} />
      </Stack>
    </div>
  );
};

export default TrialPage;
