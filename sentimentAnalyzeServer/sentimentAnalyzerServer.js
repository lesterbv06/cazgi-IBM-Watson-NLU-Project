const express = require("express");
const app = new express();
const dotenv = require("dotenv");
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

app.use(express.static("client"));

const cors_app = require("cors");
app.use(cors_app());

dotenv.config();

let api_key = process.env.API_KEY;
let api_url = process.env.API_URL;

const nlu = new NaturalLanguageUnderstandingV1({
  version: "2020-08-01",
  authenticator: new IamAuthenticator({
    apikey: api_key,
  }),
  serviceUrl: api_url,
});

const analyzeParams = {
  features: {
    entities: {
      emotion: true,
      sentiment: true,
      limit: 2,
    },
    keywords: {
      emotion: true,
      sentiment: true,
      limit: 2,
    },
  },
};

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/url/emotion", (req, res) => {
    analyzeParams.url = req.query.url;
  nlu
    .analyze(analyzeParams)
    .then((analysisResults) => {
      console.log(
        JSON.stringify(analysisResults.result.keywords[0].emotion, null)
      );
      return res.send(
        JSON.stringify(analysisResults.result.keywords[0].emotion, null)
      );
    })
    .catch((err) => {
      console.log("error:", err);
    });
});

app.get("/url/sentiment", (req, res) => {
    analyzeParams.url = req.query.url;
  nlu
    .analyze(analyzeParams)
    .then((analysisResults) => {
      console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment.label, null));
      return res.send(
        "URL sentiment for " +
          req.query.url +
          ": " +
          JSON.stringify(analysisResults.result.keywords[0].sentiment.label, null)
      );
    })
    .catch((err) => {
      console.log("error:", err);
    });
});

app.get("/text/emotion", (req, res) => {
    analyzeParams.text = req.query.text;
  nlu
    .analyze(analyzeParams)
    .then((analysisResults) => {
      console.log(JSON.stringify(analysisResults.result.keywords[0].emotion, null, 1));
      return res.send(JSON.stringify(analysisResults.result.keywords[0].emotion, null, 1));
    })
    .catch((err) => {
      console.log("error:", err);
    });
});

app.get("/text/sentiment", (req, res) => {
    analyzeParams.text = req.query.text;
  nlu
    .analyze(analyzeParams)
    .then((analysisResults) => {
      console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment.label, null, 1));
      return res.send(JSON.stringify(analysisResults.result.keywords[0].sentiment.label, null, 1));
    })
    .catch((err) => {
      console.log("error:", err);
    });
});

let server = app.listen(8080, () => {
  console.log("Listening on: ", server.address().port);
});
