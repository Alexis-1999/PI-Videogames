const { Router } = require("express")
const { getGamesHandlers, getDetailHandler, createGamesHandler } = require("../handlers/gamesHandlers")

const getRouter = Router()

getRouter.get("/", getGamesHandlers)
getRouter.get("/:id", getDetailHandler)
getRouter.post("/", createGamesHandler)

module.exports={
    getRouter
}

