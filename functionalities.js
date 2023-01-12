
getWord()
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
            // console.log(this)
            getWord()
        })
    })
    
}
displayButton()



//function to get the word from the database
async function getWord(){
    let baseUrl="https://63be9d23f5cfc0949b5c0e32.mockapi.io/AllWords/";
    //all available categories
    //["Vehicle","Vegetable","Fruit","Land_Animal","Ocean_Animal","Food_Dish","Country","Non_Indian_City","Indian_City","Flower"];
    //generating random number from 0-9
    let category_id=Math.ceil(Math.random()*10);
    let data = await fetch(baseUrl+category_id,{

    })
    let res=await data.json();
    let index=Math.floor(Math.random()*res.Data.length);
    let catagoryText=document.getElementById("category");
    let wordText=document.getElementById("word");
    catagoryText.innerHTML=res.Category.split("_").join(" ");
    wordText.innerHTML=res.Data[index];
}
