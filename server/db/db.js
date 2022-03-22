const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_full_stack');
const faker = require('faker');

const Orchestra = sequelize.define('orchestra', {
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

const Musician = sequelize.define('musician', {
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  instrument: {
    type: Sequelize.DataTypes.STRING,
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
})

Musician.belongsTo(Orchestra);
Orchestra.hasMany(Musician);

const syncAndSeed = async () => {
  await sequelize.sync({ force: true });
  const [orchestra1, orchestra2, orchestra3, orchestra4, orchestra5] = await Promise.all([
    Orchestra.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()}),
    Orchestra.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()}),
    Orchestra.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()}),
    Orchestra.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()}),
    Orchestra.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()})
  ]);
  const [musician1, musician2, musician3, musician4, musician5, musician6, musician7, musician8] = await Promise.all([
    Musician.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`, instrument: 'violin', phone: faker.phone.phoneNumber()}),
    Musician.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`, instrument: 'violin', phone: faker.phone.phoneNumber()}),
    Musician.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`, instrument: 'cello', phone: faker.phone.phoneNumber()}),
    Musician.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`, instrument: 'viola', phone: faker.phone.phoneNumber()}),
    Musician.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`, instrument: 'violin', phone: faker.phone.phoneNumber()}),
    Musician.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`, instrument: 'cello', phone: faker.phone.phoneNumber()}),
    Musician.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`, instrument: 'bass', phone: faker.phone.phoneNumber()}),
    Musician.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`, instrument: 'viola', phone: faker.phone.phoneNumber()})
  ]);
  musician1.companyId = orchestra1.id;
  musician2.orchestraId = orchestra2.id;
  musician3.orchestraId = orchestra2.id;
  musician4.orchestraId = orchestra3.id;
  musician5.orchestraId = orchestra4.id;
  musician6.orchestraId = orchestra4.id;
  musician7.orchestraId = orchestra4.id;
  musician8.orchestraId = orchestra5.id;
  await Promise.all([
    musician1.save(),
    musician2.save(),
    musician3.save(),
    musician4.save(),
    musician5.save(),
    musician6.save(),
    musician7.save(),
    musician8.save()
  ]);
};

module.exports = { Orchestra, Musician, syncAndSeed };