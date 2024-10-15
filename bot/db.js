<<<<<<< HEAD
=======
<<<<<<<< HEAD:BACKEND/src/db/db.js
>>>>>>> 1a0da9a21de3e6da91a4937f2b4be3340ca40351
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
<<<<<<< HEAD
  storage: '../backend/prom.db', 
});


=======
  storage: 'prom.db',
});


========
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../backend/prom.db', 
});


>>>>>>>> 1a0da9a21de3e6da91a4937f2b4be3340ca40351:bot/db.js
>>>>>>> 1a0da9a21de3e6da91a4937f2b4be3340ca40351
export default sequelize;