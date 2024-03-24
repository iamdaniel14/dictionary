

const MAIN_CONTAINER=document.querySelector ("#main-container");
let word_input= document.querySelector ("#wordInput");
const SEARCH_BUTTON =document.querySelector ('#searchButton');
const SEARCHED_WORD=document.querySelector("#searchedWord");

SEARCH_BUTTON.addEventListener ("click", ()=>{
let word=(word_input.value).trim ().toLowerCase();
words (word);
SEARCHED_WORD.innerHTML=word;
SEARCHED_WORD.classList.add ("searched-word");

});

async function words (word){
try { 
let Response= await fetch (`https://api.wordnik.com/v4/word.json/${word}/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=c1raqaa3pes2o7qqqkgrrgmtv4qe9qx181le2gy2xqs148ief`);
let data = await Response.json();

 
let filteredData=data.filter(definition=>{ 
 return ( typeof definition.text !=="undefined") ; //return true if data is not undefined
 })

 displayData (filteredData); //call the displayData function

} catch (err){
console.error(err);
console.log ("data is not fetch")
}
}



function displayData (filteredData){
 MAIN_CONTAINER.innerHTML="";
 filteredData.forEach ((wordDefinition) => {
 const SUB_CONTAINER=document.createElement ('div');
 SUB_CONTAINER.classList.add ("sub-container");

//  if (wordDefinition.text!==undefined) {  //if the definition is not undefined
 let word=document.createElement('p');
 word.innerHTML=wordDefinition.word;
 word.classList.add ('word');
 SUB_CONTAINER.appendChild (word);

 let partSpeech =document.createElement ("p");
 partSpeech.classList.add ("part-of-speech");
 partSpeech.innerHTML=wordDefinition.partOfSpeech;
 SUB_CONTAINER.appendChild(partSpeech);


 let p=document.createElement('p');
 p.innerHTML=wordDefinition.text;
 p.classList.add ('paragraph');
 SUB_CONTAINER.appendChild (p);
 MAIN_CONTAINER.appendChild(SUB_CONTAINER);

});

}
