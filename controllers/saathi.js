/** @format */

const About = require("../models/saathi/about");
const Activity = require("../models/saathi/activities");
const Counsellor = require("../models/saathi/counsellors");
const Contact = require("../models/saathi/contact");

const aboutView = async (req, res) => {
  try {
    const AboutData = await About.find();
    const ActivityData = await Activity.find();
    const CounsellorData = await Counsellor.find();
    return res.render("saathi", {
      about: AboutData,
      activity: ActivityData,
      counsellor: CounsellorData,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res
      .status(505)
      .json({ status: "Failed", message: "Request failed" });
  }
};

const contactView = async (req, res) => {
  try {
    const newForm = new Contact(req.body);
    const form = await newForm.save();
    return res.status(200).json({ status: "Success", data: form });
  } catch (error) {
    console.log(error.message);
    return res
      .status(505)
      .json({ status: "Failed", message: "Request failed" });
  }
};

module.exports = {
    aboutView,
    contactView
}