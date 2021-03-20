const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    links: [
        {type: Types.ObjectId, ref: 'Link'} //связка пользователя и запесей в бд (ref: 'Link' - с какой конкретно)
    ]
});

module.exports = model('User', schema);
