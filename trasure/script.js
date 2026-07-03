// ======================================
// 宝探しゲーム
// script.js Part 1
// ======================================

// ---------- 要素取得 ----------
const settingsPanel = document.getElementById("settingsPanel");
const gameArea = document.getElementById("gameArea");

const treasureContainer = document.getElementById("treasureContainer");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const confirmButton = document.getElementById("confirmButton");
const openAllButton =
document.getElementById("openAllButton");
const showSettingsButton = document.getElementById("showSettings");

const boxCountInput = document.getElementById("boxCount");
const winCountInput = document.getElementById("winCount");
const loseCountInput = document.getElementById("loseCount");

const winImageInput = document.getElementById("winImage");
const loseImageInput = document.getElementById("loseImage");

const imageSettings =
document.getElementById("imageSettings");

let winImage = "images/win.png";
let loseImage = "images/lose.png";

// ---------- 状態 ----------
let mode = "image";

let boxCount = 6;
let winCount = 1;
let loseCount = 2;

let contents = [];
let selectedIndex = null;
let opened = [];

// ======================================
// モード取得
// ======================================

function getMode(){

function updateMode(){

    mode=getMode();

    if(mode==="image"){

        imageSettings.style.display="block";

    }

    else{

        imageSettings.style.display="none";

    }

}

    const radios = document.getElementsByName("mode");

    for(const r of radios){

        if(r.checked){

            return r.value;

        }

    }

    return "image";

}

winImageInput.addEventListener("change",(e)=>{

    const file=e.target.files[0];

    if(file){

        winImage=URL.createObjectURL(file);

    }

});

loseImageInput.addEventListener("change",(e)=>{

    const file=e.target.files[0];

    if(file){

        loseImage=URL.createObjectURL(file);

    }

});

// ======================================
// シャッフル
// ======================================

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

    return array;

}

// ======================================
// 中身生成
// ======================================

function createContents(){

    contents=[];

    mode=getMode();

    boxCount=parseInt(boxCountInput.value);
    winCount=parseInt(winCountInput.value);
    loseCount=parseInt(loseCountInput.value);

    if(winCount<0) winCount=0;
    if(loseCount<0) loseCount=0;

    if(winCount+loseCount>boxCount){

        alert("当たり＋ハズレが宝箱数を超えています。");
        return false;

    }

    // ----------------------
    // 画像モード
    // ----------------------

    if(mode==="image"){

        for(let i=0;i<winCount;i++){

            contents.push({
                type:"win",
                value:winImage
            });

        }

        for(let i=0;i<loseCount;i++){

            contents.push({
                type:"lose",
               value:loseImage
            });

        }

      while(contents.length<boxCount){

    contents.push({

        type:"blank"

    });

}

    }

    // ----------------------
    // 数字モード
    // ----------------------

    else if(mode==="number"){

        let nums=[];

        for(let i=1;i<=boxCount;i++){

            nums.push(i);

        }

        shuffle(nums);

        for(let n of nums){

            contents.push({
                type:"number",
                value:n
            });

        }

    }

    // ----------------------
    // アルファベット
    // ----------------------

    else{

        const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        shuffle(letters);

        for(let i=0;i<boxCount;i++){

            contents.push({

                type:"alphabet",

                value:letters[i]

            });

        }

    }

    shuffle(contents);

    opened=new Array(boxCount).fill(false);

    return true;

}

// ======================================
// 宝箱表示
// ======================================

function createBoxes(){

    treasureContainer.innerHTML="";

    treasureContainer.className="";

    treasureContainer.classList.add("box"+boxCount);

    selectedIndex=null;

    for(let i=0;i<boxCount;i++){

        const box=document.createElement("div");

        box.className="treasureBox";

        box.dataset.index=i;

        box.textContent="？";

        box.addEventListener("click",()=>{

            if(opened[i]) return;

            document.querySelectorAll(".treasureBox")
                .forEach(b=>b.classList.remove("selected"));

            selectedIndex=i;

            box.classList.add("selected");

        });

        treasureContainer.appendChild(box);

    }

}

// ======================================
// 宝箱を開く
// ======================================

function openBox(index){

    if(index===null) return;

    if(opened[index]) return;

    opened[index]=true;

    const box=treasureContainer.children[index];

    box.classList.remove("selected");
    box.classList.add("opened");

    box.innerHTML="";

    const item=contents[index];

    if(mode==="image"){

       if(item.type==="blank"){

    box.innerHTML="";

}
else{

   if(item.type==="blank"){

    box.innerHTML="";

}

else{

    const img=document.createElement("img");

    img.src=item.value;

    box.appendChild(img);

}

}
    }

    else{

        box.innerHTML="<strong>"+item.value+"</strong>";

    }

    selectedIndex=null;

}

// ======================================
// 決定ボタン
// ======================================

confirmButton.addEventListener("click",()=>{

    if(selectedIndex===null){

        alert("宝箱を選んでください。");
        return;

    }

    openBox(selectedIndex);

});

openAllButton.addEventListener("click",()=>{

    for(let i=0;i<boxCount;i++){

        if(!opened[i]){

            openBox(i);

        }

    }

});

// ======================================
// スタート
// ======================================

startButton.addEventListener("click",()=>{

    if(!createContents()) return;

    createBoxes();

    settingsPanel.style.display="none";

});

// ======================================
// リスタート
// ======================================

restartButton.addEventListener("click",()=>{

    createContents();

    createBoxes();

});

// ======================================
// 設定表示／非表示
// ======================================

showSettingsButton.addEventListener("click",()=>{

    if(settingsPanel.style.display==="none"){

        settingsPanel.style.display="block";

    }else{

        settingsPanel.style.display="none";

    }

});

// ======================================
// モード変更時
// ======================================

document
.querySelectorAll("input[name='mode']")
.forEach(r=>{

    r.addEventListener("change",updateMode);

});

updateMode();
// ======================================
// 初期表示
// ======================================

gameArea.style.display="block";

selectedIndex=null;
opened=[];

createContents();
createBoxes();

