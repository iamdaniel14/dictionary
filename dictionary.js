

const MAIN_CONTAINER=document.querySelector ("#main-container");
let word_input= document.querySelector ("#wordInput");
const SEARCH_BUTTON =document.querySelector ('#searchButton');

SEARCH_BUTTON.addEventListener ("click", ()=>{
console.log (word_input.value);
let word=(word_input.value).trim ().toLowerCase();

    words (word);


});
// console.log (word_input.value);


async function words (word){
let Response= await fetch (`https://api.wordnik.com/v4/word.json/${word}/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=c1raqaa3pes2o7qqqkgrrgmtv4qe9qx181le2gy2xqs148ief`);
let data = await Response.json();
console.log (data);
showDefinition (data)

}


function showDefinition (wordData){

MAIN_CONTAINER.innerHTML="";
 wordData.forEach ((wordDefinition) => {
// console.log (wordDefinition)
//  console.log (wordDefinition.text);
//  console.log (wordDefinition.word);

 const SUB_CONTAINER=document.createElement ('div');
 SUB_CONTAINER.classList.add ("sub-container");
 if (wordDefinition.text!==undefined) {  //if the definition is not undefined
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

 
//  let sourceDictionary=document.createElement('p');
//  sourceDictionary.classList.add ('sourceDictionary');
//  sourceDictionary.textContent=wordDefinition.sourceDictionary;
//  SUB_CONTAINER.appendChild (sourceDictionary);

//  console.log (SUB_CONTAINER)
}

 MAIN_CONTAINER.appendChild(SUB_CONTAINER);

});

}
