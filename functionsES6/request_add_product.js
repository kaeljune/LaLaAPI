import admin from 'firebase-admin';

module.exports = function (req, res) {

    const ref = admin.database().ref('products/');
    const ages = req.body.ages;
    const artisanID = req.body.artisanID;
    const description = req.body.description;
    const image = req.body.image;
    const location = req.body.location;
    const name = req.body.name;
    const occasions = req.body.occasions;
    const price = req.body.price;
    const tags = req.body.tags;
    const sex = req.body.sex;
    ref.push({
        ages: ages,
        artisanID: artisanID,
        description: description,
        image: image,
        location: location,
        name: name,
        occasions: occasions,
        price: price,
        sex: sex,
        tags: tags
    }, () => {
        res.send({ success: 'ok' });
    });

}
