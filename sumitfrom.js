const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')
const app = express()
app.use(cors())
mongoose.connect('mongodb://127.0.0.1:27017/admin')
  .then(() => console.log('Connected!'))
const BlogPost = new mongoose.Schema({
    name : {type:String , require:true} ,
    place:{type:String , require:true}
  });
  const MyModel = mongoose.model('BlogPost', BlogPost);
console.log(MyModel)
app.get('/', async function (req, res) {
   // const User = await MyModel.find()
    try{
        const User = await MyModel.find()
        res.send(User)
    }catch(error){
        res.send(error)
        console.log(error)
    }
  })
  app.use(express.json())
  app.post('/user', async function(req , res){
    try{
        const User = await MyModel(req.body).save()
         res.send(User)
    }
    catch(error){
        console.log(error)
    }
  })

  app.listen(5000)