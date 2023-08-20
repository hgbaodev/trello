// const express = require("express");
import express from "express";
const app = express();
const hostname = "localhost";
const port = 8017;

app.get("/", function (req, res) {
  res.send("<h1>Hello World Nodejs hgbaodev</h1>");
});

app.listen(port, hostname, () => {
  console.log(
    `Hello hgbaodev, I'am running server at http://${hostname}:${port}`
  );
});
