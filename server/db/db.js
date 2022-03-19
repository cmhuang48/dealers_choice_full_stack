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

const Employee = sequelize.define('employee', {
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

Employee.belongsTo(Company);
Company.hasMany(Employee);

const syncAndSeed = async () => {
  await sequelize.sync({ force: true });
  const [company1, company2, company3, company4, company5] = await Promise.all([
    Company.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()}),
    Company.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()}),
    Company.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()}),
    Company.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()}),
    Company.create({name: faker.company.companyName(), catchPhrase: faker.company.catchPhrase(), description: faker.lorem.paragraph(), phone: faker.phone.phoneNumber()})
  ]);
  const [employee1, employee2, employee3, employee4, employee5, employee6, employee7, employee8] = await Promise.all([
    Employee.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`}),
    Employee.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`}),
    Employee.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`}),
    Employee.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`}),
    Employee.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`}),
    Employee.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`}),
    Employee.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`}),
    Employee.create({name: `${faker.name.firstName()} ${faker.name.lastName()}`})
  ]);
  employee1.companyId = company1.id;
  employee2.companyId = company2.id;
  employee3.companyId = company2.id;
  employee4.companyId = company3.id;
  employee5.companyId = company4.id;
  employee6.companyId = company4.id;
  employee7.companyId = company4.id;
  employee8.companyId = company5.id;
  await Promise.all([
    employee1.save(),
    employee2.save(),
    employee3.save(),
    employee4.save(),
    employee5.save(),
    employee6.save(),
    employee7.save(),
    employee8.save()
  ]);
};

module.exports = { Company, Employee, syncAndSeed };