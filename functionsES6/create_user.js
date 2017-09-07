import admin from 'firebase-admin';
const cors = require('cors')({ origin: true });

module.exports = function (req, res) {
    cors(req, res, () => {
        // Verify user provided a phone
        if (!req.body.phone) {
            return res.status(422).send({ error: 'Bad Input' });
        }
        // Format the phone number
        const phone = String(req.body.phone).replace(/[^\d]/g, "");

        // Create a new user account using that phone number
        admin.auth().createUser({ uid: phone })
            .then(user => res.send(user))
            .catch(err => res.status(422).send({ error: err }));

        //  Respond to the user request, saying the account was made
    });
}
