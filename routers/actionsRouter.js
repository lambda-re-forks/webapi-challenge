const express = require("express");

// const projectDb = require("../data/helpers/projectModel");
const actionDb = require("../data/helpers/actionModel");

const { validateAction, validateActionId } = require("../middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await actionDb.get();
    res.status(200).json(actions);
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "Something went wrong when getting the actions" });
  }
});

router.get("/:id", validateActionId, async (req, res) => {
  res.status(200).json(req.action);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await actionDb.remove(id);
    if (!deleted) {
      res
        .status(404)
        .json({ errorMessage: "There is no action there to delete" });
    } else {
      res.status(200).json(deleted);
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: "Something went wrong when deleting the action"
    });
  }
});

module.exports = router;
