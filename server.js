import express from 'express';
import {htmltosvg} from './htmltosvg.js';

const app = express();
app.use(htmltosvg);

const server = app.listen(process.env.PORT || 8080, err => {
    if (err) return console.error(err);
    const port = server.address().port;
    console.info(`App listening on port ${port}`);
  });