module.exports = function (sequelize, DataTypes) {
    const Example = sequelize.define('Example', {
        text: DataTypes.STRING,
        description: DataTypes.text
    });
    return Example;
};
