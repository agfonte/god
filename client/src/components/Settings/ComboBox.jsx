import React from "react";
export default function ComboBox(props) {
  return (
    <select
      className={"form-control"}
      onClick={evt => {
        props.handleClickEvent(evt);
      }}
    >
      <option id="test-option">{props.default}</option>
      {props.matched.map(item => {
        if (typeof item === "string") {
          return <option key={item}>{item}</option>;
        } else {
          return (
            <option id={"test-" + item} key={item}>
              {item[0]}->{item[1]}
            </option>
          );
        }
      })}
    </select>
  );
}
