const express = require('express');
const dbConnection = require('./config/connectDB');
const routes = require('./routes/FoodMenus');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
dotenv.config({ path: path.join(__dirname, 'utils', '.env') });

const app = express();
app.use(cors({ origin: true, credentials: true }));

dbConnection().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {res.send('Hello World!');});
app.use('/api/foodmenus', routes);

const port = 3000;
app.listen(port, () => console.log(`server running on port ${port}`));