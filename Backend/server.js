require('dotenv').config()
const express = require('express');
const cors = require('cors'); // ✅ Add this line
const app = require('./src/app')

// If you’re applying CORS here (but better to do it inside app.js)
app.use(cors({
  origin: "https://codereview-1-dw6w.onrender.com"
}));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
