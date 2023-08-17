// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:timeStamp?", (req, res) => {
  var tims = req.params.timeStamp;

  if (!tims) {
    const date = new Date();
    const unixTimestamp = date.getTime();
    const formattedDate = date.toUTCString();
    const sendObj = { unix: unixTimestamp, utc: formattedDate };
    res.json(sendObj);
  } else {
    let date;

    if (/^\d+$/.test(tims)) {
      // If the input is a Unix timestamp
      date = new Date(parseInt(tims));
    } else {
      // Try parsing as a date string
      date = new Date(tims);
    }

    if (isNaN(date)) {
      res.json({ error: "Invalid Date" });
      return;
    }

    const unixTimestamp = date.getTime();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedDate = `${days[date.getUTCDay()]}, ${padZero(
      date.getUTCDate()
    )} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${padZero(
      date.getUTCHours()
    )}:${padZero(date.getUTCMinutes())}:${padZero(date.getUTCSeconds())} GMT`;

    const sendObj = { unix: unixTimestamp, utc: formattedDate };
    res.json(sendObj);
  }
});

function padZero(number) {
  return (number < 10 ? "0" : "") + number;
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
