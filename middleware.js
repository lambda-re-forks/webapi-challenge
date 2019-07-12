const projectDb = require("./data/helpers/projectModel");
const actionDb = require("./data/helpers/actionModel");

const validateProject = (req, res, next) => {
  const project = req.body;
  if (Object.keys(project).length === 0) {
    res.status(400).json({ errorMessage: "You must include a request body" });
  } else if (!project.name || !project.description) {
    res.status(400).json({
      errorMessage: "You must include a name and description for the project"
    });
  } else {
    next();
  }
};

const validateAction = (req, res, next) => {
  const action = req.body;
  if (Object.keys(action).length === 0) {
    res.status(400).json({ errorMessage: "You must include a request body" });
  } else if (!action.notes || !action.description) {
    res.status(400).json({
      errorMessage: "You must include notes and a description for the action"
    });
  } else {
    next();
  }
};

const validateProjectId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const project = await projectDb.get(id);
    if (!project) {
      res.status(404).json({
        errorMessage: "Sorry, there is no project there."
      });
    } else {
      req.project = project;
      next();
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: "Something went wrong"
    });
  }
};

const validateActionId = async (req, res, next) => {
  const id = req.params.actionId;
  try {
    console.log("here");
    const action = await actionDb.get(id);
    if (!action) {
      res.status(404).json({
        errorMessage: "Sorry, there is no action there."
      });
    } else {
      req.action = action;
      next();
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: "Something went wrong"
    });
  }
};

module.exports = {
  validateProject,
  validateAction,
  validateProjectId,
  validateActionId
};
