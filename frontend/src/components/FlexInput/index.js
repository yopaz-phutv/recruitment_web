import clsx from "clsx";
import { useEffect } from "react";

const FlexInput = ({
  className,
  innerClassName,
  iconLeft,
  iconRight,
  cvStyle = true,
  setCurrent,
  ...props
}) => {
  const handleChange = (e) => {
    setCurrent(e.target.value)
  };

  useEffect(() => {
    const tx = document.querySelectorAll("textarea.autoresize");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute("style", "height:" + tx[i].scrollHeight + "px;");
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      this.style.height = 0;
      this.style.height = this.scrollHeight + "px";
    }
  }, []);

  return (
    <div className={clsx("d-flex gap-1 align-items-center z-index-1", className)}>
      <div className="text-main">{iconLeft || null}</div>
      <textarea
        className={clsx(
          "autoresize resize-none overflow-hidden w-100",
          cvStyle && "cv-input",
          innerClassName
        )}
        onChange={handleChange}
        rows={1}
        {...props}
      />
      <div className="text-main">{iconRight || null}</div>
    </div>
  );
};

export default FlexInput;
