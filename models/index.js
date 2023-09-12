const User = require('./User');
const Quest = require('./Quest');
const DailyLog = require('./DailyLog');

User.hasMany(Quest, {
    foreignKey: 'user_id',
    onDelete: 'Cascade'
});

Quest.belongsTo(User, {
    foreignKey: 'user_id'
});

Quest.hasMany(DailyLog, {
    foreignKey: 'quest_id',
    onDelete: 'Cascade'
});

DailyLog.belongsTo(Quest, {
    foreignKey: 'quest_id'
});

module.exports = { User, Quest, DailyLog };