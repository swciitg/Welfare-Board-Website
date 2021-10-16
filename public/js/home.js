events = JSON.parse(events);
achievements = JSON.parse(achievements);
announcements = JSON.parse(announcements);
teams=JSON.parse(teams);

var slideIndex = [1, 1];
var slideId = ["mySlides1", "mySlides2"];
showSlides(1, 0);

function plusSlides(n, no) {
  showSlides((slideIndex[no] += n), no);
}

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {
    slideIndex[no] = 1;
  }
  if (n < 1) {
    slideIndex[no] = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no] - 1].style.display = "block";
}

var eventcontainer = document.getElementById("eventcontainer");
var teamcontainer=document.getElementById("teamcontainer");

month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const renderevents = function (category) {
  console.log(category);
  while (eventcontainer.firstChild) {
    eventcontainer.removeChild(eventcontainer.lastChild);
  }
  document.getElementById("events_type").innerHTML = category;
  for (let i = 0; i < events.length; i++) {
    if (events[i].category == category || category == "ALL") {
      let div = document.createElement("div");
      div.className = "ecard card text-white bg-info mb-3";
      div.style.width = "19rem";
      div.innerHTML = `
          <img src="${events[i].image}" class="card-img-top h-75" />
          <div class="card-body">
            <p class="card-text">
           ${events[i].creation}
   
            </p>
            <div class="einfo">
              <h5 class="card-title">${events[i].description}</h5>
              <a href="${events[i].link}"
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
        
`;
      eventcontainer.append(div);
    }
  }
};

const renderteams = function (category) {
  console.log(category);
  while (teamcontainer.firstChild) {
    teamcontainer.removeChild(teamcontainer.lastChild);
  }
  document.getElementById("teams_type").innerHTML = category;
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].category == category ||category == "All Members" ) {
      let div = document.createElement("div");
      div.className = "tcard card text-white bg-info mb-4";
      div.style.width = "19rem";
      div.innerHTML = `
          <img src="${teams[i].image}" class="card-img-top h-70" />
          <div class="card-body">
            <p class="card-text">
           ${teams[i].name}
   
            </p>
            <div class="tinfo">
              <h5 class="card-title">${teams[i].description}</h5>
              
            </div>
          </div>
        
`;
      teamcontainer.append(div);
    }
  }
};

function renderAchievements(year = new Date().getFullYear()) {
  var to_render = "";
  achievements.forEach((element) => {
    if (element.creation.slice(0, 4) == year) {
      to_render += `<div class="boxes">
        <div class="card box shadow p-1 mb-1 bg-body rounded">
          <div class="card-body">
            <h5 class="card-title">
              ${element.title}
            </h5>
            <p class="card-text">
              ${element.body}
            </p>
            <div class="read_more d-flex justify-content-end">
              <span class="me-1">Read more</span>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 172 172"
                style="fill: #000000">
                <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                  stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                  font-family="none" font-weight="none" font-size="none" text-anchor="none"
                  style="mix-blend-mode: normal">
                  <path d="M0,172v-172h172v172z" fill="none"></path>
                  <g fill="#2b3649">
                    <path
                      d="M86,17.2c-37.9948,0 -68.8,30.8052 -68.8,68.8c0,37.9948 30.8052,68.8 68.8,68.8c37.9948,0 68.8,-30.8052 68.8,-68.8c0,-37.9948 -30.8052,-68.8 -68.8,-68.8zM118.72013,90.05347l-22.93333,22.93333c-1.118,1.118 -2.58573,1.67987 -4.05347,1.67987c-1.46773,0 -2.93547,-0.56187 -4.05347,-1.67987c-2.24173,-2.24173 -2.24173,-5.8652 0,-8.10693l13.14653,-13.14653h-43.49307c-3.1648,0 -5.73333,-2.5628 -5.73333,-5.73333c0,-3.17053 2.56853,-5.73333 5.73333,-5.73333h43.49307l-13.14653,-13.14653c-2.24173,-2.24173 -2.24173,-5.8652 0,-8.10693c2.24173,-2.24173 5.8652,-2.24173 8.10693,0l22.93333,22.93333c2.24173,2.24173 2.24173,5.8652 0,8.10693z">
                    </path>
                  </g>
                </g>
              </svg>
            </div>
          </div>
         </div>
      </div>`;
    }
  });
  document.getElementById("achievements_year").innerHTML = year;
  document.getElementById("home_achievements").innerHTML = to_render;
}
function renderAnnouncements(order) {
  let start, increment;
  if (!order) {
    document.getElementById("announcement_order").innerHTML = "LATEST";
    start = 0;
    increment = 1;
  } else {
    document.getElementById("announcement_order").innerHTML = "OLDEST";
    start = announcements.length - 1;
    increment = -1;
  }

  let to_render = "";
  while (start < announcements.length && start >= 0) {
    let element = announcements[start];
    let date = new Date(element.creation);
    to_render += `
    <div class="boxes">
    <div class="card box shadow p-1 mb-1 bg-body rounded">
      <div class="card-body">
      <p class="card-title">
          ${date.getDate()}
            ${month[date.getMonth() - 1]}
              ${date.getFullYear()}
       </p>
       
           <p class="card-text">
            ${element.description}
          </p>
          <a href="${
            element.link
          } " style="float:right;"><svg width="32" height="33" viewBox="0 0 32 33" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M21.4394 29.3923H10.546C5.83935 29.3923 2.66602 26.3643 2.66602 21.8456V10.2856C2.66602 5.76559 5.83935 2.72559 10.546 2.72559H21.4394C26.1593 2.72559 29.3327 5.76559 29.3327 10.2856V21.8456C29.3327 26.3643 26.1593 29.3923 21.4394 29.3923ZM19.026 15.0589H10.5593C9.99932 15.0589 9.55932 15.5123 9.55932 16.0589C9.55932 16.6189 9.99932 17.0589 10.5593 17.0589H19.026L15.7193 20.3523C15.5327 20.5389 15.426 20.8056 15.426 21.0589C15.426 21.3109 15.5327 21.5656 15.7193 21.7656C16.106 22.1523 16.746 22.1523 17.1327 21.7656L22.1593 16.7656C22.5327 16.3923 22.5327 15.7256 22.1593 15.3523L17.1327 10.3523C16.746 9.96559 16.106 9.96559 15.7193 10.3523C15.3327 10.7523 15.3327 11.3789 15.7193 11.7789L19.026 15.0589Z"
                fill="#A5ADBC" />
            </svg>
          </a>  
        </div>
      </div>
    </div>`;
    start += increment;
  }
  document.getElementById("home_announcements").innerHTML = to_render;
}
renderAchievements();
renderAnnouncements(0);
