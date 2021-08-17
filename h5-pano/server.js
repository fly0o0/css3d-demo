const express = require('express');
const path = require('path');
const app = express();
const url = require('url');
const fs = require('fs');

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/'));
app.engine('.html', require('ejs').__express);
app.set('port', process.env.PORT || 7777);
var ip = getIPAdress();
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
  console.log('Visit http://'+ ip +':' + app.get('port') + ' to run app');
});

app.use(express.static(path.join(__dirname, '/')));

function getIPAdress() {
  var interfaces = require('os').networkInterfaces();　　
  for (var devName in interfaces) {　　　　
      var iface = interfaces[devName];　　　　　　
      for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address;
          }
      }　　
  }
}