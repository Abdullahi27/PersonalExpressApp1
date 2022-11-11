document.getElementById('search').addEventListener('click', ()=> {
  let userInput = document.querySelector('input').value
  console.log('fetch/pokemon')
  fetch(`/pokemon?name=${userInput}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify({
    //   'pokemon': userInput
    // })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (data === 'false') {
        alert('Pokemon does not exist!')
        return
      }
      let result = document.querySelector('#result')

      result.innerHTML = `
      
      <h1>${data.name}</h1>
      <h2>Height: ${data.height}</h2>
      <h2>Moves: ${data.moves[2].move.name}</h2>
      <h2>Ability: ${data.abilities[1].ability.name}</h2>
      <img id='saveimg' src="${data.sprites.front_default}" alt="">
      <button class='save' data-name='${data.name}' data-height='${data.height}' data-ability='${data.abilities[1].ability.name}' data-img='${data.sprites.front_default}' data-moves='${data.moves[2].move.name}' > Save! </button>
      `
     

      console.log(data.name)
      console.log(data.abilities[1].ability.name)

     document.querySelector(".save").addEventListener('click', (e)=> {
      let name = e.target.dataset.name
      let height = e.target.dataset.height
      let moves = e.target.dataset.moves
      let ability = e.target.dataset.ability
      let img = e.target.dataset.img
  
      console.log(name, height, moves, ability, img)

      fetch('/savepokemon', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'height': height,
          'moves': moves,
          'ability': ability,
          'img': img
      })
          
        }) .then(function (response) {
          window.location.reload()
        })
      })
     }) 

    })




let deletebtn = document.querySelectorAll("#deletebtn")


Array.from(deletebtn).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log(element.dataset.id)
    fetch('delete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': element.dataset.id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});


let powerInput = document.querySelectorAll(".saveP");

console.log(powerInput)
Array.from(powerInput).forEach(function (element) {
  element.addEventListener('click', function (e) {
    let power = this.parentNode.querySelector('select').value
    let id = element.dataset.id
   console.log(id)
   fetch('power', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': id,
      'power': power
      
    })
  })
  .then(function (response) {
    window.location.reload()
  })
   
  })
})


































