var slideIndex = [1, 1]
var slideId = ['mySlides1', 'mySlides2']
showSlides(1, 0)

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
  let club = await axios.get(`/project/api/club/${id}`)
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
  cards_containers.forEach((container) => {
	  temp_table = ''
	  
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
                    aria-expanded="false" id="achievements_year">
                    2021
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" onClick="renderAchievements('2021')">2021</a></li>
                    <li><a class="dropdown-item" onClick="renderAchievements('2020')">2020</a></li>
                    <li><a class="dropdown-item" onClick="renderAchievements('2019')">2019</a></li>
                </ul>
            </div>
        </div>
        ` +
      temp_table +
      ` </div>`
  })

  document.getElementById('cards_container').innerHTML = temp

}
add_clubs_info()
