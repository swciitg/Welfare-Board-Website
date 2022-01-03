let cardContainer
let cardContainerlen = 2
let carlen = 0
let clubAboutEditor
let cardDescriptionEditor
let editcardDescriptionEditor
var cardContainermap = new Map()

var cur = ''
var edit_card_id = ''
const resetMap = () => {
  cardContainermap.clear()
  cardContainermap.set('cardContainer_0', {
    title: 'teamCards',
    cards: []
  })
  cardContainermap.set('cardContainer_1', {
    title: 'Events',
    cards: []
  })
}
resetMap()
const addCard = (type, card) => {
  if (type != 'Teamcard') {
    let Container = cur
    let cardType
    let datacard

     if (document.getElementById('cardType')) {
        cardType = document.getElementById('cardType').value
      } else {
        cardType = 'card'
      }
    if (!card) {
      datacard = {
        title: document.getElementById('cardTitle').value,
        creation: document.getElementById('cardCreation').value,
        description: cardDescriptionEditor.getData(),
        type: cardType,
        id: `card_${carlen}`
        
      }
      
     
    } else {
      datacard = {
      title :card.title,
      creation :convertDate(card.creation),
      description :card.description,
      type : card.type,
      id: `card_${carlen}`
      }
    }

    let div = document.createElement('div')
    div.id = `card_${carlen}`
    div.className = 'ecard card text-white mb-3'
    div.innerHTML = cardString(datacard)
    //cardString(type, div.id, convertDate(cardCreation), cardDescription)
    Container.append(div)
    let temp = cardContainermap.get(cur.id)
    temp.cards.push(datacard)
    carlen++
    cardContainermap.set(cur.id, temp)
  } else {
    let Container = cur
    let datacard,cardImage


    if (!card) {
      datacard = {
        name: document.getElementById('cardName').value,
        email: document.getElementById('cardEmail').value,
        phone: document.getElementById('cardPhone').value,
        role: document.getElementById('cardRole').value,
        image: './images/Teamcard_logo.png',
        id: `card_${carlen}`,
        type: 'Teamcard'
      }

      cardImage = document.getElementById('cardFile')

    } else {
      datacard = {
        name: card.name,
        email: card.email,
        phone: card.phone,
        role: card.role,
        image: card.image,
        id: `card_${carlen}`,
        type: 'Teamcard'
      }
  
    }

    let div = document.createElement('div')
    div.id = `card_${carlen}`
    div.className = 'ecard card text-white mb-3'
    Container.append(div)

    if (cardImage && cardImage.files.length>0) {
      cardImage = cardImage.files[0]
      let formData = new FormData()
      formData.append('upload', cardImage)
      fetch('http://localhost:3000/api/uploadFile', {
        method: 'post',
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          datacard.image = data.url
          div.innerHTML =cardString(datacard)         
          let temp = cardContainermap.get(cur.id)
          temp.cards.push(datacard)
          carlen++
          cardContainermap.set(cur.id, temp)
        })
        .catch((err) => ('Error occured', err))
    } else {
      let temp = cardContainermap.get(cur.id)
      // console.log('else 131',datacard)
      div.innerHTML =cardString(datacard)
        // cardString(type, div.id, cardName, cardDescription, card.image)
      temp.cards.push(datacard)
      carlen++
      cardContainermap.set(cur.id, temp)
    }
  }
}
const addcardContainer = (title = '') => {
  cardContainer = document.getElementById('cardContainer')
  let div = document.createElement('div')
  div.id = `parentcardContainer_${cardContainerlen}`
  div.innerHTML = `<div class="events">
      <div class="event">
        <input  id='cardContainer_${cardContainerlen}_title' value='${title}'placeholder='title'  onchange="setTitle('cardContainer_${cardContainerlen}')"/>
                <span type="button" class="material-icons" style="color:white;" onclick="removecardContainer('cardContainer_${cardContainerlen}')"> 
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
    title: document.getElementById(`cardContainer_${cardContainerlen}_title`).value,
    cards: []
  })

  cur = document.getElementById(`cardContainer_${cardContainerlen}`)

  cardContainerlen++
}
const currContainer = (id) => {
  cur = document.getElementById(id)
  if (id == 'cardContainer_0') {
    cardCreatemodaldata('Teamcard')
  } else {
    if (id == 'cardContainer_1') {
      cardCreatemodaldata('Events')
    } else {
      cardCreatemodaldata('card')
    }
  }
  $('#cardCreate').modal('show')
}
const removecardContainer = (id) => {
  cardContainermap.delete(id)
  let container = document.getElementById('parent' + id)
  container.parentNode.removeChild(container)
}
const removecard = (id) => {
  let container = document.getElementById(id)
  let par_id = container.parentNode.id
  let temp = cardContainermap.get(par_id)
  container.parentNode.removeChild(container)
  temp.cards = temp.cards.filter((card) => card.id != id)
  cardContainermap.set(par_id, temp)

}

const formCheck = () => {
  let fine = true
  let containers = [...cardContainermap.values()]
  if (
    !document.getElementById('clubName').value ||
    !clubAboutEditor.getData() ||
    !document.getElementById('clubCreation').value
  )
    return false

  containers.forEach((container, index) => {
    if (!(index == 0 || index == 1) && (!container.title || container.cards.length == 0))
      fine = false
    if (!fine) {
      return
    }

    container.cards.forEach((card) => {
      if (card.type != 'Teamcard') {
        if (
          !card.creation ||
          !card.title ||
          !card.id ||
          !card.description ||
          card.type == 'Choose here'
        )
          fine = false
      } else {
        if (!card.email || !card.phone || !card.role || !card.name) fine = false
      }
    })

    if (!fine) {
      return
    }
  })
  return fine
}
const onSubmit = (id = -500) => {
  let containers = [...cardContainermap.values()]
  if (formCheck()) {
    if (id != -500) {
      axios
        .put('api/club', {
          id: id,
          clubContainer: containers,
          name: document.getElementById('clubName').value,
          about: clubAboutEditor.getData(),
          date: document.getElementById('clubCreation').value
        })
        .then(() => returnHome())
    } else {
      axios
        .post('api/club', {
          clubContainer: containers,
          name: document.getElementById('clubName').value,
          about: clubAboutEditor.getData(),
          date: document.getElementById('clubCreation').value
        })
        .then(() => returnHome())
    }
  } else {
    alert(
      'Please fill all the entries. Make sure you have filled all the card details, creation and about of club, title of containers, only Events and Teamcards can remain empty, added containers must have cards'
    )
  }
}

const setTitle = (id) => {
  let temp = cardContainermap.get(id)
  temp.title = document.getElementById(id + '_title').value
  cardContainermap.set(id, temp)

}

const editcarddetails = (id) => {
  let modal = document.getElementById('cardEdit')
  let container = document.getElementById(id)
  let par_id = container.parentNode.id
  let temp = cardContainermap.get(par_id)
  let card = temp.cards.filter((card) => card.id == id)[0]

  modal.innerHTML = editCardString(card)
  if (document.getElementById('editcardDescription')) {
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

  }
  $('#cardEdit').modal('show')

  edit_card_id = id
}
const editcard = () => {
  let container = document.getElementById(edit_card_id)
  let par_id = container.parentNode.id
  let temp = cardContainermap.get(par_id)
  let card = temp.cards.filter((card) => card.id == edit_card_id)[0]


  if (card.type != 'Teamcard') {
    card.title = document.getElementById('editcardTitle').value
    card.creation = document.getElementById('editcardCreation').value
    card.description = editcardDescriptionEditor.getData()
    if (document.getElementById('editcardType')) {
      card.type = document.getElementById('editcardType').value
    }

    container.innerHTML = cardString({ ...card, id: edit_card_id })
  } else {
    card.name = document.getElementById('editcardName').value
    let cardImage = document.getElementById('editcardFile')
    card.email = document.getElementById('editcardEmail').value
    card.phone = document.getElementById('editcardPhone').value
    card.role = document.getElementById('editcardRole').value
    if (cardImage && cardImage.files.length) {

      cardImage = cardImage.files[0]
      let formData = new FormData()
      formData.append('upload', cardImage)
      fetch('/api/uploadFile', {
        method: 'post',
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          card.image = data.url
          container.innerHTML = cardString({ ...card, id: edit_card_id })
        })
        .catch((err) => ('Error occured', err))
    } else {
      container.innerHTML = cardString({ ...card, id: edit_card_id })
    }
 


  }

  temp.cards = temp.cards.map((cd) => {
    if (cd.id == edit_card_id) {
      return card
    } else {
      return cd
    }
  })
}

const cardCreatemodaldata = (type) => {
  document.getElementById('cardCreate').innerHTML = cardCreateData(type)
  $('#cardCreate').modal({
    focus: false,

    // Do not show modal when innitialized.
    show: false
  });
  if (type != 'Teamcard') {
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
}

const closeModal = (id) => {
  $('#' + id).modal('hide')
}
//--------------------------------------------------------------------------------------------------------

const fetchClubs = async () => {
  let clubNameContainer = document.getElementById('club-collapse')
  let clubs = await axios.get('api/clubs')
  string = ''
  clubs.data.forEach((club) => {
    string =
      string +
      `<div type="button" class="club-name" onclick=fetchinitialdata('${club._id}')>${club.name}</div>`
  })
  clubNameContainer.innerHTML = string
  let slides = await axios.get('api/get_all_slides')
  let temp = ''
  slides = slides.data
  for (let i = 0; i < slides.length; i++) {
    temp += `
        <a href="./${slides[i].path}" />${slides[i].displayName}</a> <div class="mx-2" style="float:right;"><button onClick="deleteSlide('${slides[i].name}')"  class="mx-2"><i class="material-icons" >delete</i></button>${i}</div><br><br/>
   `
  }
  temp+= `<input id = "slideImg" type = "file" onChange="uploadSlide()"/>`
  document.getElementById('slide-collapse').innerHTML = temp
}
fetchClubs()
const fetchinitialdata = (id) => {
  prepareintialform()
  fetchClub(id)
}

const fetchClub = async (id) => {
  resetMap()
  document.getElementById('deleteBtn').addEventListener('click', () => {
    deleteClub(id)
  })
  document.getElementById('submitBtn').addEventListener('click', () => {
    onSubmit(id)
  })
  document.getElementById('cardContainer').innerHTML = containerString('Parent')
  document.getElementById('teamcardContainer').innerHTML = containerString('Teamcard')
  document.getElementById('eventsContainer').innerHTML = containerString('Events')

  clubAboutEditorCreate()

  let club = await axios.get(`api/club/${id}`)
  club = club.data
  document.getElementById('clubName').value = club.name
  if (club.about.length) clubAboutEditor.setData(club.about[0])
  document.getElementById('clubCreation').value = convertDate(club.creation)

  if (club.cards_containers.length) {
    let arrcardscontainer = await axios.get('api/cards_container', {
      params: { cards_container: club.cards_containers }
    })
    
    arrcardscontainer.data.forEach(async (container) => {
      addcardContainer(container.title)

      container.cards.forEach((card) => {
        addCard(card.type, card)
      })
    })
  }
  if (club.events_containers.length) {
    let arreventscontainer = await axios.get('api/cards_container', {
      params: { cards_container: club.events_containers }
    })
    cur = document.getElementById('cardContainer_1')

    arreventscontainer.data[0].cards.forEach((card) => {
      addCard(card.type, card)
    })
  }
  if (club.team_cards.length) {
    let teamcardarr = await axios.get('api/teamcard', {
      params: { teamcard: club.team_cards }
    })
    cur = document.getElementById('cardContainer_0')
    teamcardarr.data.forEach(async (card) => {
      addCard('Teamcard', card)
    })
  }
}
const deleteClub = (id) => {
  axios.delete(`api/club`, { data: { id } }).then(() => {
    returnHome()
  })
  // window.location.reload()
}
const dropdown = () => {
  let div = document.getElementById('club-collapser')

  if (div.innerHTML == ' Clubs <span class="material-icons">expand_more</span>') {
    div.innerHTML = ' Clubs <span class="material-icons">expand_less</span>'
  } else {
    div.innerHTML = ' Clubs <span class="material-icons">expand_more</span>'
  }
}
const dropdown_slide = () => {
  let div = document.getElementById('slide-collapser')

  if (div.innerHTML == 'expand_more') {
    div.innerHTML = 'expand_less'
  } else {
    div.innerHTML = 'expand_more'
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
  document.getElementById('submitBtn').addEventListener('click', () => {
    onSubmit()
  })
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
  function pad(s) {
    return s < 10 ? '0' + s : s
  }
  var d = new Date(inputFormat)
  return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
}
function returnHome() {
  document.getElementById('clubForm').innerHTML = homeString()
  fetchClubs()

}
const filechange = () => {
  document.getElementById('editcardFile').style = 'color:black'
  document.getElementById('editcardFileName').style = 'display:none'
}

async function uploadSlide() {
  let slide = document.getElementById('slideImg').files[0]
  let formData = new FormData()
  formData.append('upload', slide)
  formData.append('is_slide', true)
  await axios.post('/api/uploadFile', formData);
  fetchClubs()
}

async function deleteSlide(slidename) {
  await axios.delete(`api/delete_slide`, { data: { name: slidename } })
  fetchClubs()
}

document.title = 'Admin Panel'