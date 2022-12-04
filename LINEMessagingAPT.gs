//ユーザーメッセージをTalk APIにリクエストし、結果をLINEに返信するチャットボット
function doPost(e) {
  //LINE Messaging APIのチャネルアクセストークンを設定
  let token = "<YOUR API CHANNEL ACCESS TOKEN OF LINE BOT>";
  // 応答メッセージ用のLINE Messaging APIのエンドポイントURLを定義
  let url = 'https://api.line.me/v2/bot/message/reply';
  // WebHookで取得したJSONデータをオブジェクト化し、取得
  let eventData = JSON.parse(e.postData.contents).events[0];
  //取得したデータから、応答用のトークンを取得
  let replyToken = eventData.replyToken;
  //ユーザーからのテキスト以外の投稿を受けた際の応答メッセージを用意
  let replyMessage = "テキストを送ってね。";
  //取得したデータから、メッセージ種別を取得
  let messageType = eventData.message.type;
  //メッセージタイプがテキストの場合、Talk APIにリクエスト
  if(messageType = "text"){
    //ユーザーの投稿メッセージをTalk APIに送った結果を設定
    replyMessage = requestGPT3Api(eventData.message.text);
  }
  //APIリクエスト時にセットするペイロード値を設定する
  let payload = {
    'replyToken': replyToken,
    'messages': [{
        'type': 'text',
        'text': replyMessage
      }]
  };
  //HTTPSのPOST時のオプションパラメータを設定する
  let options = {
    'payload' : JSON.stringify(payload),
    'myamethod'  : 'POST',
    'headers' : {"Authorization" : "Bearer " + token},
    'contentType' : 'application/json'
  };
  //LINE Messaging APIにリクエストし、ユーザーからの投稿に返答する
  UrlFetchApp.fetch(url, options);
}