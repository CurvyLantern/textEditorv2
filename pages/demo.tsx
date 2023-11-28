import BASE_JSON from "../data.js";

let json = BASE_JSON.map((b) => {
  const obj: typeof b & {
    checked: boolean;
    items: any[];
  } = {
    ...b,
    checked: false,
    items: [],
  };
  return obj;
});

const tempArr: any[] = [];
for (let i = 0; i < json.length; i++) {
  const elem = json[i];
  if (elem.checked) continue;

  for (let j = i + 1; j < json.length; j++) {
    const child = json[j];
    if (child.checked) continue;
    const elemId = elem._id;
    const childParentId = child.parent;
    if (childParentId === elemId) {
      elem.items.push(child);
      child.checked = true;
    }
  }
  tempArr.push(elem);
  elem.checked = true;
}

console.log(tempArr.every((r) => r.checked));

const DemoPage = () => {
  console.log(tempArr);

  return (
    <div>
      <pre>
        <code>
          <small>{JSON.stringify(tempArr, null, 2)}</small>
        </code>
      </pre>
    </div>
  );
};

export default DemoPage;
