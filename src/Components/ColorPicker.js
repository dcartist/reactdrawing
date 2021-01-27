import React, { Component } from 'react';
import { SliderPicker } from 'react-color';
var { Hue } = require('react-color/lib/components/common');

class ColorPicker extends Component {
    state = {
        background: '#fff',
      };

      handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
      };
    render() {
        const CustomPointer = {
            width: '20px',
            height: '30px'
        }
        return (
            <div>
                <SliderPicker 
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      />

<Hue
  pointer={ CustomPointer }
  onChange={ this.handleChange }
  direction={ 'horizontal'} />
            </div>
        );
    }
}

export default ColorPicker;