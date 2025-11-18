const express = require('express');
const cors = require('cors');
require('dotenv').config();

const grantsRouter = require('./routes/grants');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRouter);
app.use('/api/grants', grantsRouter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
    console.log(`Granthub server listening on port ${PORT}`);
});
