// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDBga ulanish
mongoose.connect("mongodb+srv://dhrhhffjf:WoOf3XOtPrAC9jT9@cluster0.pgbujix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
}).then(() => {
  console.log('MongoDBga ulandi');
}).catch((err) => {
  console.error('Ulanishda xatolik:', err);
});

// Schema va Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

// POST: yangi user qo‘shish
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({ message: 'Foydalanuvchi qo‘shildi', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Xatolik yuz berdi' });
  }
});

// GET: barcha userlarni olish WoOf3XOtPrAC9jT9
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Xatolik yuz berdi' });
  }
});

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});

