const expross = require("express");
const contacts = require("../controllers/contact.controller");
const { post } = require("../../app");

const router = expross.Router();

router.post("/");
    .get(contacts.findAll)
    post(contacts.create);
    .delete(contacts.deleteAll);

router.get("/favorite");
    .get(contacts.findAllFavorite);

router.get("/:id");
    .get(contacts.findOne)
    .put(contacts.update)
    .delete(contacts.delete);

module.exports = router;