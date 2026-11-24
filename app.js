// INTENTIONALLY VULNERABLE - FOR SCANNER TESTING ONLY. DO NOT DEPLOY.
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const db = mysql.createConnection({ host: 'localhost', user: 'root', password: 'root' });

// VULNERABILITY: Hardcoded JWT secret
const JWT_SECRET = 'supersecret123';

// VULNERABILITY: Insecure CORS configuration (wildcard origin)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// VULNERABILITY: SQL injection (string concatenation of user input)
app.get('/user', (req, res) => {
  const query = "SELECT * FROM users WHERE name = '" + req.query.name + "'";
  db.query(query, (err, rows) => res.json(rows));
});

// VULNERABILITY: Command injection (user input passed to exec)
app.get('/ping', (req, res) => {
  exec('ping -c 1 ' + req.query.host, (err, stdout) => res.send(stdout));
});

// VULNERABILITY: Path traversal (unsanitized file path)
app.get('/file', (req, res) => {
  fs.readFile(req.query.file, 'utf8', (err, data) => res.send(data));
});

// VULNERABILITY: Reflected XSS (unescaped user input in HTML)
app.get('/hello', (req, res) => {
  res.send('<h1>Hello ' + req.query.name + '</h1>');
});

// VULNERABILITY: Code injection via eval() on user input
app.post('/calc', (req, res) => {
  res.send(String(eval(req.body.expression)));
});

// VULNERABILITY: Prototype pollution via lodash merge of untrusted input
app.post('/settings', (req, res) => {
  const settings = {};
  _.merge(settings, req.body);
  res.json(settings);
});

// VULNERABILITY: Insecure deserialization (untrusted data evaluated as code)
app.post('/restore', (req, res) => {
  const obj = eval('(' + req.body.data + ')');
  res.json(obj);
});

// VULNERABILITY: Weak crypto (MD5 for password hashing)
app.post('/register', (req, res) => {
  const hash = crypto.createHash('md5').update(req.body.password).digest('hex');
  res.json({ hash });
});

// VULNERABILITY: Insecure randomness (Math.random for tokens)
app.get('/token', (req, res) => {
  const token = Math.random().toString(36).substring(2);
  res.json({ token, jwt: jwt.sign({ user: 'guest' }, JWT_SECRET) });
});

// VULNERABILITY: Missing authentication on admin route
app.get('/admin', (req, res) => {
  res.json({ users: ['alice', 'bob'], secret: 'admin-panel-data' });
});

// VULNERABILITY: Open redirect (unvalidated redirect target)
app.get('/redirect', (req, res) => {
  res.redirect(req.query.url);
});

app.listen(3000);
