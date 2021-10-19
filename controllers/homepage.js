const Achievement = require("../models/homepage_models/achievement_home");
const Announcement = require("../models/homepage_models/announcement_home");
const About = require("../models/homepage_models/about_home");
const Vision = require("../models/homepage_models/vision_home");
const Event = require("../models/homepage_models/events_home");
const Team = require("../models/homepage_models/teams_home");




exports.homeView = async (req, res) => {
    try {
        const AnnounceData = await Announcement.find().sort({ creation: -1 });
        const AchieveData = await Achievement.find().sort({ creation: -1 });
        const AboutData = await About.findOne({});
        const VisionData = await Vision.findOne({});
        const EventData = await Event.find().sort({ creation: -1 });
        const TeamData = await Team.find().sort({creation:-1});

        
        return res.render("homepage", { announcements: AnnounceData, achievements: AchieveData, about: AboutData, vision: VisionData, events: EventData, teams: TeamData })
    } catch (err) {

        console.log(err);
        return res
            .status(424)
            .json({ status: "Failed", message: "Request failed" });
    }
};