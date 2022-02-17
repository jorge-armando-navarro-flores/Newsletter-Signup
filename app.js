const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/f1ad13facc"

  const options = {
    method: "POST",
    auth: "Janf77:c9aa1b0874428f51d282cc3b73f44df6-us14"
  }

  const request = https.request(url, options, (response) => {

    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();


})

app.post("/failure", (req, res) => {
  res.redirect("/")
})

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
})

// API key
// c9aa1b0874428f51d282cc3b73f44df6-us14

// List Id
// f1ad13facc
