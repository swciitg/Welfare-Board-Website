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
  const data = {
    name: document.getElementById("contact_name").value,
    email: document.getElementById("contact_email").value,
    body: document.getElementById("contact_body").value,
  };
  postData("http://localhost:3000/project/saathi", data)
    .then((data) => {
        document.getElementById("success_msg").style.display = "";
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      setTimeout(() => {
        document.getElementById("success_msg").style.display = "none";
      }, 3000);
    })
    .catch((err) => {
        document.getElementById("danger_msg").style.display = "";
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      setTimeout(() => {
          document.getElementById("danger_msg").style.display = "none";
      }, 3000);
    });
}


