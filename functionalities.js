let scoreText=document.querySelector("#scoreText");


let dataOfWords=JSON.parse(sessionStorage.getItem("wordData")) || fetchData();
var currentWord;
var worlength;
var score=0;
var is=true;
var totalLives=6;
var lives=totalLives;


// HighScore from localStorage
let highScore=Number(localStorage.getItem("GuessItHighScore")) || 0;

//onload function
onLoad()





//function to display button
function displayButton(){
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let cont = document.querySelector(".word-typing-section");
    cont.innerHTML = "";
    for (let alphabets of str) {
        cont.innerHTML += `<button class="alphabet-buttons" data-id=${alphabets}>${alphabets}</button>`;
    }
    let btn=document.querySelectorAll(".alphabet-buttons");
    btn.forEach((item)=>{
        item.addEventListener("click",function(){
            let char=item.innerHTML.toLowerCase();
           

            if(is && this.dataset.id!=-1){
                this.dataset.id=-1;
                let  present=false;
                for(let i=0;i<currentWord.length;i++){
                    if(char==currentWord[i]){
                        present=true;
                        currentWord.subarr
                        let wordDiv=document.getElementById(`word${i}`);
                        wordDiv.classList.remove("wordHidden")
                        // currentWord[i]=-1;
                        let arr=currentWord.split("");
                        arr[i]=0;
                        currentWord=arr.join("");
                        // console.log(currentWord)
                        worlength--;
                    }
                    if(worlength<=0){
                        is=false;
                        score++;
                        if(score>highScore){
                            localStorage.setItem("GuessItHighScore",score);
                            console.log("New High-Score is "+score)
                        }
                        setTimeout(()=>{
                            onLoad()
                        },1000)
                        break;
                    }
                    
                }
                if(present){
                    //green colored disabled button
                    this.classList.remove("alphabet-buttons");
                    this.classList.add("greenDisabled");
                    this.classList.add("disabled");
                }else{
                    //red coloured disabled button
                    this.classList.remove("alphabet-buttons");
                    this.classList.add("redDisabled");
                    this.classList.add("disabled");
                    lives--;
                    console.log(lives)
                    displayLives()
                    if(lives==0){
                        score=0;
                        console.log("Game Over");
                        setTimeout(()=>{
                            onLoad()
                        },2000)
                    }
                    
                }
            }
            
        })
    })
    
}

//function to get the data from the database
async function fetchData(){
    let baseUrl="https://63be9d23f5cfc0949b5c0e32.mockapi.io/AllWords/";
    let data = await fetch(baseUrl)
    let res=await data.json();
    // console.log(1)
    sessionStorage.setItem("wordData",JSON.stringify(res));
    return res;
    
}
function getWord(){
    //this funtion returns an array of size 2 where [word,category]
    let category_id=Math.floor(Math.random()*dataOfWords.length);
    // console.log(category_id)
    let index=Math.floor(Math.random()*dataOfWords[category_id].Data.length);
    return [dataOfWords[category_id].Data[index],dataOfWords[category_id].Category];
}
//appends word on the dom

function appendWord(){
    scoreText.innerHTML=score;
    let [word,cat]=getWord();
    let wordarr=word.split("");
    let input_section=document.querySelector(".input-section");
    let categoryText=document.querySelector("#categoryText");
    categoryText.innerHTML=cat.split("_").join(" ");
    input_section.innerHTML="";
    currentWord=word.toLowerCase();
    worlength=word.split(" ").join("").length;
    console.log(currentWord)
    wordarr.forEach((item,i)=>{
        if(item!=" "){
            input_section.innerHTML+=`<div class="wordanas">
            <h1 id=word${i} class="wordHidden">${item.toUpperCase()}</h1>
        </div>`
        }else{
            input_section.innerHTML+=`<div class="spaceLetter">
            <h1 id=word${i} class="wordHidden"></h1>
        </div>`
        }
        
    })

}
function onLoad(){
    lives=totalLives;
    displayLives()
    is=true;
    appendWord()
    displayButton();
}

//displau lives
function displayLives(){
    let livesText=document.querySelector("#livesText");
    let n=totalLives;
    livesText.innerHTML="";
    for(let i=0;i<n-lives;i++){
        livesText.innerHTML+=`<i class="fa-regular fa-heart"></i>`;
    }
    for(let i=0;i<lives;i++){
        livesText.innerHTML+=`<i class="fa-solid fa-heart"></i>`;
    }
}

