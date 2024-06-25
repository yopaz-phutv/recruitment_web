import { useState } from "react";
import clsx from "clsx";

export default function TagInput({
  className,
  maxTag = 20,
  listWord = [],
  setListWord,
  placeholder,
  size,
}) {
  const [curWord, setCurWord] = useState([]);
  const [showMaxTagMsg, setShowMaxTagMsg] = useState(false);

  const displayMaxTagError = () => {
    setShowMaxTagMsg(true);
    setTimeout(() => {
      setShowMaxTagMsg(false);
    }, 2000);
  };

  const handleEnter = (key) => {
    if (key === "Enter") {
      if (listWord.length === maxTag) {
        displayMaxTagError();
      } else {
        const listTemp = [...listWord];
        if (curWord.includes(",")) {
          let wordArr = curWord.split(",");
          if (listWord.length + wordArr.length > maxTag) displayMaxTagError();
          let possibleTagNum = maxTag - listWord.length;
          if (possibleTagNum > 0) {
            wordArr = wordArr.slice(0, possibleTagNum);
            wordArr.forEach((word) => {
              listTemp.push(word.trim());
            });
          }
        } else listTemp.push(curWord);
        setListWord(listTemp);
      }
      document.getElementById("tag-input-part").value = "";
    }
  };
  const handleRemoveTag = (index) => {
    let listTemp = [...listWord];
    listTemp.splice(index, 1);
    setListWord(listTemp);
  };

  return (
    <div
      className={clsx(
        "form-control d-flex gap-2 flex-wrap",
        size === "sm" && "form-control-sm",
        className
      )}
    >
      {listWord.length > 0 &&
        listWord.map((item, index) => (
          <div key={index} className="border ps-2 pe-3 position-relative">
            <div>{item}</div>
            <div
              className="position-absolute ts-xxs fw-bold pointer"
              style={{ top: "-3.5px", right: "2px" }}
              onClick={() => handleRemoveTag(index)}
            >
              x
            </div>
          </div>
        ))}
      <div className="position-relative flex-fill">
        <input
          id="tag-input-part"
          type="text"
          className="border-0 w-100"
          style={{ width: "180px", outline: "none" }}
          placeholder={listWord.length === 0 ? placeholder : null}
          onChange={(e) => setCurWord(e.target.value)}
          onKeyDown={(e) => handleEnter(e.key)}
        />
        {showMaxTagMsg && (
          <div className="position-absolute bg-light px-2 ts-smd text-danger shadow-sm">
            Số tag tối đa có thể nhập là {maxTag}
          </div>
        )}
      </div>
    </div>
  );
}
