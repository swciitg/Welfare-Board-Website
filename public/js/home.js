console.log(1213)
events=JSON.parse(events)
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
/////////////////////////
var eventcontainer=document.getElementById("eventcontainer")
month=["January","February","March","April","May","June","July","August","September","October","November","December"]
const renderevents = function (category) {
console.log(category)
while (eventcontainer.firstChild) {
	eventcontainer.removeChild(eventcontainer.lastChild);
    }
    for (let i = 0; i < events.length; i++) {
        if (events[i].category == category || category=="ALL") {
           

            
            let div = document.createElement("div");
            div.className = "ecard card text-white bg-primary mb-3";
            div.style.width="19rem"
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

}