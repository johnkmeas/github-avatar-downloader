var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config();
var argvLength = process.argv.slice(2);
var repoOwner = process.argv[2];
var repoName = process.argv[3];

//Throws error if .env folder is missing
if (!fs.existsSync('.env')){
  console.log('.env folder does not exist');
  throw err;
}

if(process.env.NAME && process.env.TOKEN){
  var GITHUB_USER = process.env.NAME;
  var GITHUB_TOKEN = process.env.TOKEN;
}else{
  console.log('The .env folder is missing information');
  throw err;
}

// if(argvLength.length < 2 ){
//   console.log('Please give us a name and repository!');
//   throw err;
// }

// if(argvLength.length > 2 ){
//   console.log('You gave too many inputs!\nPlease only give us a name and repository!');
//   throw err;
// }

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var requestOptions = {
    url: requestURL,
    headers: {
      "user-agent": 'johnkmeas'
    }
  };
  //console.log(request.get(requestOptions, cb))
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
      // console.log('status result: ',response.statusCode);
      //console.log('contributors ',response);
  })//.pipe(fs.createWriteStream(dir + '/' + filePath));
}

var starred = [];
getRepoContributors(repoOwner, repoName, function(err, result) {

  var parse = JSON.parse(result.body);
  //console.log('contributors ', parse);
  //Throws an error if there are bad credentials
  if(parse.message === 'Bad credentials'){
    console.log('Error, you have included',parse.message + '!\nPlease check your github TOKEN in the .env folder');
    throw err;
  }
  parse.forEach(function(name){

    console.log('contr: ', name.starred_url);
      var namesplice = name.starred_url.replace('{/owner}{/repo}', '');
      starred.push(namesplice)

    // console.log('Image of User: ', name.login, 'has been successfully downloaded in the avatars folder.');
    // console.log('------');
    // console.log(name)
    //Calling function to download the images from the repository
    //downloadImageByURL(name.avatar_url, name.login +'.jpg' );
  });
  //console.log('starred:',starred)
});
var starredArrayCount = {}

function starredCount(arr, cb){
  for(var i = 0; i < arr.length; i++ ){
    console.log(request.get(arr[i]))
    console.log(arr[i].length)
    if(!starredArrayCount.hasOwnProperty(name.starred_url)) {
      //result[inputCharacters[i]] = inputCharacters[i];
      starredArrayCount[arr[i]] = 1

    }else{
      starredArrayCount[arr[i]] ++
    }
  }
  cb(){
    console.log(starredArrayCount)
  }

  // request.get(x)
  //   .on('error', function (err) {
  //     throw err;
  //   }).on('response', function(response) {
  //     // console.log('status result: ',response.statusCode);
  //     //console.log('contributors ',response);
  // })
}
//console.log('starred:',starred)
starredCount(starred)

// function countLetters(str){
//   var result = {};

//   var inputCharacters = str.split(' ').join('').toLowerCase();
//   inputCharacters = inputCharacters.split('')
//   console.log(inputCharacters)

//   for(var i = 0; i < inputCharacters.length; i++ ){
//     //console.log(inputCharacters[i])
//     if(!result.hasOwnProperty(inputCharacters[i])) {
//       //result[inputCharacters[i]] = inputCharacters[i];
//       result[inputCharacters[i]] = 1

//     }else{
//       result[inputCharacters[i]] ++
//     }
//   }
//   console.log(result)
//   //return result
// }