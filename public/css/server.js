const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });

app.use(express.json());
app.use(express.urlencoded ({extended:true}));
app.use(express.static(path.join(__dirname, "public")));


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("Server listening on: http://localhost:" + PORT)
  );
});
