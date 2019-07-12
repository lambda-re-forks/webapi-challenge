const express = require("express");

const projectDb = require("../data/helpers/projectModel");
const actionDb = require("../data/helpers/actionModel");

const {
  validateProject,
  validateAction,
  validateProjectId,
  validateActionId
} = require("../middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await projectDb.get();
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "Something went wrong when getting the projects" });
  }
});

router.get("/:id", validateProjectId, async (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", validateProject, async (req, res) => {
  const newPost = req.body;
  try {
    const post = await projectDb.insert(newPost);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      errorMessage:
        "Something went wrong when adding the project to the database"
    });
  }
});

router.post(
  "/:id/actions",
  validateAction,
  validateProjectId,
  async (req, res) => {
    const newAction = { ...req.body, project_id: req.params.id };
    try {
      const addedAction = await actionDb.insert(newAction);
      res.status(201).json(addedAction);
    } catch (error) {
      res.status(500).json({
        errorMessage:
          "Something went wrong when adding the action to the project"
      });
    }
  }
);

router.put("/:id", validateProject, async (req, res) => {
  const id = req.params.id;
  const projectInfo = req.body;
  try {
    const updated = await projectDb.update(id, projectInfo);
    if (!updated) {
      res
        .status(404)
        .json({ errorMessage: "There is no project there to update" });
    } else {
      res.status(200).json(updated);
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: "Something went wrong when updating the project"
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await projectDb.remove(id);
    if (!deleted) {
      res
        .status(404)
        .json({ errorMessage: "There is no project there to delete" });
    } else {
      res.status(200).json(deleted);
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: "Something went wrong when deleting the project"
    });
  }
});
router.put(
  "/:id/actions/:actionId",
  validateAction,
  validateProjectId,
  validateActionId,
  async (req, res) => {
    const id = req.params.actionId;
    const actionInfo = req.action;
    try {
      const updated = await actionDb.update(id, actionInfo);
      if (!updated) {
        res
          .status(404)
          .json({ errorMessage: "There is no action there to update" });
      } else {
        res.status(200).json(updated);
      }
    } catch (error) {
      res.status(500).json({
        errorMessage: "Something went wrong when updating the action"
      });
    }
  }
);

module.exports = router;
