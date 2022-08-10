//tmp一次保存を利用してみたファイル

// 画像の変数
var Images = [];
var backImage;
var backgroundImage;
var backsideImage;


// スプライトの変数
var leftbuttonSprite;
var rightbuttonSprite;
var backside;

// // サウンドの変数
// var flipSound;
// var correctSound;
// var completedSound;

// ゲーム管理の変数
var allcard = [];
var timer = 0;
var right;
var left;

// var frontcard = ['0','0','0','0'];
var frontcard = [];

var frontcardNumber = [0,0,0,0];

// var overcard = ['0','0'];
var overcard = [];

var overcardNumber = [0,0];
var overcardhistory = [['0'],['0']];

// カードのタイプを配列で表す
var cardTypes = [
  's1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13',
  'c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12','c13'
];

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

  //カードの裏の画像をロード
  backsideImage = loadImage('img/backside.png');
  // ボタンの画像をロード
  rightbuttonImage = loadImage('img/rightbutton.png');
  leftbuttonImage = loadImage('img/leftbutton.png');
  // 背景画像のロード
  // backgroundImage = loadImage('background.png');

  // // カードをめくった時の音をロード
  // flipSound = loadSound('turn_card.mp3');
  // // カードのペアがそろった時の音をロード
  // correctSound = loadSound('correct.mp3');
  // // カードのペアが全てそろった時の音をロード
  // completedSound = loadSound('completed.mp3');
}


// 初期化（最初の一回のみ）
function setup() {
  createCanvas(windowWidth, windowHeight);
  


 var spade_cardTypes = [
  's1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13'
  ]

 var club_cardTypes = [
  'c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12','c13'
 ]

  // カードをシャッフルする
  function shuffleCards(cardTypes) {
    // 100回シャッフルする
    for (var i = 0; i < 100; i++) {
      // シャッフルするカードをランダムに決める
      var random1 = floor(random(27));
      var random2 = floor(random(27));
      // random1で決めたカードのタイプを一時的に保存
      var savedType = cardTypes[random1];
    // random1で決めたカードのタイプをramdom2で決めたカードのタイプに変える
      cardTypes[random1] = cardTypes[random2];
      // random2で決めたカードのタイプを一時的に保存していたカードのタイプに変える
      cardTypes[random2] = savedType;
    }
      
    return cardTypes;
  }
    


  // カードをシャッフルする
  cardTypes = shuffleCards(cardTypes);


  for (var i = 0;i<2;i++){
    // 向こう側のカードのラベルの配列を作る
    if (cardTypes.length != 0){
        var tmp = cardTypes.pop();
        overcardhistory[i][0] = tmp;
        overcard[i] = tmp;
        tmp = tmp.slice(1)
        // 向こう側のカードの数字の配列をつくる
        overcardNumber[i] = Number(tmp);
        // overcard[i] = tmp;
    }
  }

  for (var i = 0;i<4;i++){
    // 手前側のカードのラベルの配列を作る
    if (cardTypes.length != 0){
        var tmp = cardTypes.pop();
        frontcard[i] = tmp;
        tmp = tmp.slice(1);
        // 手前側のカーの数字の配列をつくる
        frontcardNumber[i] = Number(tmp);
        // frontcard[i] = tmp;
    }
  }




  var buttonGroup = new Group();
  // 左のボタンを作成
  for (var i = 0; i < 4; i++) {
    // スプライトを作る
    var leftbuttonSprite =createSprite(180 + 400 * i, 1150 );
    buttonGroup.add(leftbuttonSprite);
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
    var rightbuttonSprite =createSprite(280 + 400 * i, 1150 );
    buttonGroup.add(rightbuttonSprite);
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

  var backside = createSprite(1400,800);
  backside.scale = 0.5;
  backside.addImage(backsideImage);

    

}




// 描画
function draw() {
  // 背景を表示する
  // background(backgroundImage);
  

  // カウントダウン
  timer++;



// スプライトを作る
for(var i = 0; i < 2; i++){
    var overcardSprite = createSprite(600+400*i, 400 );
    overcardSprite.scale = 0.35;
    // スプライトにオモテの絵を追加
    // overcardSprite.addImage(Images[overcard[i]]);
    var tmp = overcard[i];
    overcardSprite.addImage(Images[tmp]);

}


// 手元のカードの生成×４
  for (var i = 0; i < 4; i++) {
    // スプライトを作る
    var frontcardSprite =createSprite(236 + 400 * i, 900 );
    // frontcardGroup.add(frontcardSprite);
    frontcardSprite.scale = 0.35;
    // スプライトにオモテの絵を追加
    var tmp = frontcard[i];
    frontcardSprite.addImage(Images[tmp]);
  }

    // 全てのスプライトを表示する
    drawSprites();
}


// カードがクリックされた時の処理
function clicked(button) {
  // クリックしたボタンが左の場合
  if(button.direction = 0){
      // クリックしたカード+-1だったら
      if (overcardNumber[0] == frontcardNumber[button.number]+1|| overcardNumber[0] == frontcardNumber[button.number]-1) {
        textSize(50);
        text('H', width - 400, 400);
        overcard[0] = frontcard[button.number];
        overcardNumber[0] = frontcardNumber[button.number];
        overcardhistory[0].push(overcard[0]);
        overcardSprite.addImage(overcard[0]);

        if (cardTypes.length != 0){
          var tmp = cardTypes.pop(); 
          frontcard[button.number] = tmp;
          var tmp = frontcard[button.number]
          frontcardNumber[button.number] = Number(tmp.slice(1));
        }
        // frontcard[button.number] = tmp;
        
      }
  }

  if(button.direction = 1){
    // クリックしたカード+-1だったら
    textSize(50);
    text('H', width - 400, 400);
    if (overcardNumber[1] == frontcardNumber[button.number]+1|| overcardNumber[1] == frontcardNumber[button.number]-1) {

      overcard[1] = frontcard[button.number];
      overcardNumber[1] = frontcardNumber[button.number];
      var tmp = overcard[1];
      overcardhistory[1].push(tmp);

      
      if (cardTypes.length != 0){
        var tmp = cardTypes.pop();
        frontcard[button.number] = tmp;
        var tmp = frontcard[button.number];
        frontcardNumber[button.number] = Number(tmp.slice(1));
      }
      // frontcard[button.number] = tmp;
    }
  }
}


