//Express acts as your server
const express = require('express');
//include other dependencies as well
const morgan = require('morgan');
const cors = require('cors');
//bring in your database from knex
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
//invoke express
const app = express();

//turn on everything that you will be using
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//make the various different routes, sending information from the database
//using knex selector queries.

//home route will list all upcoming events
app.get('/1rops', async (req, res) => {
    let result = await knex
        .select('*')
        .from('events')
        .catch(err => res.status(404).json(err));

    res.status(200).send(result);
});

app.get('/1rops/income', async (req, res) => {
    let result = await knex('income_patch').catch(err => res.status(404).json(err));
    let income = await knex('income').catch(err => res.status(404).json(err));
    

    res.status(200).json({result: result, income: income})
})

app.get('/1rops/money', async (req, res) => {

    const incomes = await knex('income')
        .select('*')
        .then(data => data)
        .catch(err => res.status(404).json(err));

    let income = await knex('income')
        .select('amount')
        .then((data) => data)
        .catch(err => res.status(404).json(err));

    let incomeCount = 0;
    income.forEach( (el) => incomeCount += el.amount);

    let expenditures = await knex('receipts')
        .select('expenditures')
        .then((data) => data)
        .catch(err => res.status(404).json(err));

    let expenditureCount = 0;
    expenditures.forEach( el  => expenditures += el.expenditures);

    result = incomeCount - expenditureCount;
    res.status(200).send({result: result, income: incomes});
});

app.get('/1rops/receipts', async (req, res) => {
    const result = await knex('receipts').catch(err => res.status(404).json(err));

    res.status(200).send(result);
});

//members routes to list members, establish new members, change a members position, and delete members
app.get('/1rops/members', async (req, res) => {
    let response = await knex
    .select('*')
    .from('members')
    .catch(err => res.status(404).json(err));
    
    res.status(200).send(response);
});

app.get('/1rops/preorder', async (req, res) => {
    let response = await knex
        .select('po.name', 'po.amount', 'po.notes', 'po.picked_up', 'p.patchName')
        .from('pre_orders as po')
        .leftJoin('patch_preOrder as pp', 'pp.preOrder', '=', 'po.id')
        .leftJoin('patches as p', 'p.id', 'pp.patch')
        .catch(err => res.status(404).json(err));

    res.status(200).send(response);
});

//route to get all previous patch orders
app.get('/1rops/patches', async (req, res) => {
    let result = await knex('patches')
        .then((data) => data)
        .catch(err => res.status(404).json(err));

    res.status(200).send(result);
});

app.get('/1rops/patches/:patchId', async (req, res) => {
    let patchId = parseInt(req.params.patchId);

    let income = await knex
        .select('i.amount')
        .from('income AS i')
        .where('ip.patch', patchId)
        .innerJoin('income_patch AS ip', 'i.id', '=', 'ip.income')
        .then((data) => data)
        .catch(err => res.status(404).json(err));
    
    let incomeCount = 0;
    income.forEach( (el) => {return incomeCount += el.amount})

    const expenditures = await knex
        .select('r.expenditures')
        .from('receipts AS r')
        .where('rp.patch', patchId)
        .innerJoin('receipt_patch AS rp', 'r.id', '=', 'rp.receipt')
        .then((data) => data)
        .catch(err => res.status(404).json(err));

    let count = 0;
    expenditures.forEach( (el) => {return count += el.expenditures});
    
    total = incomeCount - count;

    res.status(200).send({total: total, income: incomeCount});
});


app.get('/1rops/preorder/:patchId', async (req, res) => {
    let patchId = parseInt(req.params.patchId, 10);
    let patchName = await knex('patches')
        .select('patchName')
        .where({id: patchId})
        .then(data => data[0].name)
        .catch(err => res.status(404).json(err));

    let result = await knex
        .select('*')
        .from('pre_orders as po')
        .where('pp.patch', patchId)
        .innerJoin('patch_preOrder as pp', 'pp.preOrder', '=', 'po.id')
        .then( data => data)
        .catch(err => res.status(404).json(err));

    res.status(200).send({patchName: patchName, preOrders: result});
});

app.get('/1rops/event/:eventId', async (req, res) => {
    let eventId = parseInt(req.params.eventId);

    let income = await knex
        .select('i.amount')
        .from('income AS i')
        .where('ie.event', eventId)
        .innerJoin('income_event AS ie', 'i.id', '=', 'ie.income')
        .then((data) => data)
        .catch(err => res.status(404).json(err));
    
    let incomeCount = 0;
    income.forEach( (el) => {return incomeCount += el.amount})

    const expenditures = await knex
        .select('r.expenditures')
        .from('receipts AS r')
        .where('re.event', eventId)
        .innerJoin('receipt_event AS re', 'r.id', '=', 're.receipt')
        .then((data) => data)
        .catch(err => res.status(404).json(err));

    let count = 0;
    expenditures.forEach( (el) => {return count += el.expenditures});
    
    total = {total: incomeCount - count};

    res.status(200).send(total);
});

//route to get specific details about events to include receipts, income, and committee members
app.get('/1rops/:event', async (req, res) => {
    //get params from request
    const eventId = parseInt(req.params.event, 10);
    
    //search for the committee members 
    const committee = await knex
        .select('name', 'id')
        .from('members AS m')
        .where('ec.event', eventId)
        .innerJoin('event-committee AS ec', 'm.id', '=', 'ec.member')
        .catch(err => res.status(404).json(err));
    
    //search for associated receipts
    const receipts = await knex
        .select('*')
        .from('receipts as r')
        .where('re.event', eventId)
        .innerJoin('receipt_event AS re', 're.receipt', '=', 'r.id')
        .catch(err => res.status(404).json(err));
    
    //what is the selected event
    const event = await knex
        .select('*')
        .from('events')
        .where('id', eventId)
        .catch(err => res.status(404).json(err));

    //what are the income entries associated
    const income = await knex  
        .select('*')
        .from('income as i')
        .where('ie.event', eventId)
        .innerJoin('income_event as ie', 'ie.income', '=', 'i.id')
        .catch(err => res.status(404).json(err));
    
    const response = {event: event, committee: committee, receipts: receipts, income: income};
    
    //if event is not found, send back error
    if(response.event.length === 0) res.status(404).send('Error, event not found!');
    else res.status(200).send(response);
});

app.patch('/1rops/patches/:patchId', async (req, res) => {
    const patchId = parseInt(req.params.patchId, 10);
    const updateInfo = req.body;
    const soldPatches = updateInfo.amount_sold;
    const incomeIncrease = updateInfo.income;

    await knex('patches')
        .increment('amount_sold', soldPatches)
        .where({id: patchId})
        .then((data) => data)
        .catch(err => res.status(404).json(err));
    
    const incomeId = await knex('income')
        .returning('id')
        .insert({amount: incomeIncrease})
        .then(data => data[0])
        .catch(err => res.status(404).json(err));

    let result = await knex('income_patch')
        .insert({income: incomeId, patch: patchId})
        .then(data => data)
        .catch(err => res.status(404).json(err));

    res.status(201).json(result);
});

app.patch('/1rops/reorder/:patchId', async (req, res) => {
    const patchId = parseInt(req.params.patchId, 10);
    const updateInfo = req.body;
    const patchIncrease = updateInfo.amount_ordered;
    const newReceipt = {
        reason: updateInfo.reason,
        associated_member: updateInfo.associated_member,
        expenditures: updateInfo.expenditures,
        date: updateInfo.date_ordered
    };

    await knex('patches')
        .increment('amount_ordered', patchIncrease)
        .where({id: patchId})
        .then((data) => data)
        .catch(err => res.status(404).json(err));

    const receiptId = await knex('receipts')
        .returning('id')
        .insert(newReceipt)
        .then((data) => data[0])
        .catch(err => res.status(404).json(err));

    await knex('receipt_patch')
        .insert({receipt: receiptId, patch: patchId})
        .then((data) => data)
        .catch(err => res.status(404).json(err));

    res.status(201).send('Notice that Patches have been reordered');
});

app.patch('/1rops/:eventId', async (req, res) => {
    let result;
    let eventId = parseInt(req.params.eventId, 10);
    let change = req.body;
    
    if (change.income) {
        let incomeId = await knex('income')
          .returning('id')
          .insert({amount: change.income})
          .then(data => data[0])
          .catch(err => res.status(404).json(err));
            
        await knex('income_event')
          .insert({income: incomeId, event: eventId})
          .then(data => data)
          .catch(err => res.status(404).json(err));
    } else {
        await knex('events')
          .update({date: change.date})
          .where({id: eventId})
          .then(data => data)
          .catch(err => res.status(404).json(err));
        }

    res.status(201).send('updates made');
});

app.patch('/1rops/members/:memberID', async (req, res) => {
    let memberId = parseInt(req.params.memberID, 10);
    console.log(memberId)
    let updateInfo = req.body;
    
    knex('members')
    .where({id: memberId})
    .update(updateInfo)
    .then((data) => data)
    .catch(err => res.status(404).json(err));
    
    let result =  await knex
    .select('*')
    .from('members')
    .where({id: memberId})
    .then((data) => data[0])
    .catch(err => res.status(404).json(err));
    
    res.status(201).send(result);
});

app.patch('/1rops/preorder/:preOrderId', async (req, res) => {
    let preOrderId = parseInt(req.params.preOrderId, 10);
    let change = req.body;
    
    console.log(change.amount);
    change.amount 
    ? await knex('pre_orders')
        .update('amount', change.amount)
        .where({id: preOrderId})
        .then((data => data))
        .catch(err => res.status(404).json(err))
    : await knex('pre_orders')
        .update({
        picked_up: change.picked_up
        })
        .where({id: preOrderId})
        .catch(err => res.status(404).json(err));

    const result = await knex('pre_orders')
        .select('name', 'amount', 'notes', 'picked_up' )
        .where({id: preOrderId})
        .then(data => data)
        .catch(err => res.status(404).json(err));

    res.status(201).send(result);
});

app.post('/1rops/patches/income/:patchId', async (req, res) => {
    let patchId = parseInt(req.params.patchId, 10);

    let incomeIncrease = req.body.income;

    const incomeId = await knex('income')
        .returning('id')
        .insert({amount: incomeIncrease})
        .then(data => data[0])
        .catch(err => res.status(404).json(err));

    await knex('income_patch')
        .insert({income: incomeId, patch: patchId})
        .then(data => data)
        .catch(err => res.status(404).json(err));

    res.status(201).json('posted data')
});

app.post('/1rops/members', async (req, res) => {
    let newMember = req.body;
    if(newMember.name && newMember.position){
        await knex('members').insert(newMember).catch(err => res.status(404).json(err));
        res.status(201).send(`Welcome to the 1 ROPS Booster Club ${newMember.name}!`)
    }
});

app.post('/1rops', async (req, res) => {
    let newEvent = {
        about: req.body.about,
        date: req.body.date,
        title: req.body.title
    }

    let newIncome = {
        amount: req.body.income
    }
        
    let eventId = await knex('events')
            .returning('id')
            .insert(newEvent)
            .then((data) => data[0])
            .catch(err => res.status(404).json(err));

    let incomeId = await knex('income')
        .returning('id')
        .insert(newIncome)
        .then((data) => data[0])
        .catch(err => res.status(404).json(err));

    await knex('income_event')
        .insert({income: incomeId, event: eventId})
        .then(data => data)
        .catch(err => res.status(404).json(err))

    res.status(201).json('success')
});

app.post('/1rops/patches', async (req, res) => {
    const incomingInfo = req.body;

    const newPatch = {
        patchName: incomingInfo.patchName,
        date_ordered: incomingInfo.date_ordered,
        amount_ordered: incomingInfo.amount_ordered,
        amount_sold: incomingInfo.amount_sold,
    };

    const newReceipt = {
        reason: incomingInfo.reason,
        associated_member: incomingInfo.associated_member,
        expenditures: incomingInfo.expenditures,
        date: incomingInfo.date_ordered
    };

    let receiptId = await knex('receipts')
        .returning('id')
        .insert(newReceipt)
        .then((data) => data[0])
        .catch(err => res.status(404).json(err));

    let patchId = await knex('patches')
        .returning('id')
        .insert(newPatch)
        .then((data) => data[0])
        .catch(err => res.status(404).json(err));

    await knex('receipt_patch')
        .insert({receipt: receiptId, patch: patchId})
        .then((data) => data)
        .catch(err => res.status(404).json(err));
        
    res.status(201).send('Patch has been successfully added to database')
});

app.post('/1rops/preorder/:patchId', async (req, res) => {
    let patchId = parseInt(req.params.patchId, 10);
    let newPreorder = req.body;

    let preOrderId = await knex('pre_orders')
        .returning('id')
        .insert(newPreorder)
        .then((data) => data[0])
        .catch(err => res.status(404).json(err));

    await knex('patch_preOrder')
        .insert({patch: patchId, preOrder: preOrderId})
        .then((data) => data)
        .catch(err => res.status(404).json(err));

    res.status(201).send('New pre-order has been added')
});

app.post('/1rops/committee/:eventId', async (req, res) => {
    let eventId = parseInt(req.params.eventId, 10);
    let memberId = req.body.name;

    await knex('event-committee')
        .insert({event: eventId, member: memberId})
        .then(data => data)
        .catch(err => res.status(404).json(err));

    const result = await knex
        .select('m.name')
        .from('members as m')
        .where('ec.event', eventId)
        .innerJoin('event-committee as ec', 'ec.member', '=', 'm.id')
        .catch(err => res.status(404).json(err));

    res.status(201).send(result);
});

app.post('/1rops/:event', async (req, res) => {
    const eventId = parseInt(req.params.event, 10);
    const newReceipt = req.body;

    let receiptId = await knex('receipts')
        .returning('id')
        .insert(newReceipt)
        .then((data) => data[0])
        .catch(err => res.status(404).json(err));
    

    await knex('receipt_event')
        .insert({event: eventId, receipt: receiptId})
        .then((data) => data)
        .catch(err => res.status(404).json(err));

    res.status(201).send('Receipt successfully uploaded!');
});

app.delete('/1rops/committee/:eventId/:memberId', async (req, res) => {
    let eventId = parseInt(req.params.eventId, 10);
    let memberId = parseInt(req.params.memberId, 10);

    await knex('event-committee')
        .delete('*')
        .where({member: memberId})
        .andWhere({event: eventId})
        .then((data) => data)
        .catch(err => res.status(404).json(err));

    res.status(200)
});

app.delete('/1rops/members/:memberId', async (req, res) => {
    let memberId = parseInt(req.params.memberId, 10);
    
    await knex('members')
        .delete('*')
        .where({id: memberId})
        .then((data) => data)
        .catch(err => res.status(404).json(err));
    
    await knex('event-committee')
        .delete('*')
        .where({member: memberId})
        .then((data) => data)
        .catch(err => res.status(404).json(err));

    res.status(200);
});

app.delete('/1rops/:eventId', async (req, res) => {
    let eventId = parseInt(req.params.eventId, 10);
    
    await knex('events')
        .delete('*')
        .where({id: eventId})
        .then((data) => data)
        .catch(err => res.status(404).json(err));
    
    let result = await knex('event-committee')
        .select('*')
        .where({event: eventId})
        .then((data) => data)

    if(result === undefined) {
        res.status(200)
    } else {
        await knex('event-committee')
          .delete('*')
          .where({event: eventId})
          .then(data => data)
          .catch(err => res.status(404).json(err));
        
        res.status(200);
    }
});

//export app and knex to run server/allow for use in testing.
module.exports = {app, knex};