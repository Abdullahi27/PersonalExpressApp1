document.getElementById('test').addEventListener('click', ()=> {
  let userInput = document.querySelector('input').value
  fetch(`/test`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'pokemon': userInput,
    })
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
      <img src="${data.sprites.front_default}" alt="">
      
      `
      console.log(data.name)
      console.log(data.abilities[1].ability.name)

    })
})

