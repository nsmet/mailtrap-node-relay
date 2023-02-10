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
  console.log("mailtrap POST req")
  if (!req.body) {
    return res.status(400).send('No data sent');
  }
  if (!req.body.inboxId || !req.body.apiToken || !req.body.subject || !req.body.messageHtml) {
    return res.status(400).send('Missing data');
  }
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
    return res.send("sucessfully sent");
  }).catch(err => {
    console.log(err)
    return res.status(err.status || 500).send('Error sending email, please double check your inboxId and apiToken');
  });
});

server.listen(process.env.PORT || 5000);