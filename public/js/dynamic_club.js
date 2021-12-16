var slideIndex = [1, 1]
var slideId = ['mySlides1', 'mySlides2']
let all_containers = {}
let curr = ''
let month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
async function get_all_slides() {
  let data = await axios.get('/project/api/get_all_slides')
  data = data.data
  console.log(data);
  let temp = ''
  for (let i = 0; i < data.length; i++) {
    temp += `
      <div class="mySlides1">
        <img src="./${data[i].path}" style="width: 100%" />
      </div>
   `
  }
  temp += `
    <a class="prev" onclick="plusSlides(-1, 0)">&#10094;</a>
    <a class="next" onclick="plusSlides(1, 0)">&#10095;</a>
    `
  document.getElementById('slideshow-container').innerHTML = temp
  showSlides(1, 0)
}
get_all_slides();
function plusSlides(n, no) {
  showSlides((slideIndex[no] += n), no)
}

function showSlides(n, no) {
  var i
  var x = document.getElementsByClassName(slideId[no])
  if (n > x.length) {
    slideIndex[no] = 1
  }
  if (n < 1) {
    slideIndex[no] = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none'
  }
  if(x.length)
  x[slideIndex[no] - 1].style.display = 'block'
}

const add_clubs_info = async () => {
  let clubs = await axios.get('/project/api/clubs')
  clubs = clubs.data
  let temp_clubs = ''
  for (let i = 0; i < clubs.length; i++) {
    temp_clubs += `  <li class="nav-item">
           <a class="nav-link" id=club_${clubs[i]._id} onclick=change_club("${clubs[i]._id}") href="#">${clubs[i].name}</a>
           </li>
        `
  }

  document.getElementById('clubs_list').innerHTML = temp_clubs
  console.log(clubs)
  change_club(clubs[0]._id)
}

const change_club = async (id) => {
  console.log(id)
  // nav links
  club = await axios.get(`/project/api/club/${id}`)
  club = club.data
  if (curr) document.getElementById(curr).style.color = 'Black'
  curr = 'club_' + id
  document.getElementById(curr).style.color = 'darkblue'
  // about
  document.getElementById('team_name').innerHTML = club.name + ' Team'
  document.getElementById('club_name').innerHTML = `Welcome to ${club.name}, IIT Guwahati`
  document.getElementById('e').innerHTML = `Events At ${club.name}`

  document.getElementById('club_introduction').innerHTML = `<div id="clubAbout" class="ck ck-content
   ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred">${club.about[0]}</div>`
  // ClassicEditor.create(document.querySelector('#clubAbout'), {
  // })

  // side nav
  let temp_table = ''
  temp_table += ` <li class="nav-item table_content list">
               <h4 class="nav-link text-secondary">Content</h4>
            </li>
            <li class="nav-item table_content list">
               <a class="nav-link text-secondary" href="#introduction">About</a>
            </li>`

  console.log(club)

  let cards_containers = await axios.get(`/project/api/cards_container`, {
    params: { cards_container: club.cards_containers }
  })
  cards_containers = cards_containers.data
  let temp_event = ''
  for (let i = 0; i < cards_containers.length; i++) {
    temp_table += `<li class="nav-item table_content list">
        <a class="nav-link text-secondary" href="#${cards_containers[i].title}">${cards_containers[i].title}</a>
       </li>`
  }
  temp_table += `<li class="nav-item table_content list">
  <a class="nav-link text-secondary" href="#team">Team</a>
</li>
<li class="nav-item table_content list">
               <a class="nav-link text-secondary" href="#Events">Events</a>
            </li>`
  document.getElementById('table_list').innerHTML = temp_table
  console.log('car_containers', cards_containers)
  // containers excluding events
  temp_table = ''
  let temp = ''
  let current_year = new Date().getFullYear()
  let cards_cont = document.getElementById('cards_container')
  while (cards_cont.firstChild) cards_cont.removeChild(cards_cont.firstChild)
  cards_containers.forEach((container) => {
    temp = ''
    temp_table = ''
    let temp_cont = document.createElement('div')
    temp_cont.setAttribute('id', container._id)
    all_containers[container._id] = container
    // cards in a container
    console.log('container', container)
    container.cards.forEach((card) => {
      // card
      temp_table += `
    <div class="boxes" class="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred">
    <div class="card box shadow p-1 mb-1 bg-body rounded">
      <div class="card-body">
      <p class="card-title">
          ${card.title}
       </p>
       
           <p class="card-text">
            ${card.description}
          </p>
        </div>
      </div>
    </div>`
    })

    // console.log(temp_table)

    // title + cards
    temp +=
      `<div class="announcements  mt-5 flex-column" style="width:65%;" >
        <div class="ach-start d-flex justify-content-between" id="${container.title}">
            <h3 style="color:black;">${container.title}</h3>
			<div class="dropdown">
                <button class="btn shadow-sm btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false" id="${container._id}_filter">
                      ALL
                    </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" onClick="filter_content('ALL','${
                      container._id
                    }_cards')">ALL</a></li>
                    <li><a class="dropdown-item" onClick="filter_content('${current_year}','${
        container._id
      }_cards')">${current_year}</a></li>
                    <li><a class="dropdown-item" onClick="filter_content('${current_year - 1}','${
        container._id
      }_cards')">${current_year - 1}</a></li>
                </ul>
            </div>
        </div>
        <div id=${container._id}_cards>
        ` +
      temp_table +
      ` 
       </div>
      </div>`
    temp_cont.innerHTML = temp
    cards_cont.appendChild(temp_cont)
  })

  let temp_team = ''
  let team_members = await axios.get(`/project/api/teamcard/`, {
    params: { teamcard: club.team_cards }
  })
  team_members = team_members.data
  team_members.forEach((member) => {
    temp_team += `
    <div class="tcard card text-white bg-info mb-4" style="width: 3rem;"class="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred" >
    <p class="card-title"> <h4>${member.name}</h4> 
    <p>    ${member.description}
      </p>
    </div>
    `
  })
  document.getElementById('teamcontainer').innerHTML = temp_team
  let event_container = await axios.get(`/project/api/cards_container`, {
    params: { cards_container: club.events_containers }
  })
  event_container = event_container.data
  all_containers['events'] = event_container.length ? event_container[0] : {cards:[]};
  if (event_container.length) {
    all_containers['events'].cards.forEach((card) => {
      temp_event += `
                <div class="ecard card text-white bg-info mb-3 ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred">
                  <div class="card-body">
                    <h4 class="card-title">
                      ${card.title}
                    </h4>
              
                    <h5 class="card-body">
                      ${card.description}
                    </h5>
                  </div>
                </div>`
    })
  }
  document.getElementById('eventcontainer').innerHTML = temp_event
}
const filter_content = (filter, id) => {
  let all_years = 0
  if (filter == 'ALL') {
    all_years = 1
  }
  let container = document.getElementById(id)
  let curr_container = all_containers[id.slice(0, -6)]
  curr_container = curr_container.cards

  document.getElementById(id.slice(0, -6) + '_filter').innerText = filter
  let temp = ''
  let current_year = new Date()
  current_year = current_year.getFullYear()
  curr_container.forEach((card) => {
    let creation_date = new Date(Date.parse(card.creation))
    let creation_year = creation_date.getFullYear()

    if (all_years || creation_year == parseInt(filter)) {
      temp += `<div class="boxes" class="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred">
      <div class="card box shadow p-1 mb-1 bg-body rounded">
        <div class="card-body">
        <p class="card-title">
            ${card.title}
         </p>
         
             <p class="card-text">
              ${card.description}
            </p>
          </div>
        </div>
      </div>`
    }
  })
  container.innerHTML = temp
}

const filter_events = async (filter) => {
  let all_events = 0
  document.getElementById('events_type').innerHTML = filter
  if (filter == 'ALL') all_events = 1
  let temp_events = ''
  if(all_containers['events'].cards.length)
  all_containers['events'].cards.forEach((event) => {
    if (all_events || event.type == filter) {
      temp_events += `
                <div class="ecard card text-white bg-info mb-3" style="width: 19rem" class="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred">
                  <div class="card-body">
                    <h4 class="card-title">
                      ${event.title}
                    </h4>
              
                    <h5 class="card-body">
                      ${event.description}
                    </h5>
                  </div>
                </div>`
    }
  })
  document.getElementById('eventcontainer').innerHTML = temp_events
}

add_clubs_info()
