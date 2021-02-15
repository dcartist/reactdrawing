import { Icon,  Button, Popup } from 'semantic-ui-react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { Slider } from "react-semantic-ui-range";
import { HexColorPicker } from 'react-colorful';
import 'semantic-ui-css/semantic.min.css';
import React, { useState } from 'react';
import saveFile from 'save-as-file';
import axios from 'axios';


export default function CanvasNew() {
    const [brushSize, setbrushSize] = useState(50)
    const [color, setcolor] = useState('black')
    const canvas = React.createRef()
    const [eventsEnabled, setEventsEnabled] = React.useState(true)
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = useState(5);
    function posttingArtwork(art, paths) {
		axios
			.post(`${process.env.REACT_APP_API_POST}`, { art: art, paths: paths })
			.then((res) => {
				console.log('');
			})
			.catch((err) => console.log(err));
	}

   
    const styles ={
        height: "40px",
        inner: "40px",
        track: { top: "19px" },
        trackFill: { top: "19px" },
        thumb: {
          backgroundColor: "purple",
          width: "40px",
          height: "40px"
        }
      }

    const settings = {
        start: 2,
        min: 1,
        max: 100,
        step: 1,
        onChange: value => {
          setValue(value);
        }
      };

  const handleValueChange = e => {
    let value = parseInt(e.target.value);
    if (!value) {
      value = 0;
    }
    setValue(e.target.value);
  };


    // function handleChange(value)  {
    //     setvalue(value)
    //   }
    
    //  function handleChangeReverse(value) {
    //     setreverseValue(value)
    //   }
      
    return (
        <div>
 <Slider value={value} color="red" 
 
 settings={settings} />
             <Popup
    content={
      <>
      <HexColorPicker color={color} onChange={setcolor} />
        <button onClick={() => setOpen(false)}>Close</button>
      </>
    }
    eventsEnabled={eventsEnabled}
          on='click'
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
    popper={{ id: 'popper-container', style: { zIndex: 2000 } }}
    trigger={<Button style={{backgroundColor:color}} className="p-10 h-10 w-10"></Button>}
  />
            

            <button
						className="mr-2 disable-select"
						onClick={() => {
							canvas.current.resetCanvas();
						}}
					>
						New Canvas
					</button>
					<button
						className="mr-2 disable-select"
						onClick={() => {
							canvas.current.clearCanvas();
						}}
					>
						CLEAR!
					</button>

					<button
						className="mr-4 disable-select"
						onClick={() => {
							canvas.current.undo();
						}}
					>
						<Icon name="undo" />
					</button>
					<button
						className="mr-4 disable-select"
						onClick={() => {
							canvas.current.redo();
						}}
					>
						<Icon name="redo" />
					</button>
            <button
						className="ml-4 disable-select border p-2 border-black"
						onClick={() => {
                            console.log(canvas.current)
							canvas.current
								.exportSvg('svg')
								.then((data) => {
									let file = new File([data], { type: 'image/svg+xml' });
									let stringedSVG = JSON.stringify(data)
									saveFile(file, 'drawing.svg');
								})
								.catch((e) => {
									console.log(e);
								});
						}}
					>
						<Icon name="download" />
					</button>

					<button
						className="ml-4 disable-select border p-2 border-black"
						onClick={() => {
							let paths = [];
							let art = '';
							canvas.current
								.exportPaths()
								.then((data) => {
									console.log(data);
									console.log(typeof data);
									paths = data;
								})
								.then(
									canvas.current.exportSvg('svg').then((data) => {
										let stringedSVG = JSON.stringify(data);
										art = stringedSVG;
									})
								)
								.then((data) => {
									this.posttingArtwork(art, paths);
								})
								.catch((e) => {
									console.log(e);
								});
						}}
					>
						<Icon name="save" />
					</button>

            <ReactSketchCanvas
					height="80vh"
					ref={canvas}
					strokeWidth={brushSize}
					strokeColor={color}
				/>

        </div>
    )
}
