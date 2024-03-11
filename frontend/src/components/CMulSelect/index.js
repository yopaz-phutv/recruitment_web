import "./style.css";
import clsx from "clsx";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FaCheck } from "react-icons/fa";

const CustomToggle = React.forwardRef(
  ({ children, className, onClick }, ref) => (
    <div
      ref={ref}
      className={clsx("form-select", className)}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  )
);
export default function CMulSelect({ items, defaultText, setOutput }) {
  const [options, setOptions] = useState(items);
  const [curOptions, setCurOptions] = useState([]);

  const handleSelect = (option, index) => {
    let tempOptions = [...options];
    let tempCurOptions = [...curOptions];

    // update options:
    tempOptions[index].select = !tempOptions[index].select;
    setOptions(tempOptions);
    // update curOptions:
    let ind = tempCurOptions.findIndex((item) => item.id === option.id);
    if (ind < 0) {
      tempCurOptions.push(option);
    } else {
      tempCurOptions.splice(ind, 1);
    }
    setCurOptions(tempCurOptions);
    // update output:
    let tempOutput = tempCurOptions.map((item) => item.value);
    setOutput(tempOutput);
  };

  //   useEffect(() => {
  //     let temp = [];
  //     items?.forEach((item, index) => {
  //       temp.push({
  //         id: index,
  //         text: item[textAtt],
  //         value: item[valueAtt],
  //         select: false,
  //       });
  //     });
  //     setOptions(temp);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [items]);

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} className="trigger">
        {curOptions.length > 0
          ? curOptions.map((item, index) => (
              <span key={`curOption_${index}`}>
                {item.text}
                {index < curOptions.length - 1 && ", "}
              </span>
            ))
          : defaultText}
      </Dropdown.Toggle>
      <Dropdown.Menu className="py-0">
        {options?.map((option, index) => (
          <div
            key={`option_${index}`}
            className={clsx(
              "d-flex align-items-center ps-2 pointer hover-bg-primary hover-text-white",
              option.select && "text-primary"
            )}
            onClick={() => handleSelect(option, index)}
          >
            <span>{option.text}</span>
            {option.select && <FaCheck className="ts-sm ms-auto me-1" />}
          </div>
        ))}
        {/* <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
}
