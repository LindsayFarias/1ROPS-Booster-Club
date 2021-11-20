import { useEffect, useContext } from "react";
import { AppContext } from '../../context/CreateAppContext';
import { Box, Grid } from '@mui/material';
import ReceiptButton from '../buttons/ReceiptButton';
import IncomeButton from '../buttons/IncomeButton';

const Treasurypage = ({money, getMoney, receipts, getReceipts}) => {
  const { Item } = useContext(AppContext);

  useEffect(() => {
    getMoney();
    getReceipts();
  }, []);
  
  let moneyTotal;
  if(money !== null) {
    moneyTotal = <h3>Total: ${money.total}</h3>
  } else {
    moneyTotal = <h3>Total: $0</h3>
  }

  let expenditures = 0;
  receipts.forEach(receipt => expenditures += receipt.expenditures)
  expenditures = <h3>Expenditures: ${expenditures}</h3>
  
  let receiptList;
  receiptList = receipts !== null ? 
  receipts.map(receipt => {
    return (
      <Grid item xs={3}>
        <Item>
          <h4>{receipt.reason}</h4>
          <h5>Date: {receipt.date}</h5>
          <h5>Expenditure: ${receipt.expenditures}</h5>
          <h5>Associated Member: {receipt.associated_member}</h5>
      </Item>
    </Grid>
    )})
  : <h3>No Receipts</h3>

  return(
    <Box>
      <h1>Treasury</h1>
      <Grid container maxWidth='xlg'>
        <Grid item xs={5}>
          <h2>Bank:</h2>
          {moneyTotal}
          {expenditures}
        </Grid>
        <Grid item xs={2}>
          <ReceiptButton />
          <IncomeButton />
        </Grid>
        <Grid item xs={5}>
          <h2>Receipts:</h2>
          <Grid container spacing={2}>
          {receiptList}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Treasurypage;