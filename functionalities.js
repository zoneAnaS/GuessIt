let dataOfWords=JSON.parse(sessionStorage.getItem("wordData")) || fetchData();
var currentWord;
var worlength;
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
            for(let i=0;i<currentWord.length;i++){
                if(char==currentWord[i]){
                    currentWord.subarr
                    let wordDiv=document.getElementById(`word${i}`);
                    wordDiv.classList.remove("wordHidden")
                    worlength--;
                }
                if(worlength<=0){
                    setTimeout(()=>{
                        onLoad()
                    },1000)
                    
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
    let [word,cat]=getWord();
    let wordarr=word.split("");
    let input_section=document.querySelector(".input-section");
    let categoryText=document.querySelector("#categoryText");
    categoryText.innerHTML=cat.split("_").join(" ");
    input_section.innerHTML="";
    currentWord=word.toLowerCase();
    worlength=word.split(" ").join("").length;
    console.log(currentWord)
    console.log(worlength)
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
    appendWord()
    displayButton();
}

