const mongoose = require('mongoose');
const history = mongoose.model('history');

exports.get_all_history = (req, res) => {
    history.find({}).sort({ time: 'desc' }).exec((err, history) => {
        console.log(history);
        if (err) res.send(err);
        res.json(history);
    });
};

exports.create_history = (req, res) => {
    const newHistory = new history(req.body);
    newHistory.save((err, history) => {
        if (err) res.send(err);
        res.json(history);
    });
};