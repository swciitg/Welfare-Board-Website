const Achievement = require("../models/achievement_home");
const Announcement = require("../models/announcement_home");
const About = require("../models/about_home");
const Vision = require("../models/vision_home");
const Event = require("../models/events_home");


exports.indexView = (req, res) => res.render("landing");

exports.homeView = async (req, res) => {
    try {
        const AnnounceData = await Announcement.find().sort({ creation: -1 });
        const AchieveData = await Achievement.find().sort({ creation: -1 });
        const AboutData = await About.findOne({});
        const VisionData = await Vision.findOne({});
        const EventData = await Event.find().sort({ creation: -1 });


        return res.render("home", { announcements: AnnounceData, achievements: AchieveData, about: AboutData, vision: VisionData, events: EventData })
    } catch (err) {

        console.log(err);
        return res
            .status(424)
            .json({ status: "Failed", message: "Request failed" });
    }
};