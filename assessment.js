'use strict';
/*厳格モード
記述ミスをエラーとしてHPに表示をしてくれるようになる*/

const userNameInput = document.getElementById('user-name');
//入力された名前を取得
const assessmentButton = document.getElementById('assessment');
//診断ボタンについて取得
const resultDivided = document.getElementById('result-area');
//結果表示ついて取得
const tweetDivided = document.getElementById('tweet-area');
//ツイートボタンについて取得

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while(element.firstChild){
        //子どもの要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    //「() =>」はアロー関数で、無名関数「function()」と同義
    //ボタンが押されたときに、メッセージ表示する関数を動かす。
    const userName = userNameInput.value;
    //valueプロパティで、入力された文字列を受け取れる。
    if(userName.length === 0){
        //名前入力が空の時は処理を終了する
        return;
        //returnは、戻り値なしで処理終了。breakみたいな感じ。
        //こういう終了させる処理を「ガード句」という。
    }
    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);//子の要素の削除（リセット）
    const header = document.createElement('h3');
    //要素の作成：headerにh3タグという要素を作成
    header.innerText = '診断結果';
    //headerに作ったタグの中身を設定
    resultDivided.appendChild(header);
    //HTMLの結果表示のdivタグの子(Child)にheaderを追加(append)

    const paragraph = document.createElement('p');
    //要素の作成：paragraphにpタグという要素を作成
    const result = assessment(userName);
    //診断結果をresultに入れる
    paragraph.innerText = result;
    //pタグの中身にresult（診断結果）が入るようにする
    resultDivided.appendChild(paragraph);
    //HTMLの結果表示のdivタグの子(Child)にparagraphを追加(append)

    //ツイートエリアの作成
    removeAllChildren(tweetDivided);//子の要素の削除（リセット）
    const anchor = document.createElement('a');
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたのいいところ') +
        //「あなたのいいところ」が英数になるように関数で変換
        '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    //href属性の"hrefValue"を、anchorにセットする
    anchor.className = 'twitter-hashtag-button';
    //Attributeでなくても、classはこれで属性セットできる
    anchor.setAttribute('data-text', result);
    //data-text属性の"診断結果の文章"を、anchorにセットする
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    //中身の文章をセット

    //widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown = event => {
    if (event.key === 'Enter'){//event.keyでキーを判別
        assessmentButton.onclick();
        //onclickに代入されている関数を呼び出す記述
    }
};

const answers = [/*const（定数）：一度代入したら再代入できない*/
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];
/*カーソルを複数にする方法
１ 複数選択したい文の一番最初にカーソルを置く。
２ CTRL＋ALT＋↓で複数選択していく。
３ Endを押すと、行の一番最後のところに行ける。*/

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * 
 * userNameという引数でユーザーの名前が文字列で渡される
 * @param {string} userName
 * 
 * 戻り値は、診断結果の文字列
 * @return {string}
 */
function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    //letは、{}の中でのみ使うようにできるので、varより安全
    for (let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    const index = sumOfCharCode % answers.length;
    //コード番号の和を、回答パターンの数で割った余りを出す
    let result = answers[index];
    //余りの値に応じた回答パターンを、結果として出力

    result = result.replace(/\{userName\}/g, userName);
    /* /\{userName\}/g：正規表現
    replaceは「文字列{userName}を、変数userNameに置き換える」の意味
    通常、置き換えは1回しか起きないが、
    正規表現の「/g」によって全部置き換わるようになっている。*/
    
    return result;
}

//テストコード
console.assert(
    assessment('太郎') ===
        '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        //関数assessmentの結果、表示させたい正しい文章
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    //正しい文章にならなかったときのエラーメッセージ
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '同じ名前の入力に対して、違う結果が表示されています。'
)
