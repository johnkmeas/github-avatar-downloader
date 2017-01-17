var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config();
var argvLength = process.argv.slice(2);
var repoOwner = process.argv[2];
var repoName = process.argv[3];
//Make Name and Token secret using dotenv module
var GITHUB_USER = process.env.NAME;
var GITHUB_TOKEN = process.env.TOKEN;

if(argvLength.length < 2 ){
  console.log('Please give us a name and repository!');
  throw err;
}

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var requestOptions = {
    url: requestURL,
    headers: {
      "user-agent": 'johnkmeas'
    }
  };
  request.get(requestOptions, cb);
}

function downloadImageByURL(url, filePath) {

  var dir = './avatars';
  //Creates a directory for avatars if it doesn't already exist
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  request.get(url)
    .on('error', function (err) {
      throw err;
    }).on('response', function(response) {
      console.log('status result: ',response.statusCode);
  }).pipe(fs.createWriteStream(dir + '/' + filePath));
}

getRepoContributors(repoOwner, repoName, function(err, result) {

  var parse = JSON.parse(result.body);

  parse.forEach(function(name){
    console.log('Image of User: ', name.login, 'has been successfully downloaded in the avatars folder.');
    console.log('------');

    //Calling function to download the images from the repository
    downloadImageByURL(name.avatar_url, name.login +'.jpg' );
  });
});


