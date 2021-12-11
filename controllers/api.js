const Cards_conainter = require('../models/cards_container')
const club = require('../models/Club')
const Teamcard = require('../models/TeamCard')
const Card= require('../models/Card')
const get_all_clubs = async () => {
  return club.find().select('name')
}
const get_club = async (id) => {
  return club.findById(id)
}
const get_cards_containers = async (ids) => {

  let all_cards_conainters = []
  if (ids) {
    for (let i = 0; i < ids.length; i++) {
      let cards_conatiner = await Cards_conainter.findById(ids[i]).populate('cards')
      all_cards_conainters.push(cards_conatiner)
    }
  }
  return all_cards_conainters
}

const get_teamcards = async (ids) => {
  let all_teamcards = []
  for (let i = 0; i < ids.length; i++) {
    let teamcard = await Teamcard.findById(ids[i])
    all_teamcards.push(teamcard)
  }
  return all_teamcards
}
const create_club = async (cardContainer,clubName,clubAbout,clubCreation) => {

  let newClub = await new club({
    name: clubName,
    about: clubAbout,
    creation: clubCreation
  });
  for (let j = 0; j < cardContainer.length; j++) {
    let container = cardContainer[j];
    let newContainer = await new Cards_conainter({ title: container.title ,event:container.event})
 
     for (let i = 0; i < container.cards.length; i++) {
       let card = container.cards[i]
       let newCard;
       if (card.type == 'card') {
          newCard = await new Card({
           title: card.title,
           description: card.description,
           creation: card.creation,
           Event: card.Event,
           type:card.type
          })
          await newCard.save()
          newContainer.cards.push(newCard._id)
       
       } else {
          newCard = await new Teamcard({
            name: card.name,
            description: card.description,
            type: card.type
          })
         await newCard.save()
         newClub.team_cards.push(newCard._id)
         
       }
        
     }
    if (newContainer.cards.length) {
      await newContainer.save()
      if (container.event) {
        newClub.events_containers.push(newContainer._id)
      } else {
        newClub.cards_containers.push(newContainer._id)
      }
    }

  }

  await newClub.save();
  console.log(newClub);
}
const delete_club = async (id) => {
  
  let delclub = await club.findById(id).populate('team_cards')
  console.log(delclub)
  let delconts = await get_cards_conainters(delclub.cards_containers)
  if (delconts.length) {
    delconts.forEach(async (cont) => {
      if (cont.cards.length) {
        cont.cards.forEach(async (card) => {
          await card.delete();
    
        })
      }
      await cont.delete();
    })
  }
  if (delclub.team_cards.length) {
    delclub.team_cards.forEach(async (card) => {
      console.log(card)
      await card.delete()
    })
  }
  await delclub.delete();
  
}
module.exports = {
  get_all_clubs,
  get_club,
  get_cards_containers,
  get_teamcards,
  create_club,
  delete_club
}
