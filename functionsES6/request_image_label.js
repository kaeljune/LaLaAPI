import admin from 'firebase-admin';
import { vision } from '@google-cloud/vision';
import { storage } from '@google-cloud/storage';
import { cors } from 'cors';

cors({ origin: true });

module.exports = function (req, res) {
    cors(req, res, () => {
        const bucketName = 'airlala-7b1b2';
        const fileName = 'tmp/oono.jpg';
        vision.detectLabels(storage.bucket(bucketName).file(fileName))
            .then((results) => {
                const labels = results[0];
                res.send({ labels: labels })
            })
            .catch((err) => {
                res.status(422).send({ err: err[0] })
            });
    });

}
