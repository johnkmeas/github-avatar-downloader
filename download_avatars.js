var request = require('request');
var fs = require('fs');
var argvLength = process.argv.slice(2);
var repoOwner = process.argv[2];
var repoName = process.argv[3];

if(argvLength.length < 2 ){
  console.log('Please give us a name and repository!');
  throw err;
}

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = 'johnkmeas';
var GITHUB_TOKEN = '981ab67211d4b78be4d0ef31f184366031a5d1da';
// var repoOwner = 'jquery';

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var requestOptions = {
    url: requestURL,
    // bearer : GITHUB_TOKEN,
    headers: {
      "user-agent": 'johnkmeas'
    }
  }
  request.get(requestOptions, cb);
}

function downloadImageByURL(url, filePath) {

  var dir = './avatars';

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  request.get(url)
    .on('error', function (err) {
      throw err;
    }).on('response', function(response) {
      console.log('Status: ',response.statusCode); // 200
  }).pipe(fs.createWriteStream(dir + '/' + filePath));
}

getRepoContributors(repoOwner, repoName, function(err, result) {

  var parse = JSON.parse(result.body);  //console.log(parse);
  parse.forEach(function(x){
     console.log(x.avatar_url);
     console.log(x.login);
     console.log('------');

     //Calling function to download the images from the repository
     downloadImageByURL(x.avatar_url, x.login +'.jpg' );
  })
});


