require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const cors = require('cors')

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
