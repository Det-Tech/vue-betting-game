const historyBuilder = require('../controllers/historyController');

module.exports = app => {
    app
        .route('/history')
        .get(historyBuilder.get_all_history)
        .post(historyBuilder.create_history);
};