import React from "react";

export default function SettingsButton(props) {
  return (
    <input
      type={"image"}
      id={"settings-img"}
      src={"./settings-4.png"}
      alt={"Settings icon"}
      style={{ height: "40px", width: "40px", background: "transparent" }}
      onClick={props.handleSettingsClick}
    />
  );
}
