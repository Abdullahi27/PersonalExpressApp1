const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true";
const dbName = "demo";

app.listen(3000, () => {
    console.log('app is running on port 3000')
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index.ejs')
})


app.post('/test', (req, res) => {
fetch(`https://pokeapi.co/api/v2/pokemon/${req.body.pokemon}`)
.then(response => response.json())
.then(data => {
   console.log(data)
   res.end(JSON.stringify(data));
 
    
}).catch(error => res.end(JSON.stringify('false')))
})
