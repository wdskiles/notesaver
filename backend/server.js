const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//const categoriesRouter = require('./routes/categories');
const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');
const sortRouter = require('./routes/sorts');

//app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);
app.use('/api/notes', notesRouter);
app.use('/api/sort', sortRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>{
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
