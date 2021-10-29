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

const add_clubs_info= async ()=>
{
    let clubs= await axios.get('/project/api/clubs');
    clubs=clubs.data;
    let temp_clubs="";
    for(let i=0;i<clubs.length;i++)
    {
        temp_clubs+=
        `  <li class="nav-item">
           <a class="nav-link" onclick=change_club("${clubs[i]._id}") href="#">${clubs[i].name}</a>
           </li>
        `;
    }

   document.getElementById("clubs_list").innerHTML=temp_clubs;
   change_club(clubs[0]._id);
}

const change_club = async (id)=>
{
    console.log(id);
    let club=await axios.get(`/project/api/club/${id}`);
    club=club.data;
    let club_name=club.name;
    if(club.name=="Home")club_name="Welfare Board";
    document.getElementById("club_name").innerHTML=`Welcome to ${club_name}, IIT Guwahati`;
    document.getElementById("club_introduction").innerHTML=club.about;
    let temp_table="";
    temp_table+=` <li class="nav-item table_content list">
               <h4 class="nav-link text-secondary">Content</h4>
            </li>
            <li class="nav-item table_content list">
               <a class="nav-link text-secondary" href="#introduction">About</a>
            </li>`
    console.log(club);
    for(let i=0;i<club.cards_containers.length;i++)
    {
      let cards_container= await axios.get(`/project/api/cards_container/${club.cards_containers[i]}`);
      cards_container=cards_container.data;
      temp_table+= 
      `<li class="nav-item table_content list">
        <a class="nav-link  text-secondary" href="#${cards_container.title}">${cards_container.title}</a>
       </li>`
      console.log(cards_container);
    }
    document.getElementById("table_list").innerHTML=temp_table;
}
add_clubs_info();