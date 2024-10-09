const express = require('express');
const cors = require('cors');
const path = require('path');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.json({
        ok: true,
        msg: 'GET API'
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }
}

module.exports = Server;