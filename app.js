const express = require('express'); //подключаем фрейморк - не забывать устанавливать npm install ....
const config = require('./config/default.json');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')
const { routerAuth } = require('./routes/auth.routes');
const { routerLink } = require('./routes/link.routes');
const { routerRedirect } = require('./routes/redirect.routes');

const app = express();
const PORT = config.port || 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', routerAuth);
app.use('/api/link', routerLink);
app.use('/t', routerRedirect);

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

async function start() { // коннктимся к базе данных
    try {
        await mongoose.connect(config.mongoUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => {
            console.log("App has been started on port: ", PORT);
        })
    } catch (error) {
        console.log('Server error', error.message);
        process.exit(1);// выходим из процесса nodejs
    }
}

start();

