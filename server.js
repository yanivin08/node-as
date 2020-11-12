let express = require('express');
let mongoose = require('mongoose');
let app = express();

let router = require('./router/Appointment');

app.use(router);

//set up database
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { 
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const mongoDB = mongoose.connection;
mongoDB.on('err', console.error.bind(console, 'connection error:'));
mongoDB.once('open', () => {
    console.log('MongoDB Connected!');
})


port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server start on port ${port}`));