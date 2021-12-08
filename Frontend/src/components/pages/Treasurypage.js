import { useEffect, useContext, useState } from "react";
import { AppContext } from '../../context/CreateAppContext';
import { Box, Button, FormControl, TextField, Grid, Typography, Stack, FormControlLabel } from '@mui/material';
import ReceiptButton from '../buttons/ReceiptButton';
import IncomeButton from '../buttons/IncomeButton';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';

const style = {
  position: 'absolute',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  m: 2
};

const Treasurypage = ({money, getMoney, receipts, getReceipts}) => {
  const { Item, dateTimeConverter } = useContext(AppContext);
  const [start, setStartDate] = useState(null);
  const [end, setEndDate] = useState(new Date());
  const [periodExp, setPeriodExp] = useState(null);
  const [periodInc, setPeriodInc] = useState(null);
  const [filteredReceipts, setReceipts] = useState([]);
  const [receipt, setOpen] = useState(false);
  const [income, setIncome] = useState(false);

  const handleReceipt = () => setOpen(!receipt);
  const handleIncome = () => setIncome(!income);

  useEffect(() => {
    getMoney();
    getReceipts();
    setPeriodExp(null);
    setPeriodInc(null)
    setReceipts([]);
    setStartDate(null);
    setEndDate(new Date());
  }, []);

  useEffect(() => {
    let receiptArray = [];
    let receiptYear = [];
    let receiptMonth = [];
    let receiptDay = [];
    let incomeArray = [];
    let incomeYear = [];
    let incomeMonth = [];
    let incomeDay = [];
    let periodTotal = null;
    let incomeTotal = null;

    if (receipts !== null) {
      for(let i = 0; i < receipts.length; i++) {
        let year = receipts[i].date.slice(0, 4);
        year = parseInt(year, 10);
        if (
          year <= end.year &&
          year >= start.year 
        ) {
          receiptYear.push(receipts[i])
          for (let j = 0; j < receiptYear.length; j++) {
            let month = receiptYear[j].date.slice(5, 7);
            month = parseInt(month, 10);
            if(
              month <= end.month &&
              month >= start.month
            ) {
              receiptMonth.push(receiptYear[j])
              for (let k = 0; k < receiptMonth.length; k++) {
                let day = receiptMonth[k].date.slice(8, 10);
                day = parseInt(day);
                if(
                  day <= end.day &&
                  day >= start.day
                ){
                  receiptDay.push(receiptMonth[k]);
                } else if (
                  month > start.month &&
                  day < start.day
                ) {
                  receiptDay.push(receiptMonth[k]);
                }
              }
            }
          }
        }
      }
      receiptArray = [...new Set(receiptDay)];
      setReceipts(receiptArray)
      periodTotal = 0;
      receiptArray.forEach(receipt => periodTotal += receipt.expenditures);
      setPeriodExp(periodTotal);
    }

    if (money !== null) {
        for(let i = 0; i < money.income.length; i++) {
          let year = money.income[i].date.slice(0, 4);
          year = parseInt(year, 10);
          if (
            year <= end.year &&
            year >= start.year 
          ) {
            incomeYear.push(money.income[i])
            for (let j = 0; j < incomeYear.length; j++) {
              let month = incomeYear[j].date.slice(5, 7);
              month = parseInt(month, 10);
              if(
                month <= end.month &&
                month >= start.month
              ) {
                incomeMonth.push(incomeYear[j])
                for (let k = 0; k < incomeMonth.length; k++) {
                  let day = incomeMonth[k].date.slice(8, 10);
                  day = parseInt(day);
                  if(
                    day <= end.day &&
                    day >= start.day
                  ){
                    incomeDay.push(incomeMonth[k]);
                  } else if (
                    month > start.month &&
                    day < start.day
                  ) {
                    incomeDay.push(incomeMonth[k]);
                  }
                }
              }
            }
          }
        }
        incomeArray = [...new Set(incomeDay)];
        console.log(incomeArray)
        incomeTotal = 0;
        incomeArray.forEach(el => incomeTotal += el.amount);
        setPeriodInc(incomeTotal);
    };
  }, [start, end])
  
  let moneyTotal;
  if(money !== null) {
    moneyTotal = <Typography variant='h6'>Total: ${money.result}</Typography>
  } else {
    moneyTotal = <h3>Total: $0</h3>
  }

  let expenditures = 0;
  if(receipts !== null) {
    receipts.forEach(receipt => expenditures += receipt.expenditures)
  }
  
  expenditures = <Typography variant='h6'>Expenditures: ${expenditures}</Typography>
  
  let receiptList;
  receiptList = receipts !== null && filteredReceipts.length == 0 ? 
  receipts.map(receipt => {
    return (
      <Grid item xs={3}>
        <Item>
          <h4>{receipt.reason}</h4>
          <h5>Date: {dateTimeConverter(receipt.date)}</h5>
          <h5>Expenditure: ${receipt.expenditures}</h5>
          <h5>Associated Member: {receipt.associated_member}</h5>
      </Item>
    </Grid>
    )})
  : filteredReceipts.length > 0 ?
  filteredReceipts.map(receipt => {
    return (
      <Grid item xs={3}>
        <Item>
          <h4>{receipt.reason}</h4>
          <h5>Date: {dateTimeConverter(receipt.date)}</h5>
          <h5>Expenditure: ${receipt.expenditures}</h5>
          <h5>Associated Member: {receipt.associated_member}</h5>
      </Item>
    </Grid>
    )})
  :<h3>No Receipts</h3>

  const middleBoxes = 
    <Stack spacing={2} justifyContent='center' alignItems='center'>
      <Typography variant='h5'>Filter: </Typography> <br/>
      <FormControl>
          <FormControlLabel
            label='Start: '
            labelPlacement='start'
            control={            
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="start date"
                  value={start}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField color='secondary' {...params} />}
                />
              </LocalizationProvider>}
          />
        </FormControl>
        <FormControl>
          <FormControlLabel
            label='End: '
            labelPlacement='start'
            control={            
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="end date"
                  value={end}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField color='secondary' {...params} />}
                />
              </LocalizationProvider>}
          />
        </FormControl>
        <Typography variant='p'>Total Expenditures For Period: ${periodExp}</Typography>
        <Typography variant='p'>Total Income for Period: ${periodInc}</Typography>
        <ReceiptButton eventId={0} receiptOpen={handleReceipt} open={receipt} receiptClose={handleReceipt}/>
        <IncomeButton eventId={0} incomeOpen={handleIncome} open={income} incomeClose={handleIncome} />
      </Stack>


  return(
    <Box>
      <Typography variant='h3'>Treasury</Typography> <br/>
      <Grid container maxWidth='xlg'>
        <Grid item xs={3}>
          <Box sx={style}>
            <Item>
              <Typography variant='h5'>Bank:</Typography> <br/>
              {moneyTotal}
              {expenditures}
            </Item>
          </Box>
        </Grid>
        <Grid item xs={3}>
          {middleBoxes}
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h5'>Receipts:</Typography> <br/>
          <Grid container spacing={2}>
          {receiptList}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Treasurypage;