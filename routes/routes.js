const express = require("express");
const router = express.Router();

const User = require('../models/user')
const Moves = require('../models/moves')
const Game = require('../models/game')


//  Users routes
router.get("/users", async (req, res, next) => {
    console.log(req.headers.name);
    let name = req.headers.name;
    console.log(name)
    let us = await User.findOne({
        user: name
    })
    if (req.headers.name) {
        return res.send({
            user: us
        });
    }
    const users = await User.find();
    return res.send({
        users,
    });
})

router.post("/users", async (req, res) => {
    const {
        user,
        stats,
        games
    } = req.body;
    User.findOne({
        user: user
    }, async (err, usr) => {
        if (usr) {
            res.send({
                status: "OK",
                message: "User already exists"
            });
        } else {
            const nuser = new User({
                user,
                stats,
                games
            });
            let v = await nuser.save();
            console.log(v)
            res.json({
                status: "OK",
                message: "User saved"
            })
        }

    })
})
router.put("/users", async (req, res) => {
    let name = req.body.name;
    let win = req.body.win;
    let lose = req.body.lose;
    let against = req.body.against;
    let user = await User.findOne({
        user: req.body.name
    })
    let stats = user.stats;
    let games = user.games;
    console.log(user, user.stats)
    if (win > lose) {
        stats.win++
    } else {
        stats.lose++
    }
    games.push({
        against,
        win,
        lose
    })
    await User.updateOne({
        user: name
    }, {
        $set: {
            stats,
            games
        }
    }, console.log)
    return res.send({
        status: "OK"
    });
})

router.delete("/users", async (req, res) => {
    let name = req.body.name;
    await User.find({
        user: name
    }, async (err, doc) => {
        if (doc.length === 0) {
            return res.send({
                status: "Fail",
                message: "User does not exist"
            });
        } else {
            await User.deleteOne({
                user: name
            }, (err) => {
                if (err) {
                    return res.send({
                        status: "Fail",
                        message: err
                    });
                } else {
                    return res.send({
                        status: "Ok",
                        message: "User [" + name + "] deleted"
                    });
                }
            })
        }
    })
})


// Moves routes
router.get("/moves", async (req, res, next) => {
    const moves = await Moves.find();
    return res.send({
        moves,
    });
})

router.post("/moves", async (req, res) => {
    const {
        move
    } = req.body;
    if (move[0] === null || move[1] === null) {
        return res.send("Joder");
    }
    Moves.findOne({
        move: move
    }, async (err, m) => {
        if (err) {
            res.send({
                status: "Fail",
                message: err
            })
        } else if (m) {
            res.send({
                status: "Fail",
                message: "Move already exists"
            })
        } else {
            const nmove = new Moves({
                move
            });
            await nmove.save();
            res.send({
                status: "OK",
                message: "Move " + move[0] + " -> " + move[1] + "saved"
            })
        }
    })
})

router.delete("/moves", (req, res) => {
    Moves.deleteOne({
        move: req.body.move
    }, (err, data) => {
        if (err) {
            res.send({
                status: "Fail",
                message: "No such move [" + req.body.move + "]"
            })
        } else {
            res.send({
                status: "OK",
                message: "Move " + req.body.move + " deleted"
            })
        }
    })

})

//Settings
router.get("/settings", async (req, res) => {

    let sett = await Game.find()
    if (sett.length === 0) {
        let ng = new Game({
            top: 5
        })
        ng.save()
        res.send({
            top: 5
        })
    } else {
        res.send({
            top: sett[0].top
        })
    }
})
router.put("/settings", async (req, res) => {
    let {
        top
    } = req.body
    let sett = await Game.find();
    top = Number(top);
    console.log(sett[0], top);
    Game.updateOne({

        }, {
            $set: {
                top: top
            }
        },
        console.log)
    return res.send({
        status: "OK"
    });
})
module.exports = router;