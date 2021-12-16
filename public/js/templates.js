function cardCreateData(type){ 
    switch (type) {
        case "card":
            return `  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
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
            
        case "Teamcard":
            return `  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
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
                <label for="cardFile">Image</label>
              <input id = "cardFile" type = "file" style="width:100%"/>
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
        case "Events":
            return `<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
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
                <label for="cardType">Card Type</label>
                <select id="cardType" class="form-control">
                <option selected disabled hidden>Choose here</option>
                <option>CULTURAL</option>
                <option>TECHNICAL</option>
                </select>
               
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
        
 
            
}
}
const containerString = (container) => {
    switch(container){
    case "Teamcard" :
        return `
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
    </div>`

    case "Events":
        return `  
      <p>Events</p>
      <div id="parentcardContainer_1">
        <div class="events">
          <div id="cardContainer_1" class="ecards"></div>
          <div style="color: white">
            <span
              type="button"
              class="material-icons"
              onclick="currContainer('cardContainer_1')"
              >add</span
            >
          </div>
        </div>
      </div>
    </div>`
        case "Parent":
           return ` <div style="display: flex; align-items: center; justify-content: space-between">
                  <div>Card Containers</div>
                  <div style="display: flex; align-items: center; color: black">
                    <span type="button" class="material-icons" onclick="addcardContainer()"
                      >add</span
                    >
                    new Container
                  </div>
                </div>`
     }
 }
const prepareintialform = () => {
    let containers =
      '<div id="eventsContainer" class="card-heading">' +
      containerString('Events') +
      '<div id="teamcardContainer" class="card-heading">' +
      containerString('Teamcard')
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
   ${containers}
    <div class="card-heading">
      <label for="clubCreation">Creation</label>
      <input type="date" class="form-control" id="clubCreation" style="color: black" />
    </div>
    <button
      id="submitBtn"
      type="button"
      class="btn btn-primary card-heading"
    >
      Save
    </button>
  </div>
</div>
</div>`
}

const editCardString = (card) => { 
    switch (card.type) { 
        case "card":
            return `<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
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
      case "Teamcard":
        let fileName = ["No file Chosen"]
        if (card.image) {
          fileName = card.image.split("\\");
        }
      
            return `<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
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
              <label for="editcardFile">Image</label>
              <input id = "editcardFile" type = "file"  style="width:100%;color: transparent" onchange='filechange()'/>
              <span id="editcardFileName">${fileName[fileName.length - 1]}</span>
              
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
        default:
            let options;
            if (card.type=="CULTURAL") {
                options = `<option selected disabled hidden>Choose here</option>
                <option selected="selected">CULTURAL</option>
                <option>TECHNICAL</option>
                </select>`
            } else { 
                if (card.type == "TECHNICAL") {
                options = `<option selected disabled hidden>Choose here</option>
                <option>CULTURAL</option>
                <option selected="selected">TECHNICAL</option>
                </select>`
                } else { 
                options = `<option selected disabled hidden>Choose here</option>
                <option>CULTURAL</option>
                <option>TECHNICAL</option>
                </select>`
                }
            }
            
        return `<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
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
                  <label for="editcardType">Card Type</label>
            <select id="editcardType" class="form-control" value='${card.type}'>
              ${options}
               
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
}
const cardString = (type, divId, creation, des) => {
  let string
  if (type != 'Teamcard') {
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
                  <h5 class="card-title"  >${des}</h5>
                 
                </div>
              </div>
            
    `
  }
  return string
}

const homeString = () => { 
  return `  <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
            >
              <div
                type="button"
                class="btn btn-secondary btn-lg btn-block"
                style="display: flex; width: 80%; justify-content: center; align-self: center"
                onclick="addnewClub()"
              >
                Add New Club
              </div>
            </div>`
}