const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_full_stack');
const faker = require('faker');

const Company = sequelize.define('company', {
  name: {
    type: Sequelize.DataTypes.STRING(),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  catchPhrase: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.DataTypes.STRING(1000),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  phone: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

const syncAndSeed = async () => {
  await sequelize.sync({ force: true });
  await Promise.all([
    Company.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()}),
    Company.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()}),
    Company.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()}),
    Company.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()}),
    Company.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()})
  ]);
};

module.exports = { Company, syncAndSeed };