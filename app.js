const express = require('express');
const app = express();
const morgan = require('morgan');
const FishRoutes = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(morgan('tiny'));
app.use('/fishes', FishRoutes);

app.get('/', (req, res)=> {
  res.send({message: 'Please start at /fishes'})
});

app.use((error, req, res, next)=> {
  let key = 'error';
  if(Array.isArray(error)) {
    key = 'errors';
  }
  return res
    .status(error[0].status || 500)
    .json({ [key]: error.map((err) => err.message) });
})

app.use((req, res, next) => {
  let errr =  new Error('Not Found!!');
  errr.status = 404
  next(errr)
})

if (app.get('env' === 'development')) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}
const PORT = 2900

app.listen(PORT, ()=> {
  console.log(`Server Started at ${PORT}`);  
});