let cardContainer = document.getElementById('cardContainer')
let cardContainerlen = 1
let carlen = 0
var cardContainermap = new Map()
cardContainermap.set('cardContainer_0', {
  title: 'teamCards',
  cards: []
})
var cur =''
var edit_card_id = ''
const addCard = (type) => {
  if (type=='card') {
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
    div.innerHTML = cardString(type, div.id, cardCreation, cardDescription)
    Container.append(div)
    let temp = cardContainermap.get(cur.id)
    console.log(cur.id, temp)
    temp.cards.push({
      creation: cardCreation,
      description: cardDescription,
      title: cardTitle,
      Event: cardEvent,
      type: 'card',
      id: `card_${carlen}`
    })
    carlen++
    cardContainermap.set(cur.id, temp)
    console.log(cardContainermap)
    console.log(Container)
  } else {
    let Container = cur
    let cardName = document.getElementById('cardName').value
    let cardImage = document.getElementById('cardImage').value
    let cardDescription = document.getElementById('cardDescription').value
    // console.log(cardTitle, cardCreation, cardDescription, cardEvent)
    let div = document.createElement('div')
    div.id = `card_${carlen}`
    div.className = 'ecard card text-white bg-primary mb-3'
    div.style.width = '19rem'
    div.innerHTML = cardString(type, div.id, cardImage, cardDescription)
    Container.append(div)
    let temp = cardContainermap.get(cur.id)
    console.log(cur.id, temp)
    temp.cards.push({
      description: cardDescription,
      name: cardName,
      image: cardImage,
      type: 'Teamcard',
      id: `card_${carlen}`
    })
    carlen++
    cardContainermap.set(cur.id, temp)
    console.log(cardContainermap)
    console.log(Container)
  }
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
         <div style="color:white;">
          <span
            type="button"
            class="material-icons"
            onclick="currContainer('cardContainer_${cardContainerlen}')"
            >add</span
          >
          </div>
      
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
  if (id == 'cardContainer_0') {
    cardCreatemodaldata('Teamcard')
  } else {
    cardCreatemodaldata('card')
  }
  $('#cardCreate').modal('show')
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
  let modal = document.getElementById('cardEdit')
  let container = document.getElementById(id)
  let par_id = container.parentNode.id
  let temp = cardContainermap.get(par_id)
  let card = temp.cards.filter((card) => card.id == id)[0]

  if (card.type == 'card') {
    modal.innerHTML = `<div class="modal-dialog modal-dialog-centered" role="document">
        <div
          class="modal-content"
          style="background: #f4f4f4; box-shadow: 0px 0px 15px black; color: black"
        >
          <div class="modal-header" style="border-color: #292929">
            <h5 class="modal-title" style="color: black">Card</h5>
          </div>
          <form>
            <div class="modal-body" style="border-color: #292929; overflow: auto">
              <div class="form-group">
                <label for="editcardTitle"> Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="editcardTitle"
                  style="color: black"
                  required
                  value='${card.title}'
                />
                <label for="editcardDescription"> Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="editcardDescription"
                  style="color: black"
                  required
                  value='${card.description}'
                />
                <label for="editcardCreation"> Creation</label>
                <input
                  type="date"
                  class="form-control"
                  id="editcardCreation"
                  style="color: black"
                  required
                  value='${card.creation}'
                />
                <label for="editcardEvent">Event</label>
                <input type="checkbox" id="editcardEvent" style="color: black">
              </div>
            </div>
            <div class="modal-footer" style="border-color: #292929">
              <button
                type="button"
                id="meet_modal_close"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                class="btn btn-primary"
                type="button"
                onclick="editcard()"
                data-dismiss="modal"
              >
                edit Card
              </button>
            </div>
          </form>
        </div>
      </div>`
    if (card.Event) {
      document.getElementById('editcardEvent').checked = true;
    }
  } else {
     
      modal.innerHTML = `<div class="modal-dialog modal-dialog-centered" role="document">
        <div
          class="modal-content"
          style="background: #f4f4f4; box-shadow: 0px 0px 15px black; color: black"
        >
          <div class="modal-header" style="border-color: #292929">
            <h5 class="modal-title" style="color: black">Card</h5>
          </div>
          <form>
            <div class="modal-body" style="border-color: #292929; overflow: auto">
              <div class="form-group">
                <label for="editcardName">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="editcardName"
                  style="color: black"
                  required
                  value='${card.name}'
                />
                <label for="editcardDescription"> Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="editcardDescription"
                  style="color: black"
                  required
                  value='${card.description}'
                />
                <label for="editcardImage">Image</label>
                <input
                  type="text"
                  class="form-control"
                  id="editcardImage"
                  style="color: black"
                  required
                  value='${card.image}'
                />
              
              </div>
            </div>
            <div class="modal-footer" style="border-color: #292929">
              <button
                type="button"
                id="meet_modal_close"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                class="btn btn-primary"
                type="button"
                onclick="editcard()"
                data-dismiss="modal"
              >
                edit Card
              </button>
            </div>
          </form>
        </div>
      </div>`
     
  }  $('#cardEdit').modal('show')
     edit_card_id = id
}
const editcard = () => {
  let container = document.getElementById(edit_card_id)
  let par_id = container.parentNode.id
  let temp = cardContainermap.get(par_id)
  let card = temp.cards.filter((card) => card.id == edit_card_id)[0]
  if (card.type == 'card') {
    card.title = document.getElementById('editcardTitle').value
    card.creation = document.getElementById('editcardCreation').value
    card.description = document.getElementById('editcardDescription').value
    card.Event = document.getElementById('editcardEvent').checked
    container.innerHTML = cardString(card.type, edit_card_id, card.creation, card.description)
  } else {
    card.name=document.getElementById('editcardName').value 
    card.image= document.getElementById('editcardImage').value 
    card.description = document.getElementById('editcardDescription').value
    container.innerHTML = cardString(card.type, edit_card_id, card.image, card.description)
  }
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
const cardString = (type, divId, creation, des) => {
  let string
  if (type == 'card') {
    string = `
              <img src="#" class="card-img-top h-75" />
              <div class="card-body">
                <p class="card-text">
               ${creation}
           <span class="material-icons" style="color:white;" onclick="removecard('${divId}')"> 
remove
</span>


      
            <span
            type="button"
            class="material-icons"
            onclick="editcarddetails('${divId}')">
edit
</span>
          
     
                </p>
                <div class="einfo">
                  <h5 class="card-title">${des}</h5>
                </div>
              </div>
            
    `
  } else {
    string = `
              <img src="${creation}" class="card-img-top h-75" />
              <div class="card-body">
                <p class="card-text">
           
           <span class="material-icons" style="color:white;" onclick="removecard('${divId}')"> 
remove
</span>


      
            <span
            type="button"
            class="material-icons"
            onclick="editcarddetails('${divId}')">
edit
</span>
          
  
                </p>
                <div class="einfo">
                  <h5 class="card-title">${des}</h5>
                 
                </div>
              </div>
            
    `
  }
  return string
}

const cardCreatemodaldata = (type) => {

  if (type == 'card') {
    document.getElementById(
      'cardCreate'
    ).innerHTML = `  <div class="modal-dialog modal-dialog-centered" role="document">
        <div
          class="modal-content"
          style="background: #f4f4f4; box-shadow: 0px 0px 15px black; color: black"
        >
          <div class="modal-header" style="border-color: #292929">
            <h5 class="modal-title" style="color: black">Card</h5>
          </div>
      
          <form>
            <div class="modal-body" style="border-color: #292929; overflow: auto">
              <div class="form-group">
                <label for="cardTitle">Card Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="cardTitle"
                  style="color: black"
                  required
                />
                <label for="cardDescription">Card Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="cardDescription"
                  style="color: black"
                  required
                />
                <label for="cardCreation">Card Creation</label>
                <input
                  type="date"
                  class="form-control"
                  id="cardCreation"
                  style="color: black"
                  required
                />
                <label for="cardEvent">Event</label>
                <input type="checkbox" id="cardEvent" style="color: black" />
              </div>
            </div>
            <div class="modal-footer" style="border-color: #292929">
              <button
                type="button"
                id="meet_modal_close"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                class="btn btn-primary"
                type="button"
                onclick="addCard('card')"
                data-dismiss="modal"
              >
                Create Card
              </button>
            </div>
          </form>
        </div>
      </div>`
  } else {
    document.getElementById(
      'cardCreate'
    ).innerHTML = `  <div class="modal-dialog modal-dialog-centered" role="document">
        <div
          class="modal-content"
          style="background: #f4f4f4; box-shadow: 0px 0px 15px black; color: black"
        >
          <div class="modal-header" style="border-color: #292929">
            <h5 class="modal-title" style="color: black">Team Card</h5>
          </div>

          <form>
            <div class="modal-body" style="border-color: #292929; overflow: auto">
              <div class="form-group">
                <label for="cardName">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="cardName"
                  style="color: black"
                  required
                />
                <label for="cardDescription">Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="cardDescription"
                  style="color: black"
                  required
                />
                <label for="cardImage">Image</label>
                <input
                  type="text"
                  class="form-control"
                  id="cardImage"
                  style="color: black"
                  required
                />
        
              </div>
            </div>
            <div class="modal-footer" style="border-color: #292929">
              <button
                type="button"
                id="meet_modal_close"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                class="btn btn-primary"
                type="button"
                onclick="addCard('Teamcard')"
                data-dismiss="modal"
              >
                Create Team Card
              </button>
            </div>
          </form>
        </div>
      </div>`
  }
}

