import { useEffect, useContext, useState } from "react";
import { AppContext } from '../../context/CreateAppContext';
import { useParams } from 'react-router-dom';
import { Grid, Button, Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import AddPreOrderButton from '../buttons/AddPreOrderButton';
import UpdatePatchInfoButton from "../buttons/UpdatePatchInfo";
import ReOrderPatchesButton from "../buttons/ReOrderPatches";

const SinglePatchpage = ({ getPatches, getPatch, preOrder, patches, netIncome, getNet}) => {
  const params = useParams();
  const patchId = params.patchId;
  const { Item, patch } = useContext(AppContext);
  const [render, setRender] = useState(0);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [reOrder, setReOrder] = useState(false);

  const handleModal = () => setOpen(!open);
  const handleUpdate = () => setUpdate(!update);
  const handleReOrder = () => setReOrder(!reOrder);

  useEffect(() => {
    getPatch(patchId);
    getNet(patchId);
    getPatches()
  }, []);

  useEffect(() => {
    getPatch(patchId);
    getNet(patchId);
    getPatches()
  }, [render]);

  const handleCheck = (event) => {
    // let target = event.target.value
    console.log("Checked Member id", event.target.value)
    // target = !event ? true : false
    // console.log(id)
    // console.log(target)
    // patch(`/1rops/preorder/${id}`, {picked_up: target})
    setRender(render + 1);
  }
  let check;
  if (preOrder !== null) {
      for(let i = 0; i < preOrder.preOrders.length; i++) {
          check = preOrder.preOrders[i].picked_up ? 
            <FormControlLabel control={<Checkbox value={preOrder.preOrders[i].id} onChange={(event) => handleCheck(event)} defaultChecked/>} label="Picked up?" />
        :   <FormControlLabel control={<Checkbox value={preOrder.preOrders[i].id} onChange={(event) => handleCheck(event)}/>} label="Picked up?" />
      }
  }
  console.log(preOrder)
  let preorders = preOrder !== null && preOrder.preOrders.length > 0 ? 
  preOrder.preOrders.map(preOrder => {
      return (
        <Grid forceUpdate item xs={6}>
          <Item>
            <h3>{preOrder.name}</h3>
            <h3>Amount: {preOrder.amount}</h3>
            <h3>Notes: {preOrder.notes}</h3>
            {check}<br/>
            <Button variant='outlined'>Update</Button>
          </Item>
        </Grid>
      )
    })
    :   <Grid item>
          <Typography variant='h4'>No Pre-Orders Found</Typography> <br/>
        </Grid>

    let patchData = undefined;
    if(patches !== null ) {
        for(let i = 0; i < patches.length; i++) {
            if(patches[i].id == patchId) {
                patchData = patches[i];
            }
        }
    }

    patchData = patchData !== undefined && netIncome !== null ? 
    <Grid item xs={10}>
      <Item>
        <h3>{patchData.patchName}</h3>
        <h3>Amount Ordered: {patchData.amount_ordered} patches</h3>
        <h3>Amount Sold: {patchData.amount_sold} patches</h3> 
        <h3>Income: ${patchData.income}</h3>
        <h3>Net Income: ${netIncome.total}</h3>
        <Grid container>
          <Grid item xs={2}/>
          <Grid item xs={4}>
            <ReOrderPatchesButton open={reOrder} handleReOrder={handleReOrder} getPatch={getPatch} render={render} reRender={setRender} id={patchId} />
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={2}>
            <UpdatePatchInfoButton open={update} handleUpdate={handleUpdate} render={render} reRender={setRender} id={patchId} />
          </Grid>
        </Grid>
      </Item>
    </Grid>
    : <h3>No Patch Data Found</h3>

  return(
    <Box display='flex'>
      <Grid container spacing={2} style={{width: '60%'}}>
        <Grid item xs={1}/>
        {patchData}
      </Grid>
      <Grid container spacing={2} style={{width: '40%'}}>
        {preorders}
        <Grid item>
          <AddPreOrderButton render={render} reRender={setRender} getPatch={getPatch} id={patchId} handleModal={handleModal} open={open} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SinglePatchpage;