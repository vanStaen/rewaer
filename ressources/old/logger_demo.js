const EventEmitter = require("events");
const uuid = require("uuid");

// console.log(uuid.v4());

// Create Class Logger
class Logger extends EventEmitter {
  log(msg) {
    // Call event
    this.emit("message", { id: uuid.v4(), msg });
  }
}

// module.exports = Logger;

const Logger = require("./logger_demo");
const logger = new Logger();
logger.on("message", (data) => console.log("Called Listener:", data));
logger.log("Hello Wokld");
logger.log("Hi My Dude");
