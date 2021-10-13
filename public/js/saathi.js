/** @format */

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache", 
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer", 
    body: JSON.stringify(data), 
  });
  return response.json(); 
}

function Send_MSG() {
  postData("http://localhost:3000/project/saathi-club", {
    name: document.getElementById("contact_name").value,
    email: document.getElementById("contact_email").value,
    body: document.getElementById("contact_body").value,
  })
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
        document.getElementById("success_msg").style.display = "";
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      setTimeout(() => {
        document.getElementById("success_msg").style.display = "none";
      }, 10000);
    })
    .catch((err) => {
      console.log(err); // JSON data parsed by `data.json()` call
        document.getElementById("danger_msg").style.display = "";
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      setTimeout(() => {
          document.getElementById("danger_msg").style.display = "none";
      }, 10000);
    });
}

document.getElementById("success_msg").style.display = "none";
document.getElementById("danger_msg").style.display = "none";
