const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = 'mongodb+srv://demo:demo123@cluster0.t5ge5m8.mongodb.net/pokemon?retryWrites=true&w=majority';
const dbName = "pokemon";

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

app.get('/', function(req, res) {
  console.log('get /pokemon')
    db.collection('pokemon').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {
        pokemon: result
      })
    })
  }); 

  const ObjectId = require('mongodb').ObjectID;

app.get('/pokemon', (req, res) => {
  const pokename = req.query.name
  console.log(pokename)
fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`)
.then(response => response.json())
.then(data => {
   console.log(data)
   res.end(JSON.stringify(data));
 
    
}).catch(error => res.end(JSON.stringify('false')))


})

app.post('/savepokemon', (req, res) => {
  db.collection('pokemon').save({name: req.body.name, height: req.body.height, moves: req.body.moves, ability: req.body.ability, img: req.body.img, id: new ObjectId(), power: 0}, (err, result) => {
    console.log(req.body.name)
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/delete', (req, res) => {
    db.collection('pokemon').findOneAndDelete({_id: ObjectId(req.body.id)}, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })



  app.put('/power', (req, res) => {
    db.collection('pokemon')
    .findOneAndUpdate({_id: ObjectId(req.body.id)}, {
      $set: {
        power: req.body.power
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })
