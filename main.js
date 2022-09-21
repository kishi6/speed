// 画像の変数
var Images = [];
var backImage;
// var backgroundImage;
var backsideImage;
var finishbuttonImage;


// スプライトの変数
var finishbuttonSprite;
var leftbuttonSprite;
var rightbuttonSprite;
var backside;
var overleftcardSprite;
var overrightcardSprite;
var Sprite;

// サウンドの変数
var flipSound;
// var correctSound;
// var completedSound;

// ゲーム管理の変数
var timer = 0;
var frame = 0;
var resetcount=0;
var right;
var left;

var frontcard = [];
var frontcardNumber = [0,0,0,0];
var overcard = [];
var overcardNumber = [0,0];
var overcardhistory = [['0'],['0']];
var cardTypes;
var score;
var gamefinishtext = 'off';

var startTime;
var endTime;

function preload() {
  // カードの画像をロードして配列に代入
  Images['s1'] = loadImage('img/spade/torannpu-illust1.png');
  Images['s2'] = loadImage('img/spade/torannpu-illust2.png');
  Images['s3'] = loadImage('img/spade/torannpu-illust3.png');
  Images['s4'] = loadImage('img/spade/torannpu-illust4.png');
  Images['s5'] = loadImage('img/spade/torannpu-illust5.png');
  Images['s6'] = loadImage('img/spade/torannpu-illust6.png');
  Images['s7'] = loadImage('img/spade/torannpu-illust7.png');
  Images['s8'] = loadImage('img/spade/torannpu-illust8.png');
  Images['s9'] = loadImage('img/spade/torannpu-illust9.png');
  Images['s10'] = loadImage('img/spade/torannpu-illust10.png');
  Images['s11'] = loadImage('img/spade/torannpu-illust11.png');
  Images['s12'] = loadImage('img/spade/torannpu-illust12.png');
  Images['s13'] = loadImage('img/spade/torannpu-illust13.png');

  Images['c1'] = loadImage('img/club/torannpu-illust14.png');
  Images['c2'] = loadImage('img/club/torannpu-illust15.png');
  Images['c3'] = loadImage('img/club/torannpu-illust16.png');
  Images['c4'] = loadImage('img/club/torannpu-illust17.png');
  Images['c5'] = loadImage('img/club/torannpu-illust18.png');
  Images['c6'] = loadImage('img/club/torannpu-illust19.png');
  Images['c7'] = loadImage('img/club/torannpu-illust20.png');
  Images['c8'] = loadImage('img/club/torannpu-illust21.png');
  Images['c9'] = loadImage('img/club/torannpu-illust22.png');
  Images['c10'] = loadImage('img/club/torannpu-illust23.png');
  Images['c11'] = loadImage('img/club/torannpu-illust24.png');
  Images['c12'] = loadImage('img/club/torannpu-illust25.png');
  Images['c13'] = loadImage('img/club/torannpu-illust26.png');
  //白紙のカードをロード
  Images['white'] = loadImage('img/whitecard.png');

  //カードの裏の画像をロード
  backsideImage = loadImage('img/backside.png');
  // ボタンの画像をロード
  finishbuttonImage = loadImage('img/finishbutton.png');
  rightbuttonImage = loadImage('img/rightbutton.png');
  leftbuttonImage = loadImage('img/leftbutton.png');
  // 背景画像のロード
  // backgroundImage = loadImage('img/background1.png');

  // カードをめくった時の音をロード
  flipSound = loadSound('sound/turn_card.mp3');
  // // カードのペアがそろった時の音をロード
  // correctSound = loadSound('correct.mp3');
  // // カードのペアが全てそろった時の音をロード
  // completedSound = loadSound('completed.mp3');
}

// 山札のカードの配列をつくる
var cardTypes = [
  's1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13',
  'c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12','c13'
];

// 初期化（最初の一回のみ）
function setup() {
  startTime = new Date();
  // console.log(startTime);
  createCanvas(windowWidth, windowHeight);

  // カードをシャッフルする
  cardTypes = shuffleCards(cardTypes);

  for (var i = 0;i<2;i++){
    // 向こう側のカードのラベルの配列を作る
    overcard[i] = cardTypes.pop();
    overcardhistory[i][0] = overcard[i]
    // 向こう側のカードの数字の配列をつくる
    overcardNumber[i] = Number(overcard[i].slice(1));
  }

  for (var i = 0;i<4;i++){
    // 手前側のカードのラベルの配列を作る
    frontcard[i] = cardTypes.pop();
    // 手前側のカーの数字の配列をつくる
    frontcardNumber[i] = Number(frontcard[i].slice(1));
    
  }

  //ストップボタンを作成
  var finishbuttonSprite = createSprite(200,180);
  finishbuttonSprite.scale = 0.30;
  // スプライトにボタンの絵を追加
  finishbuttonSprite.addImage(finishbuttonImage);
  // ボタンが押されたときgamestopを呼び出す
  finishbuttonSprite.onMousePressed = gamestop;

  function gamestop(){
    endTime = new Date();
    console.log(endTime);
    if (cardTypes.length == 0){
          for (var i = 0; i < 4; i++) {
              if(frontcard[i] != 'white'){
                resetcount += 1;
                console.log(frontcard[i])
              }
          }
          score = resetcount;
      gamefinishtext = 'on';

    }
    
  }

  
  // 左のボタンを作成
  for (var i = 0; i < 4; i++) {
    // スプライトを作る
    var leftbuttonSprite =createSprite(180 + 400 * i, 1170 );
    leftbuttonSprite.scale = 0.3;
    // スプライトにオモテの絵を追加
    leftbuttonSprite.addImage(leftbuttonImage);
    // ボタンに対応する手前のガードの順番
    leftbuttonSprite.number = i;
    // ボタンが左右どちらか
    leftbuttonSprite.direction = 0;
    // スプライトがクリックされた時に呼ばれる関数をセット
    leftbuttonSprite.onMousePressed = clicked;
  }
  // 右のボタンを作成
  for (var i = 0; i < 4; i++) {
    // スプライトを作る
    var rightbuttonSprite =createSprite(280 + 400 * i, 1170 );
    rightbuttonSprite.scale = 0.30;
    // スプライトにオモテの絵を追加
    rightbuttonSprite.addImage(rightbuttonImage);
    // ボタンに対応する手前のガードの順番
    rightbuttonSprite.number = i;
    // ボタンが左右どちらか
    rightbuttonSprite.direction = 1;
    // スプライトがクリックされた時に呼ばれる関数をセット
    rightbuttonSprite.onMousePressed = clicked;
  }

  // 山札の左のボタンをつくる
  var leftbuttonSprite =createSprite(1350,450);
  leftbuttonSprite.scale = 0.30;
  // スプライトにオモテの絵を追加
  leftbuttonSprite.addImage(leftbuttonImage);
  // 山札に対応するナンバーは10とする
  leftbuttonSprite.number = 10;
  // ボタンが左右どちらか
  leftbuttonSprite.direction = 0;
  leftbuttonSprite.onMousePressed = clicked;


  // 山札の右のボタンをつくる
  var rightbuttonSprite =createSprite(1460, 450 );
  rightbuttonSprite.scale = 0.30;
  // スプライトにオモテの絵を追加
  rightbuttonSprite.addImage(rightbuttonImage);
  // 山札に対応するナンバーは10とする
  rightbuttonSprite.number = 10;
  // ボタンが左右どちらか
  rightbuttonSprite.direction = 1;
  rightbuttonSprite.onMousePressed = clicked;

  // 山札のスプライトを作成
  var backside = createSprite(1390,300);
  backside.scale = 0.7;
  backside.addImage(backsideImage);

    
  // カードをシャッフルする
  function shuffleCards(cardTypes) {
    // 100回シャッフルする
    for (var i = 0; i < 100; i++) {
      // シャッフルするカードをランダムに決める（２６枚ある）
      var random1 = floor(random(26));
      var random2 = floor(random(26));
      // random1で決めたカードのタイプを一時的に保存
      var savedType = cardTypes[random1];
    // random1で決めたカードのタイプをramdom2で決めたカードのタイプに変える
      cardTypes[random1] = cardTypes[random2];
      // random2で決めたカードのタイプを一時的に保存していたカードのタイプに変える
      cardTypes[random2] = savedType;
    }
      
    return cardTypes;
  }

}


// 描画
function draw() {
  // 背景を表示する
   background(107,142,35);

  textSize(50);
  text('finish ボタン',100,120);
  text('time', 150, 350);
  // 経過時間を計算
  tmp = Date.now()-startTime;
  // timeの後ろ３行をカットする（ミリ秒なので秒になおすため）
  timer = str(tmp).slice(0,-3);
  text(timer + '秒', 200, 425);
  text('リセット回数', 75, 550);
  text(resetcount, 200, 625);
  text('残り枚数' ,1200, 175);
  text(cardTypes.length ,1450, 175);

  // cardを作る関数を呼び出す
  cardcreate();

  // 全てのスプライトを表示する
  drawSprites();

  // ゲームが終わったときの画面の表示
  if (gamefinishtext == 'on'){
    background(100);
    fill(0);
    textSize(100);
    textAlign(CENTER);

    // リセット回数を表示
    text('リセット回数', width / 2 - 200, height / 2 + 200);
    text(resetcount + '回', width / 2 + 400, height / 2 + 200);
    //startTime から endTime までの処理時間をミリ秒で出力。
    tmp = endTime - startTime;
    time = str(tmp).slice(0,-3);
    text('time', width / 2 - 150, height / 2 + 400);
    text( time + '秒',width / 2 + 400, height / 2 + 400);

    textSize(150);
    // スコアを表示
    score = min(160 -time -resetcount*4,100);
    text('score', width / 2 - 150, height / 2 );
    text(score, width / 2 + 400, height / 2 );

    text('GameFinished', width / 2, height / 2 - 300);
  }

}

function cardcreate(){
    // 奥の左のカードを作成
    var overleftcardSprite = createSprite(600, 400 );
    overleftcardSprite.scale = 0.4;
    // スプライトにオモテの絵を追加
    overleftcardSprite.addImage(Images[overcard[0]]);

    // 奥の右のカードを作成
    var overrightcardSprite = createSprite(600+400, 400 );
    overrightcardSprite.scale = 0.4;
    // スプライトにオモテの絵を追加
    overrightcardSprite.addImage(Images[overcard[1]]);

    // 手元のカードの生成×４
    for (var i = 0; i < 4; i++) {
    // スプライトを作る
    var frontcardSprite =createSprite(236 + 400 * i, 900 );
    frontcardSprite.scale = 0.4;
    // スプライトにオモテの絵を追加
    frontcardSprite.addImage(Images[frontcard[i]]);
    }
}


// カードがクリックされた時の処理
function clicked(button) {
  loop();

  // 左側のボタンが押されたとき（左側をdirection == 0としている）
  if(button.direction == 0 ){
      // 山札がないときに山札のボタンが押されたとき
      if (button.number == 10&&cardTypes.lenght == 0){
        // 何もしない
      }
      // 押したボタンが山札のボタンで、山札の残りが一枚以上のとき
      if (button.number == 10&& cardTypes.length>1){
        overcard[0] = cardTypes.pop();
        console.log(cardTypes);
        overcardNumber[0] = Number(overcard[0].slice(1));
        resetcount ++;
        flipSound.play();

      }
      //押したボタンが山札のボタンで山札が残り一枚のとき
      else if (button.number == 10&& cardTypes.length==1){
        overcard[0] = cardTypes.pop();
        console.log(overcard[0]);
        overcardNumber[0] = Number(overcard[0].slice(1));
        // backside.remove();
        // backsideImage = Images['white'];
        resetcount ++;
        flipSound.play();

      }

      // クリックしたカード+-1だったら
      else if (overcardNumber[0] == frontcardNumber[button.number]+1|| overcardNumber[0] == frontcardNumber[button.number]-1) {
        // // if文のテスト
        // textSize(50);
        // text('L', width - 400, 200);
        // 向かい側の左のカードを押されたカードに入れ替える
      
        overcard[0] = frontcard[button.number];
        overcardNumber[0] = frontcardNumber[button.number];

        flipSound.play();

        // 山札にまだ残りがあったら
          // if (Object.keys(cardTypes).length=! 0){
           if (cardTypes.length > 0){
            frontcard[button.number] = cardTypes.pop();
            frontcardNumber[button.number] = Number((frontcard[button.number]).slice(1));
           }
           else if (cardTypes.length == 0){
            frontcard[button.number] = 'white';
            // トランプとは関係のない数字を入れる
            frontcardNumber[button.number] = 100;
            console.log('hi')
           }
      }

  }

  // 右側のボタンが押されたとき（右側をdirection == 1としている）
  if(button.direction == 1){
    // 山札がないときに山札のボタンが押されたとき
    if (button.number == 10&&cardTypes.lenght == 0){
      // 何もしない
    }
    // 押したボタンが山札のボタンで、山札の残りが一枚以上のとき
    // 山札のボタンだったら
    if (button.number == 10&&cardTypes.length > 0){
      overcard[1] = cardTypes.pop();
      console.log(overcard[1]);
      overcardNumber[1] = Number(overcard[1].slice(1));
      resetcount ++;
      flipSound.play();

    }
    //山札のボタンで山札が残り一枚のとき
    else if (button.number == 10&& cardTypes.length==1){
      overcard[1] = cardTypes.pop();
      console.log(overcard[1]);
      overcardNumber[1] = Number(overcard[1].slice(1));
      backsideImage = Images['white'];
      // トランプとは関係のない数字を入れる
      frontcardNumber[button.number] = 100;
      resetcount ++;
      flipSound.play();

    }
    // クリックしたカード+-1だったら
    else if (overcardNumber[1] == frontcardNumber[button.number]+1|| overcardNumber[1] == frontcardNumber[button.number]-1) {
        overcard[1] = frontcard[button.number];
        overcardNumber[1] = frontcardNumber[button.number];
        flipSound.play();

        // 山札にまだ残りがあったら
        if (cardTypes.length > 0){

          frontcard[button.number] = cardTypes.pop();
          console.log(frontcard[button.number]);
          frontcardNumber[button.number] = Number((frontcard[button.number]).slice(1));
          // if文のテスト
          textSize(50);
          text(frontcard[button.number], width - 400, 200);
          text(frontcardNumber[button.number], width - 400, 300);
          text(overcardNumber[0], width - 400, 100);
          text(overcardNumber[1], width - 200, 100);
        }
        else if (cardTypes.length == 0){
          frontcard[button.number] = 'white';
        }
    }
  }

}
