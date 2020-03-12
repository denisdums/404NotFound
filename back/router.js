const express = require("express");
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/quiz');
const verify=require('./connectionRouter').verify; // middleware function to protect routes

module.exports = router;

router

    .get('/quizz', (req, res) => {

            db.all(
                "select * from quizzes",

                        (err, row) => {
                            res.json(row)
                        }
                    );

    })
    .get('/quizz/:id', (req, res) => {

        db.all(
            "select * from quizzes where id = ?", [req.params.id],
            (err, row) => {
                res.json(row)
            }
        );
    })

    .get('/quizz/jouer/:id', (req, res) => {

        db.all(
            "select * from questions where quizzes_id = ? ", [req.params.id],
            (err, row) => {
                res.json(row)
            }
        );
    })

    .get('/quizz/reponse/:id', (req, res) => {

        db.all(
            "select * from answers where questions_id = ? ", [req.params.id],
            (err, row) => {
                res.json(row)
            }
        );
    })

    .get('/user/:username', (req, res) => {

        db.all(
            "select * from user where username = ?", [req.params.username],
            (err, row) => {
                res.json(row)
            }
        );
    })

    .get('/user', (req, res) => {

        db.all(
            "select * from user ORDER BY score desc",
            (err, row) => {
                res.json(row)
            }
        );
    })

    .get('/recherche/:searchtxt',
        (req, res) => {
            db.all(
                "select * from quizzes WHERE name LIKE ? OR keywords LIKE ?",
                "%" + req.params.searchtxt + "%","%" + req.params.searchtxt + "%",
                (err, row) => {
                    res.json(row)
                }
            );
        })

    .patch('/scoreAdd/:username/:score',
        (req, res) => {
            db.run("update user set score=score+? where username=?",[req.params.score,req.params.username],
                (err, row) => {
                res.json(row)
            });
            res.status(200).json(req.body);
        })



    .use((req, res) => {
        res.status(400);
        res.json({
            error: "Bad request"
        })
    });