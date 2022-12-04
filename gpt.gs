function requestGPT3Api(text) {
  var root = 'https://api.openai.com/v1/completions';
  var params = {
    //OpenAIのAPIキーを設定
    'headers': {'Authorization': 'Bearer <YOUR API KEY OF OPENAI>'},
    "muteHttpExceptions": true,
    'payload': JSON.stringify({"model": "text-davinci-003","prompt": text,"max_tokens": 4000}),
    'contentType': 'application/json',
    'method': 'post',
  };
  var response = UrlFetchApp.fetch(root, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  Logger.log(json);
  return json.choices[0].text
}