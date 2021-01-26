import React from 'react'
import axios from 'axios'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function DeleteArtwork(props) {
  const [open, setOpen] = React.useState(false)
  function trying (){
console.log(props)
console.log("this should work")
axios.delete(`${process.env.REACT_APP_API_DELETE_ID}${props.id}`)
        .then(res => {
          console.log(res);
          console.log(res.data);
          window.location.reload(false);
          setOpen(false)
        })
}
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<button className="border-black m-2 border p-2"> <Icon name="trash"></Icon></button>}
    >
        <Modal.Header>Are you sure you want to delete?</Modal.Header>
     
      <Modal.Actions>
        <Button color='green' onClick={() => trying()}>
        
          <Icon name='checkmark' /> YES!!
        </Button>
        <Button color='grey'  onClick={() => setOpen(false)}>
           Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteArtwork