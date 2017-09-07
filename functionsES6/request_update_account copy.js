const admin = require('firebase-admin');

module.exports = function(req, res) {
    if(!req.body.phone) {
        return res.status(422).send({ error: 'You must provide a phone number' });
    }
    const phone = String(req.body.phone).replace(/[^\d]/g, ''); 
    const account = admin.database().ref('users/'+ phone);
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    admin.auth().signInWithCustomToken(req.header.token)
        .then(function(){
            account.on('value', snapshot => {
            account.off();
            const user = snapshot.val();
            if(!user){
                return res.status(422).send({ error: 'User not found' });
             }
            account.update({name: name, email:email, address: address }, () => {
                res.send({ account: user });
             });
         });
        })
        .catch(function(error){

       });
    account.on('value', snapshot => {
        account.off();
        const user = snapshot.val();
        if(!user){
            return res.status(422).send({ error: 'User not found' });
        }
        account.update({name: name, email:email, address: address }, () => {
            res.send({ account: user });
        });
    });
}
