# SVG icon list for Where Does My Money Go?

[Where Does My Money Go? （税金はどこへ行った？）](http://spending.jp)で利用する SVG アイコンを一覧で確認できるサイト、それが [SVG icon list for Where Does My Money Go?](http://jmblog.github.io/spendingjp-icons/) です。

## 必要なもの
* [Node.js](http://nodejs.org/)
* [Yeoman](yeoman.io)
* [Bower](bower.io)
* [Grunt](gruntjs.com)

## インストール

```bash
$ git clone git@github.com:jmblog/spendingjp-icons.git
$ cd spendingjp-icons/
$ npm install
$ bower install
```

## サイトの更新方法

SVGファイルを追加、変更する場合や、サイトを修正する場合は次のような手順を取ります。

1. `app` ディレクトリ以下のソースを変更する。SVGファイルを追加・変更する場合は `app/icons`。

2. `$ grunt server` を実行する。ローカルサーバーが起動し、ブラウザが自動的に開くので、変更内容が反映されているか確認する。

3. 問題がなければ `$ grunt` を実行して本番用のソースをビルドする。`dist` ディレクトリに本番用のソースが展開される。

4. `master` ブランチにコミットする。

5. `$ git push orign master` でプッシュする。

6. `$ git subtree push --prefix dist origin gh-pages` を実行して本番サーバー（Github pages）にデプロイする。

`git-subtree` を利用したデブロイ方法については https://github.com/yeoman/yeoman/wiki/Deployment を参照のこと。

## ご意見・ご要望は

「SVGファイルを追加したい」「こんな機能が欲しい」などリクエストのある方は、[issue](https://github.com/jmblog/spendingjp-icons/issues) でお願いします。もちろん Pull Request も大歓迎です。
