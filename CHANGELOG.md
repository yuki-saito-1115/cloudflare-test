<!--
このCHANGELOGはCursor（AI）によって、各リリース（タグ）ごとの変更内容を記録しています。
更新の際は、下記のプロンプトを適宜書き換えて生成してください。
また、このファイルの更新は release ブランチで行なってください。

```
現在のブランチとmainブランチを比較し、その差分を次のバージョンのCHANGELOGとして、[セマンティックバージョニング](https://semver.org/lang/ja/)準拠でMarkdown形式で作成して。

- 対象バージョン: vX.Y.Z
- 追加・修正・変更の3分類でまとめて
- コミットメッセージに「BREAKING CHANGE」や「!」が含まれていたら「破壊的な変更」として分類して
- 日付は仮で「YYYY-MM-DD」としてOK
- 既存のCHANGELOG.mdに追記する形で
```
-->

# Changelog

すべての著しい変更点はこのファイルに記載されます。

このプロジェクトは [セマンティック バージョニング](https://semver.org/lang/ja/) を採用しています。

## [v0.0.10](https://gitlab.mitsue.com/sdn/sandbox/saito-yuuki/xia/-/releases/v0.0.10) - 2025-07-17

### 追加
- Cursorの設定ファイルのひな型を追加

### 修正
- AstroとViteにキャッシュ設定を追加

## v0.0.9 - 2025-07-17

### 追加
- remark-directive導入により、MDXでカスタムディレクティブの利用を可能に
- カスタムディレクティブのためのAstroコンポーネントとデモページを追加

### 修正
- remark-directive導入のため各種リンター設定変更

## [v0.0.8](https://gitlab.mitsue.com/sdn/sandbox/saito-yuuki/xia/-/releases/v0.0.8) - 2025-07-17

### 修正
- TypeScriptの設定変更

## v0.0.7 - 2025-07-17

### 追加
- Tailwind CSSインストール
- CMS BOOSTからグローバルスタイルとレイアウト用コンポーネントを流用
- CMS BOOSTからアイコン画像等のリソースファイルを流用

## v0.0.6 - 2025-07-17

### 修正
- TypeScriptの設定変更
- Biomeの設定変更

## v0.0.5 - 2025-07-15

### 追加
- TypeScriptインストール
- @astrojs/checkインストール
- VSCodeのBiome関連設定を有効に

### 修正
- TypeScriptの設定変更

### 変更

## v0.0.2～v0.0.4 - 2025-07-15

### 追加
- `CHANGELOG.md`（変更履歴ファイル）の追加
- `CONTRIBUTING.md`（コントリビュートガイドライン）の追加
- `LICENSE`（MITライセンスファイル）の追加

## v0.0.1 - 2025-07-15

### 追加
- Hookスクリプトの除外
- LFS（Large File Storage）とEOL（改行コード）設定
- prepareコマンドの整備
- Biomeによる自動フォーマット導入
- CSS・JSONなどの設定追加
- EditorConfigの設定
- Biomeコマンド追加
- Biomeのインストール
- Astroのインストール
- VSCode用の各種設定ファイル追加
