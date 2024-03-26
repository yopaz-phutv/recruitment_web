import clsx from "clsx";
import React, { useEffect } from "react";

const FlexInput = React.forwardRef(
  (
    {
      className,
      innerClassName,
      iconLeft,
      iconRight,
      cvStyle = true,
      disabled = false,
      setCurrent,
      onChange,
      style,
      innerStyle,
      ...props
    },
    ref
  ) => {
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
      <div
        className={clsx("d-flex gap-1 align-items-start z-index-1", className)}
        style={style}
      >
        <div className="cv-text-main">{iconLeft || null}</div>
        <textarea
          className={clsx(
            "autoresize resize-none overflow-hidden w-100",
            cvStyle && "cv-input",
            disabled && "remove-cvinput-hover",
            innerClassName
          )}
          style={innerStyle}
          rows={1}
          onChange={(e) => {
            if (setCurrent) setCurrent(e.target.value);
            else onChange(e);
          }}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <div className="text-main">{iconRight || null}</div>
      </div>
    );
  }
);

export default FlexInput;
