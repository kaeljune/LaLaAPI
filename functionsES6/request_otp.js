import admin from 'firebase-admin';
const cors = require('cors')({ origin: true });

import twilio from './twilio';

module.exports = function (req, res) {
    cors(req, res, () => {
        if (!req.body.phone) {
            return res.status(422).send({ error: 'You must provide a phone number' });
        }

        const phone = String(req.body.phone).replace(/[^\d]/g, '');

        admin.auth().getUser(phone)
            .then(userRecord => {
                const code = Math.floor((Math.random() * 8999 + 1000));

                twilio.messages.create({
                    body: 'Your code is ' + code,
                    to: '+' + phone,
                    from: '+18329002975'
                }, (err) => {
                    if (err) { return res.status(422).send(err); }

                    admin.database().ref('users/' + phone)
                        .update({ code: code, codeValid: true }, () => {
                            res.send({ success: true });
                        });
                })
            })
            .catch((err) => {
                res.status(422).send({ error: err });
            });
    });
}
