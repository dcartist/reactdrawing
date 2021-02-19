import React, { Component } from 'react';
import { SliderPicker , GithubPicker, BlockPicker, HuePicker} from 'react-color';
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

{/* <SliderPicker {...this.props}
        onChange={this.handleChangeComplete}
        color={ this.state.background }
        pointer={this.Picker}/> */}

<GithubPicker width='100%'
					onChange={this.handleChangeComplete}
					color={ this.state.background }
					pointer={this.Picker}
					colors={['#000000', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#888888','#777777', '#666666', '#555555','#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']}
					 />

<SliderPicker {...this.props}
        onChange={this.handleChangeComplete}
        color={ this.state.background }
        pointer={this.Picker}/>

<div className="p-1" style={{
        width: "100%",
        height: "80px"
      }}>
    

<SliderPicker {...this.props}
        onChange={this.handleChangeComplete}
        color={ this.state.background }
        pointer={this.Picker}/></div>
        
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