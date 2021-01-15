import React, { Component } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import saveFile from 'save-as-file';
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react';
const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem"
};


class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brushSize: 50,
    }
    this.canvas = React.createRef();
  }
  brushSizeChange(number) {
    this.canvas.current.eraseMode(false)
    this.setState({ brushSize: parseInt(number) })

  }
  render() {
    return (
      <div>

        <button className="mr-4" onClick={() => {
          this.canvas.current.clearCanvas()
        }}>CLEAR!</button>
        
        <button className="mr-4" onClick={() => {
          this.canvas.current.undo()
        }}>
          <Icon name='undo'/>
        </button>
        <button className="mr-4" onClick={() => {
          this.canvas.current.redo()
        }}>
          <Icon name='redo' />
        </button>
        <button className="mr-4" onClick={() => {
          this.canvas.current.eraseMode(true)
        }}>
          <Icon name='eraser' size="large" />
        </button>
        <button className="mr-4" onClick={() => {
          this.canvas.current.eraseMode(false)
        }}>
          
        <Icon name='pencil' size="large" /></button>
      
        <button onClick={() => this.brushSizeChange(100)} className="p-2 border-2 border-gray-400">100</button>
        <button onClick={() => this.brushSizeChange(50)} className="p-2 border-2 border-gray-400">50</button>
        <button onClick={() => this.brushSizeChange(10)} className="p-2 border-2 border-gray-400">10</button>
        <button onClick={() => this.brushSizeChange(5)} className="p-2 border-2 border-gray-400">5</button>
        <button onClick={() => this.brushSizeChange(1)} className="p-2 border-2 border-gray-400">1</button>

        <button
          className="ml-4"
          onClick={() => {
            this.canvas.current
              .exportSvg("svg")
              .then(data => {
                console.log(data);
                console.log(typeof (data));
                let file = new File([data], { type: 'image/svg+xml' });
                saveFile(file, 'drawing.svg');

              })
              .catch(e => {
                console.log(e);
              });
          }}
        >
          Save to SVG
            </button>

        <ReactSketchCanvas
          height="90vh"
          ref={this.canvas}
          strokeWidth={this.state.brushSize}
          strokeColor="black"
        />

        {/* <button className="p-2"
              onClick={() => {
                this.canvas.current
                  .exportImage("png")
                  .then(data => {
                    console.log(data);
                    console.log(typeof(data));
                    let file = new File(data, {type: 'image/png'});
saveFile(file, 'drawing.png');

                  })
                  .catch(e => {
                    console.log(e);
                  });
              }}
            >
              Get Png
            </button> */}
      </div>
    );
  }


}

export default Canvas;