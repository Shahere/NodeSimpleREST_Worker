const express = require('express');
const app = express();

app.use(express.static('public'))

app.use(express.json());   
app.use(express.urlencoded({ extended: true })); 

const workersRouter = require('./routes/workers.route');


const WorkersAPIBaseURL = '/api/v1/workers';
const port = 3000;


app.use(WorkersAPIBaseURL, workersRouter);


app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}${WorkersAPIBaseURL}`)
})
