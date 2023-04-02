const express = require('express');
const app = express();
const mongoose = require('mongoose');
/*var cors = require('cors')
app.use(cors()) */
mongoose.connect('mongodb://localhost/digitalcrew', { useNewUrlParser: true });

const inventorySchema = new mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    description: {
      type: String ,
      require: true
    },
    quantity: {
      type: Number ,
      require :true
    },
  });
  const User = mongoose.model('inventory', inventorySchema);
  console.log(User)

  app.get('/', async  (req, res) =>{
    try {
     const savedUser = await User.find();
      console.log(savedUser)
      res.send(savedUser);
    } catch (error) {
      res.status(400).json('Error: ' + error.message);
    }
  });
  app.get('/inventory/:id', async (req, res) => {
    try {
      const inventory = await User.findById(req.params.id);
      if (!inventory) {
        res.status(404).json({ error: 'Inventory item not found' });
      } else {
        res.json(inventory);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
app.use(express.json())
  app.post('/inventory', async (req, res) => {
    try {
      const inventory = new User(req.body);
      await inventory.save();
      res.status(201).json(inventory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }); 
  app.put('/inventory/:id', async (req, res) => {
    try {
      const inventory = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!inventory) {
        res.status(404).json({ error: 'Inventory item not found' });
      } else {
        res.json(inventory);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.delete('/inventory/:id', async (req, res) => {
    try {
      const inventory = await User.findByIdAndDelete(req.params.id);
      if (!inventory) {
        res.status(404).json({ error: 'Inventory item not found' });
      } else {
        res.json(inventory);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
   
  app.listen(5000, function () {
    console.log('Server listening on port 5000');
  });  