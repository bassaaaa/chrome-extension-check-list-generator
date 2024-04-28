import { ListMenu } from "./components/ListMenu";
import { CopyButton } from "./components/CopyButton";
import { Textarea } from "./components/Textarea";
import { useState } from "react";
import { checkList } from "./data/checkList";
import { ToggleWithLabel } from "./components/ToggleWithLabel";
import { Modal } from "./components/Modal";
import { SelectBox } from "./components/SelectBox";

export const App = () => {
  const [text, setText] = useState(checkList.outputText);
  const [checkedItems, setCheckedItems] = useState<{ [id: number]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);

  const handleCopy: () => void = () => {
    try {
      navigator.clipboard.writeText(text).then(() => {
        const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
        modal.showModal();
      });
    } catch (error) {
      console.error("コピーに失敗しました: ", error);
    }
  };

  const handleCheckboxChange = (key: number, checked: boolean) => {
    setCheckedItems((prevState) => {
      const updatedItems = { ...prevState, [key]: checked };
      const checkedLabels = Object.keys(updatedItems)
        .filter((key) => updatedItems[parseInt(key)])
        .map((key) => checkList.categories[selectedCategory].items[parseInt(key)].label);
      const outputText = checkList.outputText + "\n" + checkedLabels.map((label) => `${checkList.confirmedStatus}: ${label}`).join("\n");
      setText(outputText);
      return updatedItems;
    });
  };

  const handleSelectBoxChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex - 1;
    setCheckedItems({});
    setText(checkList.outputText);
    setSelectedCategory(selectedIndex);
  };

  return (
    <div className="p-2 w-96 flex flex-col gap-2 m-auto">
      <ListMenu title={checkList.checkListTitle}>
        <SelectBox onChange={handleSelectBoxChange} />
        {selectedCategory < 0 ? (
          <></>
        ) : (
          checkList.categories[selectedCategory].items.map((item, key) => (
            <li key={item.label}>
              <ToggleWithLabel {...item} checked={checkedItems[key] || false} onChange={(e) => handleCheckboxChange(key, e.target.checked)} />
            </li>
          ))
        )}
      </ListMenu>
      <Textarea id="textarea" value={text} onChange={(e) => setText(e.target.value)} />
      <CopyButton onClick={handleCopy} disabled={text === ""} />
      <Modal text={text} />
    </div>
  );
};
