# Next.js intercepting-routes & parallel-routes

https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
https://nextjs.org/docs/app/building-your-application/routing/parallel-routes

## `/`

- to `test`
    - with `next/link`: show `test-dialog` with dialog
    - with direct: show `test-page`

- to `test2`
    - with `next/link`: show `test-2-dialog` with dialog
    - with direct: show `test-2-page`

- to `/test2/1`
    - with `next/link`: not working
    - with direct: show `test-2-1-page` 

### 解説

`app/page.tsx`は`app/@dialog`をintercepting routesとして扱い、`app/layout.tsx`で`@dialog`の扱いを決定する。  
`app/@dialog`以下には`(.)test`と`(.)test2`が含まれており、それぞれ`app/test`と`app/test2`にマッチする。  
結果、`Link`での遷移にてそれらのルートがインターセプトされる。
しかし、`app/test2/1`にマッチするルートは`app/@dialog`存在しないため、`Link`での遷移は失敗する。

## `/test2`

- to `/test2/1`
    - with `next/link`: show `test-2-1-dialog` with dialog
    - with direct: show `test-2-1-page`

`app/test2/page.tsx`は`app/test2/@dialog`をintercepting routesとして扱い、`app/test2/layout.tsx`で`@dialog`の扱いを決定する。  
`app/test2/@dialog`以下には`(.)1`が含まれており、`app/test2/1`にマッチする。  
結果、`Link`での遷移にてルートがインターセプトされる。  

## メタ読み

以下の例でapp直下以外での`@`ディレクトリの使用があったので、階層の縛りはないだろうと判断した。  
https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes#modals  

この機能の難しいところは、`(.)`等のパス階層のマッチングを意識しつつ`page.tsx`、`layout.tsx`、`default.tsx`の3つのファイルの関係性を理解することだと思う。  
一度慣れてしまえば、インターセプト側をDialogにする前提なら結構簡単に書けるので良い。

### ファイルの役割

`page.tsx`は一致したら値を`layout.tsx`に渡すだけ。  
その際の命名はインターセプト名(`@`)と同じで、省略されていた場合は`children`。  

`layout.tsx`は複数のインターセプターから受け取った値(`page.tsx`の結果)を元に、それらをどう扱うかを決定する。  

`default.tsx`は`layout.tsx`内で指定されたインターセプターが存在しなかった場合のデフォルト値を定義する。  
要は適切な`page.tsx`が存在しなかった場合のフォールバック。  
