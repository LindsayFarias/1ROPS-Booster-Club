import { useEffect, useContext, useState } from "react";
import { AppContext } from '../../context/CreateAppContext';
import { useParams } from 'react-router-dom';
import { FormControl, Grid, IconButton, Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import AddPreOrderButton from '../buttons/AddPreOrderButton';
import UpdatePatchInfoButton from "../buttons/UpdatePatchInfo";
import ReOrderPatchesButton from "../buttons/ReOrderPatches";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

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

  const handleCheck = async (event) => {
    let target = event.target.value;
    let currentStatus = preOrder.preOrders.filter(order => order.id == target); 
    currentStatus = currentStatus[0].picked_up;
    currentStatus = !currentStatus;
    await patch(`/1rops/preorder/${target}`, {picked_up: currentStatus});
  };

  const handleUp = async (id) => {
    console.log(id)
    let amount = 0;
    amount = preOrder.preOrders.filter(order => order.id == id);
    console.log('Amount', amount)
    amount = amount[0].amount;
    amount += 1
    console.log('Amount', amount)
    await patch(`/1rops/preorder/${id}`, {amount: amount});
    setRender(render + 1)
  };

  const handleDown = async (id) => {
    let amount = 0; 
    amount = preOrder.preOrders.filter(order => order.id == id);
    amount = amount[0].amount;
    amount -= 1
    await patch(`/1rops/preorder/${id}`, {amount: amount});
    setRender(render + 1)
  };

  const checkForPickedUp = (id, status) => {
    return status === true ? 
            <FormControlLabel 
              color='secondary'
              value={id} 
              onChange={(event) => handleCheck(event)} 
              label="Picked up?"
              control={<Checkbox color='secondary' defaultChecked />} />
        :   <FormControlLabel 
              value={id} 
              color='secondary'
              onChange={(event) => handleCheck(event)} 
              label="Picked up?"
              control={<Checkbox color='secondary' />} />
    }

  let preorders = preOrder !== null && preOrder.preOrders.length > 0 ? 
  preOrder.preOrders.map(preOrder => {
      return (
        <Grid item xs={6}>
          <Item>
            <h3>{preOrder.name}</h3>
            <h3>Amount: {preOrder.amount}
              <IconButton onClick={(event) => handleDown(preOrder.id)}>
                <ArrowDropDownIcon color='secondary'/>
              </IconButton>
              <IconButton onClick={(event) => handleUp(preOrder.id)}>
                <ArrowDropUpIcon color='secondary'/>
              </IconButton>
            </h3>
            <h3>Notes: {preOrder.notes}</h3>
            <FormControl>
              {checkForPickedUp(preOrder.id, preOrder.picked_up)}
            </FormControl>
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
    };

    let totalPre = 0;
    if(preOrder !== null && preOrder.preOrders.length > 0) preOrder.preOrders.forEach(order => totalPre += order.amount)
    console.log('total', totalPre);

    patchData = patchData !== undefined && netIncome !== null ? 
    <Grid item xs={10}>
      <Item>
        <h3>{patchData.patchName}</h3>
        <h3>Amount Ordered: {patchData.amount_ordered} patches</h3>
        <h3>Amount Sold: {patchData.amount_sold} patches</h3> 
        <h3>Income: ${netIncome.income}</h3>
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
        <Grid item xs={12}>
          <Typography variant='h6'>
            Total Pre-orders: {totalPre}
          </Typography>
        </Grid>
        {preorders}
        <Grid item>
          <AddPreOrderButton render={render} reRender={setRender} getPatch={getPatch} id={patchId} handleModal={handleModal} open={open} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SinglePatchpage;