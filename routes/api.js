const express = require('express');
const router = express.Router();
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const { parseArgsStringToArgv } = require('string-argv');
const fs = require('fs');

/* GET /api */
router.get('/', function(req, res, next) {

  // Prepare the Response
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.write('<pre style="background: black; color: white;word-wrap: normal;">');

  // Run the command
  const cmd = req.query.cmd || '';

  console.log('Command:', cmd);
  const process = spawn('bash', ['-c', `"${cmd}"`], { shell: true });
  process.on('close', () => res.end('</pre>'));
  process.on('error', (error) => res.end(error));

  process.stdout.on('data', (data) => {
    res.write(data);
    res.write('<script>window.scrollTo(0,document.body.scrollHeight);</script>');
  });
  process.stderr.on('data', (data) => {
    res.write('<span style="color: red;">'+data+'</span>');
  });
});

/* GET /api/containers */
router.get('/containers', function(req, res, next) {
  const process = exec("docker ps --format 'table {{.Names}}' | tail -n+2 | xargs", (error, stdout, stderr) => {
    res.send({
      running: stdout.replace('\n', '').split(' '),
    });
  });
});

/* GET /api/config.json */
router.get('/config.json', function(req, res, next) {
  let json = fs.readFileSync('./config.json');
  res.send(json);
});

module.exports = router;
