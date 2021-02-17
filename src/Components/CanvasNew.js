import { Icon,  Button, Popup } from 'semantic-ui-react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { HexColorPicker } from 'react-colorful';
import Slider from '@material-ui/core/Slider';
import 'semantic-ui-css/semantic.min.css';
import React, { useState } from 'react';
import saveFile from 'save-as-file';
import axios from 'axios';

const useStyles = makeStyles({
	root: {
	  width: 200,
	  color: '#333333',
height: 8,
	},
  });

  const PrettoSlider = withStyles({
	root: {
	  color: '#333333',
	  height: 8,
	},
	thumb: {
	  height: 25,
	  width: 25,
	  backgroundColor: '#fff',
	  border: '2px solid currentColor',
	  marginTop: -8,
	  marginLeft: -12,
	  '&:focus, &:hover, &$active': {
		boxShadow: 'inherit',
	  },
	},
	active: {},
	valueLabel: {
	  left: 'calc(-50% + 4px)',
	},
	track: {
	  height: 5,
	  borderRadius: 4,
	},
	rail: {
	  height: 5,
	  borderRadius: 4,
	},
  })(Slider);

export default function CanvasNew() {

  const classes = useStyles();  
  const handleChange = (event, newValue) => {
	  setValue(newValue);
	};
	const [value, setValue] = React.useState(30);
    const [color, setcolor] = useState('black')
    const canvas = React.createRef()
    const [eventsEnabled, setEventsEnabled] = React.useState(true)
    const [open, setOpen] = React.useState(false)

    function posttingArtwork(art, paths) {
		axios
			.post(`${process.env.REACT_APP_API_POST}`, { art: art, paths: paths })
			.then((res) => {
				console.log('');
			})
			.catch((err) => console.log(err));
	}

   
      
    return (
        <div>
					

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
									posttingArtwork(art, paths);
								})
								.catch((e) => {
									console.log(e);
								});
						}}
					>
						<Icon name="save" />
					</button>
					<PrettoSlider valueLabelDisplay="auto" value={value} onChange={handleChange} defaultValue={20} aria-label="pretto slider"  />
            <ReactSketchCanvas
					height="80vh"
					ref={canvas}
					strokeWidth={value}
					strokeColor={color}
				/>

        </div>
    )
}
