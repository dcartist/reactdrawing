import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import "./styles.css";

export default function Hex() {
  const [color, setColor] = useState("#b32aa9");

  return (
    <div className="App">
      <HexColorPicker color={color} onChange={setColor} />

      <div className="value" style={{ borderLeftColor: color }}>
        Current color is {color}
      </div>

      <div className="buttons">
        <button onClick={() => setColor("#c6ad23")}>Choose gold</button>
        <button onClick={() => setColor("#556b2f")}>Choose green</button>
        <button onClick={() => setColor("#207bd7")}>Choose blue</button>
      </div>
    </div>
  );
}
