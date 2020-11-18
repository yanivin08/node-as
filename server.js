let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let app = express();
let config = require('config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//appointment data updates
app.use('/appointment', require('./router/Appointment'));
//processing appointment on websites
app.use('/process', require('./router/Process'));
//for viewing purposes
app.use('/dashboard', require('./router/Dashboard'));
//user route
app.use('/user', require('./router/User'));

//set up database
const db = config.get('mongoURI');

mongoose.connect(db, { 
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
});

const mongoDB = mongoose.connection;
mongoDB.on('err', console.error.bind(console, 'connection error:'));
mongoDB.once('open', () => {
    console.log('MongoDB Connected!');
})
mongoose.set('useFindAndModify', false);

port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server start on port ${port}`));