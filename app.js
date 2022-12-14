//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

const {
    urlencoded
} = require('body-parser');
const {
    options
} = require('request');
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.use(express.static('public'));
// app.use(bodyParser, urlencoded({
//     extended: true
// }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req, res) => {

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);


    const url = 'https://us10.api.mailchimp.com/3.0/lists/8ed55f7d07'
    const options = {
        method: 'POST',
        auth: 'anhelina:ba507870a3b2fad08c91c939b1eefcc1-us10'
    }
    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html')
        } else {
            res.sendFile(__dirname + '/failure.html')
        }

        response.on('data', (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("You are now live");
});

///APi key
//ba507870a3b2fad08c91c939b1eefcc1-us10


//8ed55f7d07