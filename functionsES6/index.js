import admin from 'firebase-admin';
import * as functions from "firebase-functions";

import createUser from './create-user';
import serviceAccount from './service_account.json';
import requestOneTimePassword from './request_otp';
import verifyOneTimePassword from './verify_otp';
import requestGifts from './request_gifts';
import requestAddProduct from './request_add_product';
import requestAddArtisan from './request_add_artisan';
import requestImageLabel from './request_image_label';
import chatbotWebhook from './chatbot_webhook';
import getGifts from './get_gifts';

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://airlala-7b1b2.firebaseio.com",
      storageBuket: "gs://airlala-7b1b2/"
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword);
exports.requestGifts = functions.https.onRequest(requestGifts);
exports.requestAddProduct= functions.https.onRequest(requestAddProduct);
exports.requestAddArtisan= functions.https.onRequest(requestAddArtisan);
exports.requestImageLabel = functions.https.onRequest(requestImageLabel);
exports.chatbotWebhook = functions.https.onRequest(chatbotWebhook);
exports.requestProducts = functions.https.onRequest(requestProducts);
exports.getGifts = functions.https.onRequest(getGifts);
