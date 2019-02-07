const express = require('express');
const path = require("path");
const morgan = require("morgan");
const routes = require("./routes/routes");
const cors = require("cors");
const {
    mongoose
} = require("./models/database")
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.use(cors({
    origin: "*", //"http://localhost:3000",
    credentials: true
}));
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.engine('html', require("ejs").renderFile);


// Middlewares
app.use(morgan('dev'))
app.use(express.json())

app.use(express.static(path.join(__dirname, "client/public")));

app.use("/api", routes);

app.listen(app.get('port'), () => {
    console.log(`App listening on port ${app.get('port')}!`);
});

module.exports = app