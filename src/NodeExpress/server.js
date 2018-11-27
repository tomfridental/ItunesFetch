require('dotenv').config()

const {API_PORT, API_HOST} = process.env;
const db = require('./db/connection')
const express = require('express');
const app = express();
const SearchStr = require('./db/search.str');;
const path = require('path');



app.use(express.json())

app.use('/', express.static(path.join(__dirname, '../../dist')))
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname,'index.html'));
});


app.post('/update', async (req,res) => {
let key = await SearchStr.findOne({searchStr:req.body.searchStr})
if(key){
const updatedCount = key.count +=1;
await key.updateOne({count: updatedCount})
}
else{
key = new SearchStr(req.body)
key.count = 1
await key.save()  
}
res.status(201).json({msg: 'saved ok!'})
});

app.get('/top_ten', async (req,res)=> {
    const list = await SearchStr.find({}).sort({count: -1}).limit(10).select(`-_id searchStr`)
    res.json({list})
})


db.connect();

const server = app.listen(API_PORT, () => {
    console.log(`Listening on ${API_HOST}:${API_PORT}`)
})