import { Sequelize } from 'sequelize';
const connectPsql = async() => {
    const psql = await new Sequelize('TodosDatabase', 'vlukyane', '', {
        host: 'localhost',
        dialect: 'postgres',
        define: {
            timestamps: false
        }
    });
    return psql;
};

module.exports = connectPsql;
