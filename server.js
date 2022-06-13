import config from './config';
import express from 'express';
import apiRouter from './api';
import sassMidleware from 'node-sass-middleware';
import { join } from 'path';

const server = express();

server.use(sassMidleware({
    src: join(__dirname, 'sass'),
    dest: join(__dirname, 'public')
}));

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
    res.render('index');
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, () => {
    console.info('Express listening on port ', config.port);
});