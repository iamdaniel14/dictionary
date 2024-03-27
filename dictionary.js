

const MAIN_CONTAINER=document.querySelector ("#main-container");
let word_input= document.querySelector ("#wordInput");
const SEARCH_BUTTON =document.querySelector ('#searchButton');
const SEARCHED_WORD=document.querySelector("#searchedWord");
const RELATED_WORDS_CONTAINER=document.querySelector(".related-words-container");


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


let ResponseRelatedWord=await fetch (`https://api.wordnik.com/v4/word.json/${word}/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=c1raqaa3pes2o7qqqkgrrgmtv4qe9qx181le2gy2xqs148ief`);
let relatedWordsJason = await ResponseRelatedWord.json();
// console.log (relatedWordsJason);
showRelatedWord(relatedWordsJason);
 
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

 function showRelatedWord(relatedWords){

 RELATED_WORDS_CONTAINER.innerHTML="";
relatedWords.forEach ((relatedWordsArray,index)=>{

let words_container=document.createElement ("div");
words_container.classList.add ("words_container");
console.log(words_container);

 console.log (index);
 let relationshipType=document.createElement ("h1");
 relationshipType.classList.add ("relationship-type")
 relationshipType.innerHTML=`relationship type ${relatedWordsArray.relationshipType}`;
 words_container.appendChild(relationshipType);
 
console.log (`relationship type ${relatedWordsArray.relationshipType}`);
relatedWordsArray.words.forEach((word)=>{
let similar=document.createElement ("p");
similar.classList.add ("similar-word")
similar.innerHTML=`${word}`;
words_container.appendChild(similar);
});

RELATED_WORDS_CONTAINER.appendChild(words_container);

})

 }
