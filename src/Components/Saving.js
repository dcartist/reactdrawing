import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import saveFile from 'save-as-file';

function Saving(props) {
  const [open, setOpen] = React.useState(false)
  function savingSVG(){
      console.log(props.art)
      let convertedSVG = JSON.parse(props.art)
      let file = new File([convertedSVG], { type: 'image/svg+xml' });
    console.log(convertedSVG)
    saveFile(file, 'drawing.svg');
  }
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={ <button className="border-black m-2 border p-2"> <Icon name="download"></Icon></button>}
    >
      <Modal.Header>Save Artwork</Modal.Header>
      <Modal.Content>
        
        <Modal.Description >
            <div className="flex justify-center">
            <button className="p-7 w-3/6 text-white text-2xl shadow-xl m-2 bg-black" onClick={() => savingSVG()}>Save as SVG</button>
            </div>
            
       
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        
        <Button color='black' onClick={() => setOpen(false)}>
          close
        </Button>
       
      </Modal.Actions>
    </Modal>
  )
}

export default Saving