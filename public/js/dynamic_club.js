var slideIndex = [1, 1]
var slideId = ['mySlides1', 'mySlides2']
showSlides(1, 0)
let all_containers = {}
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
  x[slideIndex[no] - 1].style.display = 'block'
}

const add_clubs_info = async () => {
  let clubs = await axios.get('/project/api/clubs')
  clubs = clubs.data
  let temp_clubs = ''
  for (let i = 0; i < clubs.length; i++) {
    temp_clubs += `  <li class="nav-item">
           <a class="nav-link" onclick=change_club("${clubs[i]._id}") href="#">${clubs[i].name}</a>
           </li>
        `
  }

  document.getElementById('clubs_list').innerHTML = temp_clubs
  change_club(clubs[0]._id)
}

const change_club = async (id) => {
  console.log(id)
  // nav links
  club = await axios.get(`/project/api/club/${id}`)
  club = club.data

  // about
  document.getElementById('club_name').innerHTML = `Welcome to ${club.name}, IIT Guwahati`
  document.getElementById('club_introduction').innerHTML = club.about

  // side nav
  let temp_table = ''
  temp_table += ` <li class="nav-item table_content list">
               <h4 class="nav-link text-secondary">Content</h4>
            </li>
            <li class="nav-item table_content list">
               <a class="nav-link text-secondary" href="#introduction">About</a>
            </li>`

  console.log(club)
  let cards_containers = []
  for (let i = 0; i < club.cards_containers.length; i++) {
    let cards_container = await axios.get(
      `/project/api/cards_container/${club.cards_containers[i]}`
    )
    cards_container = cards_container.data
    cards_containers.push(cards_container)
    temp_table += `<li class="nav-item table_content list">
        <a class="nav-link  text-secondary" href="#${cards_container.id}">${cards_container.title}</a>
       </li>`
  }
  document.getElementById('table_list').innerHTML = temp_table

  // containers excluding events
  temp_table = ''
  let temp = ''
  let current_year = new Date().getFullYear()

  cards_containers.forEach((container) => {
    temp = ''
    temp_table = ''
    let temp_cont = document.createElement('div')
    temp_cont.setAttribute('id', container._id)
    all_containers[container._id] = container
    // cards in a container
    container.cards.forEach((card) => {
      // card
      temp_table += `
    <div class="boxes">
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

    console.log(temp_table)

    // title + cards
    temp +=
      `<div class="announcements  mt-5 flex-column" style="width:65%;">
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
    document.getElementById('cards_container').appendChild(temp_cont)
  })
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
      temp += `<div class="boxes">
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
add_clubs_info()
