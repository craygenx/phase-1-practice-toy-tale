let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchData()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let form = document.getElementsByClassName("add-toy-form")[0];
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const toyName = document.getElementsByClassName("input-text")[0].value;
  const imgUrl = document.getElementsByClassName("input-text")[1].value;
  const method = 'POST'
  let toyData = {
    name: toyName,
    image : imgUrl,
    likes : 0
  }
  applyCrudFunc(toyData, method);
});

function fetchData(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => appendToy(data))
}

function createToy(toy){
  let toyContainer = document.getElementById('toy-collection');
  let xterwrapper = document.createElement('div');
  xterwrapper.innerHTML = `
      <div class="xter_wrapper">
        <h2>${toy.name}</h2>
      <div class="image_wrapper">
        <img src="${toy.image}" alt="" srcset="">
      </div>
      <p>likes ${toy.likes}</p>
      <button type="button" onClick=updateLikes(this) id="${toy.id}">Like</button>
    </div>`;
  toyContainer.appendChild(xterwrapper);
}

function appendToy(data) {
  data.forEach(toy => {
    createToy(toy);
  });
}
function updateLikes(button){
  const likesContent = button.previousElementSibling;
  const displayedLikes = likesContent.textContent.split(' ')[1];
  const id = button.id
  let data = {
    likes : parseInt(displayedLikes) + 1
  }
  const method = 'PATCH';
  applyCrudFunc(data, method, id);
}

//crud functionality
async function applyCrudFunc(data, method, id=null) {
  if(method === 'PATCH'){
      let res = await fetch(`http://localhost:3000/toys/${id}`,{
      method: `${method}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });
  }else{
      let res = await fetch(`http://localhost:3000/toys`,{
      method: `${method}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });
  }
  
};