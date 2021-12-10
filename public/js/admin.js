let cardContainer
let cardContainerlen = 1
let carlen = 0
let clubAboutEditor
let cardDescriptionEditor
let editcardDescriptionEditor
var cardContainermap=new Map()

var cur = ''
var edit_card_id = ''
const resetMap = () => {
   cardContainermap.clear();
  cardContainermap.set('cardContainer_0', {
  title: 'teamCards',
  cards: []
})
}
resetMap() 
const addCard = (type, card) => {
  if (type == 'card') {
    let Container = cur
    let cardTitle, cardCreation, cardDescription, cardEvent
    console.log(card)
    if (!card) {
      cardTitle = document.getElementById('cardTitle').value
      cardCreation = document.getElementById('cardCreation').value
      cardDescription = cardDescriptionEditor.getData()
     
    } else {
      cardTitle = card.title
      cardCreation = card.creation
      cardDescription = card.description
     
    }
    //  console.log(cardTitle, cardCreation, cardDescription, cardEvent)
    let div = document.createElement('div')
    div.id = `card_${carlen}`
    div.className = 'ecard card text-white bg-primary mb-3'
    div.style.width = '19rem'
    div.innerHTML = cardString(type, div.id, convertDate(cardCreation), cardDescription)
    Container.append(div)
    let temp = cardContainermap.get(cur.id)
    console.log(cur.id, temp)
    temp.cards.push({
      creation: cardCreation,
      description: cardDescription,
      title: cardTitle,
      type: 'card',
      id: `card_${carlen}`
    })
    carlen++
    cardContainermap.set(cur.id, temp)
    console.log(cardContainermap)
    console.log(Container)
  } else {
    let Container = cur
    let cardName, cardImage, cardDescription
    if (!card) {
      cardName = document.getElementById('cardName').value
      cardDescription =cardDescriptionEditor.getData()
    } else {
      cardName = card.name
      cardDescription = card.description
    }

    // console.log(cardTitle, cardCreation, cardDescription, cardEvent)
    let div = document.createElement('div')
    div.id = `card_${carlen}`
    div.className = 'ecard card text-white bg-primary mb-3'
    div.style.width = '19rem'
    div.innerHTML = cardString(type, div.id,'', cardDescription)
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
const addcardContainer = (title = '',event=false) => {
  cardContainer = document.getElementById('cardContainer')
  let div = document.createElement('div')
  div.id = `parentcardContainer_${cardContainerlen}`
  div.innerHTML = `<div class="events">
      <div class="event">
        <input  id='cardContainer_${cardContainerlen}_title' value='${title}'placeholder='title'  onchange="setTitle('cardContainer_${cardContainerlen}')"/>
                <span type="button" class="material-icons" style="color:white;" onclick="removecardContainer('cardContainer_${cardContainerlen}')"> 
remove
</span>
<div>
 <label for="cardContainer_${cardContainerlen}_event">For Events</label>
                <input type="checkbox" id="cardContainer_${cardContainerlen}_event" style="color: black"  onchange="setTitle('cardContainer_${cardContainerlen}')">
             </div>
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
    title: document.getElementById(`cardContainer_${cardContainerlen}_title`).value,
    event: false,
    cards: []
  })
  if (event) {
      console.log(event)
      document.getElementById(`cardContainer_${cardContainerlen}_event`).checked = true
    }
  cur = document.getElementById(`cardContainer_${cardContainerlen}`)

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
function redirect() {
  console.log("HOGAYA");
  window.location.href='adminside'
  

}

const onSubmit = async (id = -500) => {
  let containers = [...cardContainermap.values()]

  if (id != -500) {
    axios.put('api/club', {
      id: id,
      clubContainer: containers,
      name: document.getElementById('clubName').value,
      about: clubAboutEditor.getData(),
      date: document.getElementById('clubCreation').value
      
    })
  } else {
    axios.post('api/club', {
      clubContainer: containers,
      name: document.getElementById('clubName').value,
      about: clubAboutEditor.getData(),
      date: document.getElementById('clubCreation').value
    })
      fetchClubs()
      redirect()
  }
  
}
const setTitle = (id) => {
  let temp = cardContainermap.get(id)
  temp.title = document.getElementById(id + '_title').value
  temp.event = document.getElementById(id + '_event').checked
  cardContainermap.set(id, temp)
  console.log(cardContainermap,temp.event)
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
                  value='${convertDate(card.creation)}'
                />
               
            </div>
            <div class="modal-footer" style="border-color: #292929">
              <button
                type="button"
                onclick="closeModal('cardEdit')"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                class="btn btn-primary"
                type="button"
                onclick="editcard();closeModal('cardEdit')"
                data-dismiss="modal"
              >
                edit Card
              </button>
            </div>
          </form>
        </div>
      </div>`

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
             
              
              </div>
            </div>
            <div class="modal-footer" style="border-color: #292929">
              <button
                type="button"
                onclick="closeModal('cardEdit')"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                class="btn btn-primary"
                type="button"
                onclick="editcard();closeModal('cardEdit')"
                data-dismiss="modal"
              >
                edit Card
              </button>
            </div>
          </form>
        </div>
      </div>`
  }
   ClassicEditor.create(document.querySelector('#editcardDescription'), {
     ckfinder: {
       // Upload the images to the server using the CKFinder QuickUpload command.
       uploadUrl: '/api/uploadFile'
     }
   })
     .then((newEditor) => {
       editcardDescriptionEditor = newEditor
       editcardDescriptionEditor.setData(card.description)
     
     })
     .catch((error) => {
       console.error(error)
     })
  
  
  $('#cardEdit').modal('show')
 
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
    card.description = editcardDescriptionEditor.getData()
    container.innerHTML = cardString(card.type, edit_card_id, card.creation, card.description)
  } else {
    card.name = document.getElementById('editcardName').value
  
    card.description = editcardDescriptionEditor.getData()
    container.innerHTML = cardString(card.type, edit_card_id,'', card.description)
  }
  temp.cards = temp.cards.map((cd) => {
    if (cd.id == edit_card_id) {
      return card
    } else {
      return cd
    }
  })
  // cardContainermap.set(par_id, temp)
  // console.log(cardContainermap, cardContainermap.get(par_id))
}
const cardString = (type, divId, creation, des) => {
  let string
  if (type == 'card') {
    string = `
              
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
               
              </div>
            </div>
            <div class="modal-footer" style="border-color: #292929">
              <button
                type="button"
                onclick="closeModal('cardCreate')"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                class="btn btn-primary"
                type="button"
                onclick="addCard('card');closeModal('cardCreate')"
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
            
              </div>
            </div>
            <div class="modal-footer" style="border-color: #292929">
              <button
                type="button"
                onclick="closeModal('cardCreate')"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                class="btn btn-primary"
                type="button"
                onclick="addCard('Teamcard');closeModal('cardCreate')"
                data-dismiss="modal"
              >
                Create Team Card
              </button>
            </div>
          </form>
        </div>
      </div>`
  }
 ClassicEditor.create(document.querySelector('#cardDescription'), {
   ckfinder: {
     // Upload the images to the server using the CKFinder QuickUpload command.
     uploadUrl: '/api/uploadFile'
   }
 })
   .then((newEditor) => {
     cardDescriptionEditor = newEditor
   })
   .catch((error) => {
     console.error(error)
   })
}

const closeModal = (id) => {
  console.log('closing ', id)
  $('#' + id).modal('hide')
}
//--------------------------------------------------------------------------------------------------------

const fetchClubs = async () => {
  let clubNameContainer = document.getElementById('club-collapse')
  let clubs = await axios.get('api/clubs')
  console.log(clubs)
  string = ''
  clubs.data.forEach((club) => {
    string =
      string +
      `<div type="button" class="club-name" onclick=fetchinitialdata('${club._id}')>${club.name}</div>`
  })
  clubNameContainer.innerHTML = string
}
fetchClubs()
const fetchinitialdata = (id) => {
  prepareintialform()
  fetchClub(id)
}
const prepareintialform = () => {
  document.getElementById('clubForm').innerHTML = `   <div class="bottom-main-bar">
<div class="bottom-main-line">
  <div class="bottom-main-heading">
    <h3 style="color: black" id="clubFormtitle">Edit Club Details</h3>
  </div>
  <div class="bottom-main-buttons">
  <button onclick="addnewClub()" id="addBtn" type="button" class="btn btn-primary button1" style="display:flex;align-items:center;justify-content:center">
  <div class="material-icons">add</div><div>club</div></button>
  <button id="deleteBtn" type="button" class="btn btn-danger button2">Delete</button>
  </div>
</div>

<div class="card bottom-main-card">
  <div class="card-body">
    <div class="card-heading">
      <label for="clubName">Name</label>
      <input
        type="text"
        class="form-control"
        id="clubName"
        placeholder="Enter Club name"
      />
    </div>
    <div class="card-heading">
      <label for="clubAbout">About</label>

      <div
        id="clubAbout"
        placeholder="Enter Club About"
      ></div>
    </div>
 
    <div id="cardContainer" class="card-heading">
      <div style="display: flex; align-items: center; justify-content: space-between">
        <div>Card Containers</div>
        <div style="display: flex; align-items: center; color: black">
          <span type="button" class="material-icons" onclick="addcardContainer()"
            >add</span
          >
          new Container
        </div>
      </div>
    </div>
    <div id="teamcardContainer" class="card-heading">
      <p>Team Cards</p>
      <div id="parentcardContainer_0">
        <div class="events">
          <div id="cardContainer_0" class="ecards"></div>
          <div style="color: white">
            <span
              type="button"
              class="material-icons"
              onclick="currContainer('cardContainer_0')"
              >add</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="card-heading">
      <label for="clubCreation">Creation</label>
      <input type="date" class="form-control" id="clubCreation" style="color: black" />
    </div>
    <button
      id="submitBtn"
      type="button"
      class="btn btn-primary card-heading"
      onclick="onSubmit()"
    >
      Save
    </button>
  </div>
</div>
</div>`
}
const fetchClub = async (id) => {
  resetMap();
  document.getElementById(
    'cardContainer'
  ).innerHTML = ` <div style="display: flex; align-items: center; justify-content: space-between">
                  <div>Card Containers</div>
                  <div style="display: flex; align-items: center; color: black">
                    <span type="button" class="material-icons" onclick="addcardContainer()"
                      >add</span
                    >
                    new Container
                  </div>
                </div>`
  document.getElementById('teamcardContainer').innerHTML = `  <p>Team Cards</p>
                <div id="parentcardContainer_0">
                  <div class="events">
                    <div id="cardContainer_0" class="ecards"></div>
                    <div style="color: white">
                      <span
                        type="button"
                        class="material-icons"
                        onclick="currContainer('cardContainer_0')"
                        >add</span
                      >
                    </div>
                  </div>
                </div>`
 
  clubAboutEditorCreate()

  let club = await axios.get(`api/club/${id}`)
  club = club.data
  document.getElementById('clubName').value = club.name
  clubAboutEditor.setData(club.about)
  document.getElementById('clubCreation').value = convertDate(club.creation)

  if (club.cards_containers.length) {
    let arrcardscontainer = await axios.get('api/cards_container', {
      params: { cards_container: club.cards_containers }
    })
     let arreventscontainer = await axios.get('api/cards_container', {
       params: { cards_container: club.events_containers }
     })
    
    arrcardscontainer.data.forEach(async (container) => {
    

      addcardContainer(container.title,container.event)

     
      container.cards.forEach((card) => {
      
        addCard(card.type, card)
      })
    })
     arreventscontainer.data.forEach(async (container) => {
   

       addcardContainer(container.title, container.event)

       
       container.cards.forEach((card) => {
         
         addCard(card.type, card)
       })
     })
  }
  if (club.team_cards.length) {
    let teamcardarr = await axios.get('api/teamcard', {
      params: { teamcard: club.team_cards }
    })
    cur = document.getElementById('cardContainer_0')
    teamcardarr.data.forEach(async (card) => {
    
      addCard(card.type, card)
    })
  }
  document.getElementById('deleteBtn').setAttribute('onclick', `deleteClub('${id}')`)
  document.getElementById('submitBtn').setAttribute('onclick', `onSubmit('${id}')`)
}
const deleteClub = async (id) => {
  await axios.delete(`api/club/${id}`).then(redirect())
  
}
const dropdown = () => {
  let div = document.getElementById('club-collapser')

  if (div.innerHTML == ' Clubs <span class="material-icons">expand_more</span>') {
    div.innerHTML = ' Clubs <span class="material-icons">expand_less</span>'
  } else {
    div.innerHTML = ' Clubs <span class="material-icons">expand_more</span>'
  }
}
const addnewClub = () => {
  resetMap()
  prepareintialform()

 clubAboutEditorCreate()

  document.getElementById('clubFormtitle').innerHTML = 'Create new club'
  document.getElementById('submitBtn').innerHTML = 'Create'
  document.getElementById('deleteBtn').style.display = 'none'
  document.getElementById('addBtn').style.display = 'none'

}

function clubAboutEditorCreate() {
  
  ClassicEditor.create(document.querySelector('#clubAbout'), {
    ckfinder: {
      // Upload the images to the server using the CKFinder QuickUpload command.
      uploadUrl: '/api/uploadFile'
    }
  })
    .then((newEditor) => {
      clubAboutEditor = newEditor
    })
    .catch((error) => {
      console.error(error)
    })

 }

function convertDate(inputFormat) {
  console.log(d)
  function pad(s) {
    return s < 10 ? '0' + s : s
  }
  var d = new Date(inputFormat)
  return [ d.getFullYear(), pad(d.getMonth() + 1),pad(d.getDate())].join('-')
}