

"use strict";


let homeSection=document.querySelector('.home-section')
let detailsSection=document.querySelector('.details-section')
let colseDetails= document.querySelector('.close-details')

let shooter = document.querySelector('.shooter')
let mmorpg = document.querySelector('.mmorpg')
let sailing = document.querySelector('.sailing')
let permadeath = document.querySelector('.permadeath')
let superhero = document.querySelector('.superhero')
let displayItems= document.getElementById('display-data')
let detailsData;



let categoryOne  = 'shooter';
let categoryTow= 'mmorpg'
let categoryThree= 'sailing'
let categoryFour= 'permadeath'
let categoryFive= 'superhero'

let apiData=[] ;


// ///////////////////



document.getElementById("navbar").onclick = function(e) {
      // نتأكد إن اللي اتضغط عليه فعلاً لينك من نوع nav-link
      if (e.target.classList.contains("nav-link")) {
        // نشيل كلاس active من أي لينك تاني
        let current = document.querySelector(".nav-link.active");
        if (current) current.classList.remove("active");

        // نحط كلاس active على اللي اتضغط عليه
        e.target.classList.add("active");
      }
    }


const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=`;

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '79e972bcb6mshaa012148b9a882dp1ffb64jsn6d7c3f3e983b',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};


// ////////////////

const urlDetaails = 'https://free-to-play-games-database.p.rapidapi.com/api/game?id=452';


const optionsDetails = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '79e972bcb6mshaa012148b9a882dp1ffb64jsn6d7c3f3e983b',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};



async function getGame( parameter="shooter"){

try {

let lod = document.getElementById('lod').classList.remove('d-none')

let response= await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${parameter}`, options)

if(response.ok){

 apiData = await response.json()

 displayData()
lod = document.getElementById('lod').classList.add('d-none')

}

} catch (error) {


	console.log('errrrorrr' , error);
	

}

}

 getGame()



function categoryNav(){


shooter.addEventListener('click', function(){

getGame(categoryOne)

displayData()
})

mmorpg.addEventListener('click', function(){

getGame(categoryTow)

displayData()
})

sailing.addEventListener('click', function(){

getGame(categoryThree)

displayData()
})


permadeath.addEventListener('click', function(){

getGame(categoryFour)

displayData()
})


superhero.addEventListener('click', function(){

getGame(categoryFive)

displayData()
})


}


categoryNav()




 function displayData(){

  let cartona=``

for( let i =0 ; i <apiData.length; i ++){

cartona+=`

<div onclick="closeSection()" class="col">
      <div onclick="detailsGame(${apiData[i].id}) " class="card bg-dark text-white main-card" style="width: 18rem;">
  <img src="${apiData[i].thumbnail }" class="card-img-top w-100" alt="...">
  <div class="card-body">
   <div class="d-flex justify-content-between">
<a href="#" class="fw-bolder game-title ">${apiData[i].title}</a>
<a href=" ${apiData[i].freetogame_profile_url}" class=" btn btn-info btn-card "> free</a>
   </div>
    <p class="card-text text-center pt-1"> ${apiData[i].short_description.slice(' ', 40) } </p>
  </div>
  <div class="card-footer d-flex justify-content-between">
    <a href="#"> ${apiData[i].genre} </a>
    <a href="#"> ${apiData[i].platform} </a>
  </div>

</div> 

</div>

`
}

displayItems.innerHTML=cartona

}




async function detailsGame(id){


  try {

let response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}` , optionsDetails)

if(response.ok){

detailsData= await response.json()
displayDetails()

}


  } catch (error) {
    

console.log('errrrrrrrrrrrrrrrrrorrrrrrrr' , error)

  }


}

// detailsGame()




 function displayDetails(){

let imgDes= document.querySelector('.img-des')
let titleDet=document.querySelector('.title-det')
let category = document.querySelector('.category-det')
let platform = document.querySelector('.platform-det')
let status = document.querySelector('.status-det')
let paragraph = document.querySelector('.paragraph-det')
let btnDetails= document.querySelector('.btn-details')


imgDes.setAttribute('src' , `${detailsData.thumbnail}`) 
titleDet.innerHTML=` name game <span class="text-info"> >></span> :${ detailsData.title}`
category.innerHTML=`category game  <span class="text-primary fw-light">>>></span>:  ${ detailsData.genre}`
platform.innerHTML=`platform  <span class="text-primary fw-light">>>></span> ${ detailsData.platform}`
status.innerHTML=`status <span class="text-primary fw-light">>>></span>:  ${ detailsData.status}`
paragraph.innerHTML=`discription <span class="text-primary fw-light">>>></span>:  ${ detailsData.description}`
btnDetails.setAttribute('href',  `${ detailsData.game_url}`  )


}





function closeSection(){

homeSection.classList.add('d-none')
  detailsSection.classList.remove('d-none')



}

function closeDetailsSection(){

  detailsSection.classList.add('d-none')


homeSection.classList.remove('d-none')

}
