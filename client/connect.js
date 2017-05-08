// const request = require('request');
const http = require('http');

const getUsers = function() {
  http.get('http://localhost:3000/api/v1/users', (res) => {
    // console.log(res);

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      try {
        let parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (e) {
        console.log(e.message);
      }
    });
  })
};

getUsers();

// function getHTML (options, callback) {
//   /* Add your code here */
//   https.get(options, function (response) {
//     response.setEncoding('utf8');
//     var bufferedData = ' ';
//     response.on('data', function(data) {
//         bufferedData += data;
//     });
//     response.on('end', function() {
//       callback(bufferedData);
//     });
//   });
// }
//
// function printHTML (html) {
//   console.log(html);
// }
//
// var requestOptions = {
//   host: 'sytantris.github.io',
//   path: '/http-examples/step4.html'
// };
//
// getHTML(requestOptions,printHTML);
