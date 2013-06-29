var request = require("request");

exports.action = function (data, callback, config) {

  var url  = 'http://dictionary.reverso.net/english-french/'+encodeURIComponent(data.dictation);
  var request = require('request');
  request({ 'uri' : url }, function (err, response, body){
    
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
      return;
    }
    
    var tts = data.dictation;
    
    var $ = require('cheerio').load(body, { xmlMode: true, ignoreWhitespace: false, lowerCaseTags: false });
    var tts = $('TD.CDResTarget SPAN').first().text();
    
    
    callback({'tts' : tts});
  });
}