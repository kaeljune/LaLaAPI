const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
function handlePost(req, res) {
    if (!req.body.phone) {
        return res.status(422).send({ error: 'Phone must be provided' });
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const details = req.body.details;
    const location = req.body.location;
    const occasion = req.body.occasion;
    const priceRange = req.body.priceRange;
    const receiverImage = req.body.receiverImage;
    const receiverName = req.body.receiverName;
    const tags = req.body.tags;
    const ages = req.body.ages;
    const relationship = req.body.relationship;
    const sex = req.body.sex;
    admin.auth().getUser(phone)
        .then(() => {
            const ref = admin.database().ref('users/' + phone);
            ref.on('value', snapshot => {
                ref.off();
                const user = snapshot.val();

                const order = ref.child('orders/');
                const products = admin.database().ref('products')

                order.push({
                    details: details,
                    location: location,
                    occasion: occasion,
                    priceRange: priceRange,
                    receiverImage: receiverImage,
                    receiverName: receiverName,
                    tags: tags,
                    sex: sex,
                    ages: ages,
                    relationship: relationship,
                    status: 'Gifts Ready',
                    gifts: '-Kk9F8FyrScWv8gwnApa,-KkBc7XCH-vG6ARmiHUQ'
                }, () => {
                    res.send({ gifts: '-Kk9F8FyrScWv8gwnApa,-KkBc7XCH-vG6ARmiHUQ' });
                });
            });
        })
        .catch((err) => res.status(422).send({ error: err }))

}

module.exports = function (req, res) {
    cors(req, res, () => {
        switch (req.method) {
            case 'POST':
                handlePost(req, res);
                break;
            default:
                res.status(500).send({ error: 'Something blew up!' });
                break;
        }
    });
}

