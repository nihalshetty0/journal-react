const router = require("express").Router();
const auth = require("../middleware/auth");
const { journalValidate } = require("../validator");

const Journal = require("../models/Journal");

router.get("/", auth, async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(journals);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const error = journalValidate.validate(req.body).error;

    if (error?.details[0].message) {
      return res.json({ msg: error.details[0].message });
    }

    const { title, text } = req.body;

    const newJournal = new Journal({
      title,
      text,
      user: req.user.id,
    });

    const journal = await newJournal.save();
    res.json(journal);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { title, text } = req.body;

  const journalField = {};

  if (title) journalField.title = title;
  if (text) journalField.text = text;

  try {
    let journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(400).json({ msg: "journal not found" });

    if (journal.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "Not authorized" });
    }

    journal = await Journal.findByIdAndUpdate(req.params.id, journalField, {
      new: true,
    });

    res.json(journal);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(400).json({ msg: "journal not found" });

    if (journal.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "Not authorized" });
    }

    journal = await Journal.findByIdAndDelete(req.params.id);

    res.json({ msg: "Journal removed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
