import { HexColorPicker } from "react-colorful";
import React, { useState } from "react";
import "react-colorful/dist/index.css";

export default function Picker(props){
    const [color, setColor] = useState("#aabbcc");
    return (<HexColorPicker className="z-10" color={color} onChange={setColor} />)
}
