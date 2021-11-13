const express = require("express");
const project_service = require("../services/project.service");
const project_owner_service = require("../services/project_owner.service");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("project route").end();
});

router.post("/create", async (req, res) => {
  const project_id = uuidv4();
  const { project_info, username } = req.body;
  const { user_id } = await project_owner_service.getProjectOwnerId(username);
  const new_project_info = { user_id, project_id, ...project_info };
  try {
    await project_service.createProject(new_project_info);
    return res.send("success").status(201);
  } catch (err) {
    throw err;
  }
});

module.exports = router;