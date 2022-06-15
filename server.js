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

// server.set('views', join(__dirname, 'views'))
server.set('view engine', 'ejs');
server.use('/api', apiRouter);
server.use(express.static('public'));

import serverRender from './serverRender';

server.get('/', (req, res) => {
    serverRender()
        .then(({initialMarkup, initialData}) => {
            res.render('index', {
                initialMarkup,
                initialData
            });
        }).
        catch(console.error);
});

server.listen(config.port, config.host, () => {
    console.info('Express listening on port ', `${config.host}:${config.port}`);
});