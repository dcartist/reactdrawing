import { HexColorPicker } from "react-colorful";
import React, { useState } from "react";
import "react-colorful/dist/index.css";

export default function Picker(){
    const [color, setColor] = useState("#aabbcc");
    return (<div>
        {color}
        <HexColorPicker color={color} onChange={setColor} />;
        </div>)
}
