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
}

const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/companies', async (req, res, next) => {
  try {
    res.send(await Company.findAll());
  }
  catch(ex) {
    next(ex);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex) {
    console.log(ex);
  }
};

init();