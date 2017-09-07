const admin = require('firebase-admin');
const _ = require('lodash');

module.exports = function (req, res) {
    console.log(req.body);
    let style = req.body.result.parameters['style'];
    let occasion = req.body.result.parameters['occasion'];
    let relationship = req.body.result.parameters['relationship'];
    let age = req.body.result.parameters['age'];
    let budget = req.body.result.parameters['budget'];
    console.log(style);
    const order = admin.database().ref('ordersFB/');
    const ref = admin.database().ref('products/');
    ref.once("value", function (snapshot) {
        const products = snapshot.val();
        const weightingProduct = products => {
            return _.map(products, (product, key) => {
                const weight = {
                    sex: (_.intersection(_.split(product.sex, ',', 2), ['male']).length >= 1) ? 2 : 0,
                    tags: _.intersection(product.tags.split(','), style).length,
                    occasion: product.occasions.indexOf(occasion) != -1 ? 5 : 0
                };

                return { [key]: _.assign(product, { weight: _.sum(_.values(weight)) }) };
            });
        };
        const object = _.orderBy(weightingProduct(products), e => { return _.values(e)[0].weight }, ['desc']);
        const resGifts = _.merge(object[0], object[1], object[2], object[3], object[4], object[5]);
        order.push({
            location: 'vietnam',
            occasion: occasion,
            priceRange: ['0', budget],
            receiverImage: '',
            receiverName: '',
            tags: style,
            sex: 'male',
            ages: age,
            relationship: relationship,
            status: 'Gifts Ready',
            gifts: _.keys(resGifts)
        }, () => {
            console.log(resGifts);
        });

    });
    res.json({
        "messages": [
            {
                "type": 0,
                "speech": "So, I'm looking for a gift for you. We'll telephone you as soon as possible."
            }
        ]
    });
}
