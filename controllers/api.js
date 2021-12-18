const Cards_conainter = require('../models/cards_container')
const club = require('../models/Club')
const Teamcard = require('../models/TeamCard')
const Card = require('../models/Card')
const File = require('../models/File')
const fs = require('fs')
const path = require('path')

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
const get_all_slides = async () => {
  let data = await File.find({ is_slideshow_pic: true })
  return data
}
const get_teamcards = async (ids) => {
  let all_teamcards = []
  if (ids && ids.length > 0) {
    for (let i = 0; i < ids.length; i++) {
      let teamcard = await Teamcard.findById(ids[i])
      all_teamcards.push(teamcard)
    }
  }
  return all_teamcards
}
const addclubItems = async(club, cardContainer) => {
for (let j = 0; j < cardContainer.length; j++) {
  let container = cardContainer[j]
  let newContainer = await new Cards_conainter({ title: container.title })

  for (let i = 0; i < container.cards.length; i++) {
    let card = container.cards[i]
    let newCard
    if (card.type != 'Teamcard') {
      newCard = await new Card({
        title: card.title,
        description: card.description,
        creation: card.creation,
        type: card.type
      })
      await newCard.save()
      newContainer.cards.push(newCard._id)
    } else {
      newCard = await new Teamcard({
        name: card.name,
        email: card.email,
        phone: card.phone,
        role:card.role,
        image: card.image
      })
      await newCard.save()
      club.team_cards.push(newCard._id)
    }
  }
  if (newContainer.cards.length) {
    await newContainer.save()
    if (container.title == 'Events') {
      club.events_containers.push(newContainer._id)
    } else {
      club.cards_containers.push(newContainer._id)
    }
  }
}

await club.save()

return club
}
const deleteclubItems = async (delclub) => {
let delconts = await get_cards_containers(delclub.cards_containers)
if (delconts.length) {
  delconts.forEach(async (cont) => {
    if (cont.cards.length) {
      cont.cards.forEach(async (card) => {
        await card.delete()
      })
    }
    await cont.delete()
  })
  }
 delconts = await get_cards_containers(delclub.events_containers)
if (delconts.length) {
  delconts.forEach(async (cont) => {
    if (cont.cards.length) {
      cont.cards.forEach(async (card) => {
        await card.delete()
      })
    }
    await cont.delete()
  })
}
if (delclub.team_cards.length) {
  delclub.team_cards.forEach(async (card) => {
    await card.delete()
  })
  }
  await delclub.save()
  return delclub
  
}
const create_club = async (cardContainer,clubName,clubAbout,clubCreation) => {

  let newClub = await new club({
    name: clubName,
    about: clubAbout,
    creation: clubCreation
  });
  
 return await addclubItems(newClub, cardContainer)
  
  
}

const delete_club = async (id) => {
  let delclub = await club.findById(id).populate('team_cards')
  deleteclubItems(delclub)
  await delclub.delete();
}
const update_club = async (id, cardContainer, clubName, clubAbout, clubCreation) => {
  
  let oldclub = await club.findById(id).populate('team_cards')
  oldclub.name = clubName
  oldclub.about = clubAbout
  oldclub.creation = clubCreation
  await deleteclubItems(oldclub)
  oldclub.cards_containers = [];
  oldclub.events_containers = [];
  oldclub.team_cards = [];
  await addclubItems(oldclub,cardContainer)
  return oldclub;
}

const delete_slide = async (name) => {
  fs.unlink(path.join(__dirname, `../public/uploads/${name}`), err => {
    if (err) throw err
  })
  let slide = await File.deleteOne({ name })
}

module.exports = {
  get_all_clubs,
  get_club,
  get_cards_containers,
  get_all_slides,
  get_teamcards,
  create_club,
  delete_club,
  update_club,
  delete_slide
}
