import twilio from 'twilio';

const accountSid = 'AC2fdce2919374ecba343edc9a619a958c';
const authToken = 'f9edb71277926cbd0f68e62361cd35b9';

module.exports = new twilio.Twilio(accountSid, authToken);
