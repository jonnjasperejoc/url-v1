const express = require("express");
const router = express.Router();
const Url = require("../../models/Url");

makeid = length => {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

router.get("/:id", (req, res) => {
    const randomId = req.params.id;

    Url.findOne({ randomId }).then(rec => {
        if (rec) {
            return res.status(200).send({
                _id: rec._id,
                url: rec.url,
                randomId: rec.randomId
            });
        }

        res.status(404).send({
            msg: "Not Found!"
        });
    });
});

router.post(
    "/",
    (req, res) => {
        const url = req.body.url;
        const randomId = makeid(8);

        Url.findOne({ url }).then(rec => {
            if (rec) {
                return res.status(201).send({
                    _id: rec._id,
                    url: rec.url,
                    randomId: rec.randomId
                });
            }

            Url.findOne({ randomId }).then(rec => {
                if (rec) {
                    return res.status(201).send({
                        _id: rec._id,
                        url: rec.url,
                        randomId: rec.randomId
                    });
                }

                const record = new Url({
                    url,
                    randomId
                });

                try {
                    record.save().then(rec =>
                        res.send({
                            _id: rec._id,
                            url: rec.url,
                            randomId: rec.randomId
                        })
                    );
                } catch (e) {
                    res.status(400).send(e);
                }
            });
        });
    },
    (error, res) => {
        res.status(400).send({
            error: error.message
        });
    }
);

module.exports = router;
