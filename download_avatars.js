var request = require('request');
var fs = require('fs')

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = 'johnkmeas';
var GITHUB_TOKEN = '981ab67211d4b78be4d0ef31f184366031a5d1da';
var repoOwner = 'jquery';
var repoName = 'jquery';


function getRepoContributors(repoOwner, repoName, cb) {
  // ...

var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  // var requestURL = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var requestOptions = {
    url: requestURL,
    // bearer : GITHUB_TOKEN,
    headers: {
      "user-agent": 'johnkmeas'
    }
  }
  // request.UserAgent = "myTestApp";
  console.log(requestOptions)
  // console.log(requestOptions);
  request.get(requestOptions, cb);
    // console.log(res, res.statusCode)


}

getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log('Errors:', err);
  console.log('Result:', result.body);
});

