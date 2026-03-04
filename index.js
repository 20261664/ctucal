const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const ctuRoute = require('./routes/ctuRoute');
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(cookieParser());

app.use('/', ctuRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});