import React, { Component } from 'react';
import { SliderPicker , BlockPicker, HuePicker} from 'react-color';
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";

class ColorPicker extends Component {
    state = {
        background: '#fff',
      };

      handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
      };
       Picker = () => {
        return (
                <div
                style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    background: "rgba(255,255,255,0.2)",
                    border: "1px solid white",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                    boxSizing: "border-box"
                }}
                />
            );
        }
    render() {
        const CustomPointer = {
            width: '20px',
            height: '30px'
        }
        return (
            <div>
                <div
    style={{
        float: "left",
        width: "200px",
        height: "80px",
        position: "relative"
      }}
>

<SliderPicker {...this.props}
        onChange={this.handleChangeComplete}
        color={ this.state.background }
        pointer={this.Picker}/>
      {this.state.background}
</div>
                {/* <BlockPicker width={'200px'} onChangeComplete={ this.handleChangeComplete }/> */}
                {/* <SliderPicker 
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      /> */}


            </div>
        );
    }
}

export default ColorPicker;