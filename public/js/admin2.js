let cardContainer = document.getElementById('cardContainer')
let cardContainerlen = 0
let carlen = 0
var cardContainermap = new Map()
var cur = ''
var edit_card_id = ''
const addCard = () => {
  let Container = cur
  let cardTitle = document.getElementById('cardTitle').value
  let cardCreation = document.getElementById('cardCreation').value
  let cardDescription = document.getElementById('cardDescription').value
  let cardEvent = document.getElementById('cardEvent').checked
  // console.log(cardTitle, cardCreation, cardDescription, cardEvent)
  let div = document.createElement('div')
  div.id = `card_${carlen}`
  div.className = 'ecard card text-white bg-primary mb-3'
  div.style.width = '19rem'
  div.innerHTML = cardString(div.id, cardCreation, cardDescription)
  Container.append(div)
  let temp = cardContainermap.get(cur.id)
  console.log(cur.id, temp)
  temp.cards.push({
    creation: cardCreation,
    description: cardDescription,
    title: cardTitle,
    Event: cardEvent,
    id: `card_${carlen}`
  })
  carlen++
  cardContainermap.set(cur.id, temp)
  console.log(cardContainermap)
  // var x = await axios.post('/api/channel', {
  //   name: name
  // })
  console.log(Container)
}
const addcardContainer = () => {
  let div = document.createElement('div')
  div.id = `parentcardContainer_${cardContainerlen}`
  div.innerHTML = `<div class="events">
      <div class="event">
        <input  id='cardContainer_${cardContainerlen}_title' placeholder='title' onchange="setTitle('cardContainer_${cardContainerlen}')"/>
                <span class="material-icons" style="color:white;" onclick="removecardContainer('cardContainer_${cardContainerlen}')"> 
remove
</span>
      </div>


      <div id="cardContainer_${cardContainerlen}" class="ecards">

      </div>
       <a
          id="create_meet"
          class="custom_link"
          href="#"
          data-toggle="modal"
          data-target="#cardCreate"
          style="align-items: center; text-decoration: none; color: white"
        >
          <span
            type="button"
            class="material-icons"
            data-bs-toggle="modal"
            data-bs-target="#cardCreate"
            onclick="currContainer('cardContainer_${cardContainerlen}')"
            >add</span
          >
        </a>
    </div>`

  cardContainer.appendChild(div)
  cardContainermap.set(`cardContainer_${cardContainerlen}`, {
    title: document.getElementById(`cardContainer_${cardContainerlen}`).value,
    cards: []
  })
  cardContainerlen++
}
const currContainer = (id) => {
  cur = document.getElementById(id)
}
const removecardContainer = (id) => {
  cardContainermap.delete(id)
  let container = document.getElementById('parent' + id)
  container.parentNode.removeChild(container)
  console.log(cardContainermap)
}
const removecard = (id) => {
  //console.log('deleteCard', id)
  let container = document.getElementById(id)
  let par_id = container.parentNode.id
  let temp = cardContainermap.get(par_id)
  container.parentNode.removeChild(container)
  temp.cards = temp.cards.filter((card) => card.id != id)
  cardContainermap.set(par_id, temp)
  console.log(cardContainermap, cardContainermap.get(par_id))
}

const onSubmit = () => {
  let containers = [...cardContainermap.values()]
  console.log(containers)
  axios.post('api/club', {
    clubContainer: containers,
    name: document.getElementById('clubName').value,
    about: document.getElementById('clubAbout').value,
    date: document.getElementById('clubCreation').value
  })
}
const setTitle = (id) => {
  let temp = cardContainermap.get(id)
  temp.title = document.getElementById(id + '_title').value
  cardContainermap.set(id, temp)
  console.log(cardContainermap)
}
const editcarddetails = (id) => {
  let container = document.getElementById(id)
  let par_id = container.parentNode.id
  let temp = cardContainermap.get(par_id)
  let card = temp.cards.filter((card) => card.id == id)[0]
  document.getElementById('editcardTitle').value = card.title
  document.getElementById('editcardCreation').value = card.creation
  document.getElementById('editcardDescription').value = card.description
  document.getElementById('editcardEvent').checked = card.Event
  edit_card_id = id
}
const editcard = () => {
  let container = document.getElementById(edit_card_id)
  let par_id = container.parentNode.id
  let temp = cardContainermap.get(par_id)
  let card = temp.cards.filter((card) => card.id == edit_card_id)[0]
  card.title = document.getElementById('editcardTitle').value
  card.creation = document.getElementById('editcardCreation').value
  card.description = document.getElementById('editcardDescription').value
  card.Event = document.getElementById('editcardEvent').checked
  container.innerHTML = cardString(edit_card_id, card.creation, card.description)
  temp.cards = temp.cards.map((cd) => {
    if (cd.id == edit_card_id) {
      return card
    } else {
      return cd
    }
  })
  cardContainermap.set(par_id, temp)
  console.log(cardContainermap, cardContainermap.get(par_id))
}
const cardString = (divId, creation, des) => {
  let string = `
              <img src="{events[i].image}" class="card-img-top h-75" />
              <div class="card-body">
                <p class="card-text">
               ${creation}
           <span class="material-icons" style="color:white;" onclick="removecard('${divId}')"> 
remove
</span>

 <a
          
          href="#"
          data-toggle="modal"
          data-target="#cardEdit"
          style="align-items: center; text-decoration: none; color: white"
        >
      
            <span
            type="button"
            class="material-icons"
            data-bs-toggle="modal"
            data-bs-target="#cardEdit"
            onclick="editcarddetails('${divId}')">
edit
</span>
          
        </a>
                </p>
                <div class="einfo">
                  <h5 class="card-title">${des}</h5>
                  <a href="{events[i].link}"
                    ><svg
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.8769 26.8151H7.98352C3.27685 26.8151 0.103516 23.7871 0.103516 19.2684V7.70844C0.103516 3.18844 3.27685 0.148438 7.98352 0.148438H18.8769C23.5968 0.148438 26.7702 3.18844 26.7702 7.70844V19.2684C26.7702 23.7871 23.5968 26.8151 18.8769 26.8151ZM16.4635 12.4818H7.99682C7.43682 12.4818 6.99682 12.9351 6.99682 13.4818C6.99682 14.0418 7.43682 14.4818 7.99682 14.4818H16.4635L13.1568 17.7751C12.9702 17.9618 12.8635 18.2284 12.8635 18.4818C12.8635 18.7338 12.9702 18.9884 13.1568 19.1884C13.5435 19.5751 14.1835 19.5751 14.5702 19.1884L19.5968 14.1884C19.9702 13.8151 19.9702 13.1484 19.5968 12.7751L14.5702 7.7751C14.1835 7.38844 13.5435 7.38844 13.1568 7.7751C12.7702 8.1751 12.7702 8.80177 13.1568 9.20177L16.4635 12.4818Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            
    `
  return string
}
