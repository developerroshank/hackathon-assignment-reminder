const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { router } = require('./routes/user.route.js');

const app = express();

dotenv.config();

const PORT = 5000;

app.use(cors());
app.use(express.json());


try {
  mongoose.connect(process.env.MONGO_URI);
  console.log('DB Connected!!');
} catch (err) {
  console.log(err);
}

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});