const admin = require('firebase-admin');
const _ = require('lodash');
const cors = require('cors')({ origin: true });

module.exports = function (req, res) {

    cors(req, res, () => {
        const ref = admin.database().ref('products/');
        ref.once("value", function (snapshot) {
            const products = snapshot.val();
            const weightingProduct = products => {
                return _.map(products, (product, key) => {
                    const weight = {
                        sex: (_.intersection(_.split(product.sex, ',', 2), req.body.sex.split(' ')).length >= 1) ? 2 : 0,
                        tags: _.intersection(product.tags.split(','), req.body.tags).length,
                        occasion: product.occasions.indexOf(req.body.occasion) != -1 ? 5 : 0
                    };

                    return { [key]: _.assign(product, { weight: _.sum(_.values(weight)) }) };
                });
            };
            const object = _.orderBy(weightingProduct(products), e => { return _.values(e)[0].weight }, ['desc']);
            const resGifts = _.merge(object[0], object[1], object[2], object[3], object[4], object[5]);
            if (!req.body.phone) {
                return res.status(422).send({ error: 'Phone must be provided' });
            }

            const phone = String(req.body.phone).replace(/[^\d]/g, '');
            const location = req.body.location;
            const occasion = req.body.occasion;
            const priceRange = req.body.priceRange;
            const receiverImage = req.body.receiverImage;
            const receiverName = req.body.receiverName;
            const tags = req.body.tags;
            const ages = req.body.ages;
            const details = req.body.details;
            const relationship = req.body.relationship;
            const sex = req.body.sex;

            admin.auth().getUser(phone)
                .then(() => {
                    const ref = admin.database().ref('users/' + phone);
                    ref.on('value', snapshot => {
                        ref.off();
                        const user = snapshot.val();

                        const order = ref.child('orders/');

                        const orderPush =order.push({
                            location: location,
                            occasion: occasion,
                            priceRange: priceRange,
                            receiverImage: receiverImage,
                            receiverName: receiverName,
                            tags: tags,
                            sex: sex,
                            details: details,
                            ages: ages,
                            relationship: relationship,
                            status: 'Gifts Ready',
                            gifts: resGifts
                        }, () => {
                            console.log(resGifts);
                        });
                        const orderID = orderPush.key;
                        res.send({orderKey : orderID,});
                    });
                })
                .catch((err) => res.status(422).send({ error: err }))
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    });
}
