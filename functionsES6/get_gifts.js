// const admin = require('firebase-admin');
// const _ = require('lodash');
// const cors = require('cors')({ origin: true });

import admin from 'firebase-admin';
import _ from 'lodash';
import { cors } from 'cors';

cors({ origin: true });

module.exports = function (req, res) {
  cors(req, res, () => {
    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const orderID = req.body.orderID;
    admin.auth().getUser(phone)
        .then(() => {
            const ref = admin.database().ref('users/' + phone+'/orders/'+orderID+'/gifts/');
            ref.on('value', snapshot => {
                ref.off();
                const gifts = snapshot.val();

                _.map(gifts, (giftID) => {
                  const refGif = admin.database().ref('/products/' + giftID);
                  refGif.once('value', snapshot => snapshot.val())
                })
            });
        })
        .catch((err) => res.status(422).send({ error: err }))
    })
}
