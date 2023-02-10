import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import http from 'http';
import axios from "axios";

const app = express();
const server = http.createServer(app);


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors())


// USER ENDPOINTS
app.post("/mailtrap", function (req, res) {
  console.log('in here');
  const inboxId = req.body.inboxId;
  const apiToken = req.body.apiToken;
  const subject = req.body.subject;
  const message = req.body.messageHtml;

  const options = {
    method: 'POST',
    url: 'https://sandbox.api.mailtrap.io/api/send/' + inboxId,
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': apiToken
    },
    data: {
      attachments: [],
      to: [{email: 'john_doe@example.com', name: 'John Doe'}],
      from: {email: 'email@previewer.com', name: 'Email Previewer'},
      headers: {'X-Message-Source': 'dev.mydomain.com'},
      subject: subject,
      html: message,
      custom_variables: {},
      category: 'API Test'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.status)
    return res.end();
  }).catch(function (error) {
    console.log(error)
    return res.status(error.status || 500);
  });
});

server.listen(5000);