// var express = require('express');
// var app = express();
// app.use(express.static('public'));
// app.listen(process.env.PORT || 8080);

// exports.app = app;

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const {DATABASE_URL, PORT} = require('./config');
const {Discounts} = require('./models');
const {Users} = require('./models');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

app.get('/discounts', (req, res) => {
	Discounts
		.find()
		.exec()
		.then(discounts => {
			res.json(discounts.map(discount => discount.apiRepr()));
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'something went terribly wrong'});
		});
});

app.get('/discounts/:id', (req, res) => {
	Discounts
		findById(req.params.id)
		.exec()
		.then(discount = res.json(discount.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'something went terribly wrong'});
		});
});

app.get('/users', (req, res) => {
	Users
		.find()
		.exec()
		.then(users => {
			res.json(users.map(user => user.apiRepr()));
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'something went terribly wrong'});
		});
});

app.post('/discounts', (req, res) => {
  const requiredFields = ['restaurant', 'discount', 'foodType', 'discountType'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Discounts
    .create({
      restaurant: req.body.restaurant,
      discount: req.body.discount,
      foodType: req.body.foodType,
      discountType: req.body.discountType
    })
    .then(discount => res.status(201).json(discount.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});

app.post('/users', (req, res) => {
  const requiredFields = ['username', 'password'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Users
    .create({
      username: req.body.username,
      password: req.body.password
    })
    .then(discount => res.status(201).json(discount.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});

app.delete('/discounts/:id', (req, res) => {
  Discounts
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

app.put('/discounts/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['restaurant', 'discount', 'foodType', 'discountType', 'favorite'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Discounts
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatedPost => res.status(201).json(updatedPost.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

app.put('/users/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['username', 'password', 'favorites'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Discounts
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatedPost => res.status(201).json(updatedPost.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};
