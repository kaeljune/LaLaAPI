import admin from 'firebase-admin';

module.exports = function (req, res) {

    const ref = admin.database().ref('artisans/');
    const description = req.body.description;
    const name = req.body.name;
    const logo = req.body.logo;
    const phone = req.body.phone;
    ref.push({
        description: description,
        name: name,
        logo: '#',
        phone: '#'
    }, () => {
        res.send({ success: 'ok' });
    });

}
