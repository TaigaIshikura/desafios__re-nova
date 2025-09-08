# ◆CSS  
CSSは以下設計を統一ルールとする。  
  
## 【基本構成】  
* base.css→リセット系やbodyに与えるcssなどベースとなるものを記述するCSS  
* layout.css→ヘッダー、フッター、コンテンツエリアなどページ共通で使用する内容を記述するCSS    
* module.css→サイト内で使いまわすモジュールを記述するCSS    
* uniq（ページ名）.css→ページを構成する内容を記述するCSS    
  
## 【クラス命名】  
BEM記法の考えを基に、以下で構成する。  
* 子要素のクラスは「__（アンスコ2個）」を付ける。  
* 修飾クラスは「_（アンスコ1個）」を付ける。  
* モジュールの場合は頭に接頭辞「m-」を付ける。  
  
（BEM記法とは）  
ページを構成する要素（オブジェクト／コンポーネント）を、３つに分類（B:Block、E:Element、M:Modifier）する考え方  
  
例：

    <div class="box">  
      <ul class="box__list">  
        <li class="box__list__item">子要素はアンスコ2個で繋げていく</li>  
        <li class="box__list__item _type-02">修飾クラスはアンスコ1個付ける</li>  
      </ul>  
    </div>  
    <p class="m-text-01">モジュールクラスは、頭にm-を付ける</p>  
  
# ◆HTML  
HTMLは以下設計を統一ルールとします。  
  
## 【構成】※クラス名はトップを例として記載しています。  
### ・ヘッダー  
#headerAreaのIDで作成  
  
### ・コンテンツエリア  
#contentsAreaのIDで作成  
  
#### ★セクション  
階層：コンテンツエリア（contentsArea）→*セクション（section）*  
例：#contentsArea → .top-section-01  
  
* ユニークなクラス名を付与。基本的にはページ名を頭につけて、「ページ名-section-XX」とする。  
* 基本的にはdivで定義し、必要に応じてsectionタグで囲む。  
  
#### ★ブロックス  
階層：コンテンツエリア（contentsArea）→セクション（section）→*ブロックス（blocks）*  
例：#contentsArea →  .top-section-01 → .blocks-01  
  
* blocks-XXと順に付与する  
  
#### ★ブロック  
階層：コンテンツエリア（contentsArea）→セクション（section）→ブロックス（blocks）→*ブロック（block）*  
例：#contentsArea → .top-section-01 → .blocks-01 → .list  
  
* 「list」「text」や「btn」など親となるblocks内でユニークな名前を付ける。  
* 同じブロック名を付けたい場合は、2番目以降に「text-02」と識別番号を付与する。  
  
#### ★エレメント  
階層：コンテンツエリア（contentsArea）→セクション（section）→ブロックス（blocks）→ブロック（block）→*エレメント（element）*  
例：#contentsArea → .top-section-01 → .blocks-01 → .list → .list__item  
  
* 要素（element）については、クラス名（例の場合list__item）は必須ではない。必要に応じて付ける。  
  
#### ★修飾クラス  
例えば、ほとんど同じ見た目だが、色だけ異なる場合などは、修飾クラスを活用する  
修飾クラスは、セクション（section）～エレメント（element）まで、どこで使用しても良い。  
  
例：  
.blocks-01._layout-type-02  
.list._color-red  
p._font-large  
  
### ◆フッター  
#footerAreaのIDで作成  
  
以上が、HTMLの基本設計である。  
    
※上記ルールに沿った、HTMLソース例  

    <header id="headerArea">  
    </header>

    <article id="contentsArea">  
      <section>  
        <div class="top-section-01">  
          <div class="blocks-01">  
            <div class="title">  
               <h1></h1>  
            </div>  
          </div>  
          <div class="blocks-02">  
            <ul class="list">  
              <li class="list__item"></li>  
              <li class="list__item _color-red"></li>  
              <li class="list__item"></li>  
            </ul>  
          </div>  
        </div>  
      </section>  
    </article>  
  
    <footer id="footerArea">  
    </footer>  
