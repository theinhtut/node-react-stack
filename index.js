const express = require('express');
require('./services/passport');


const app = express();

// Same with ===>
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);
require('./routes/authRoutes')(app); 


// PORT delcaration
const port = process.env.PORT || 5000;
app.listen(port);
console.log('Server has started on port: ' + port);
