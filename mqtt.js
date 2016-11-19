var mqtt = require("mqtt");
var player = require('play-sound')(opts = {})

// adapt this to your needs
var cfg = {
  // specific stuff for your message broker
  "broker_url": 'mqtt://localhost:1883',
  "topic": "redmine",

  // IDs for statuses are not always the same
  "status": {
    "closed": 5,
    "reopened": 8
  },

  // what do you consider high or urgent priority?
  "priority": {
    "aboveNormal": 4
  },

  // IDs of projects you want to listen to
  "projects": [1]
};

var debug = true;

// connect to the broker where the mqtt protocol endpoint is exposed
var client = mqtt.connect(cfg.broker_url);

client.on('connect', function(){
  console.log("connected!");

  client.subscribe(cfg.topic, function(err, granted){
    if (!err) {
      console.log("subscribed to " + cfg.topic);

      client.on("message", function(topic, message){
        var info = JSON.parse(message);

        if (debug) console.log("you received a message: " + message)

        // make sure the event occurs for one of the projects we're interested in
        if (cfg.projects.indexOf(info.project_id) >= 0) {

          switch(info.type){
            case "change":
              if (info.new_status_id == cfg.status.closed) { // issue closed!!!
                player.play('./sounds/applause.mp3');
              } else if (info.new_status_id == cfg.status.reopenend) { // issue reopenend!!!!
                player.play('./sounds/boo.mp3');
              }
              break;
            case "creation":
              if (info.priority_id > cfg.priority.aboveNormal) { // new urgent or high issue
                player.play('./sounds/siren.mp3');
              }
              break;
            default:
              // shouldn't get here
              if (debug) console.log("not creation nor change, mmmmhhhh ....");
          }
        } else {
          if (debug) console.log("not listening to events for this project: " + info.project_id);
        }
      });
    }
  })
});

// I guess these may differ from Redmine to Redmine, these are ours

/*
  priorities:
  3 - low
  4 - normal
  5 - high
  6 - urgent

*/

/*
  statuses:
  1 - new
  2 - assigned
  3 - resolved
  4 - feedback
  5 - closed
  6 - rejected
  8 - reopenend
*/

/*
  what the message looks like:
  {
   "type":"change",
   "issue_id":5,
   "project_id":1,
   "priority_id":2,
   "old_status_id":"1",
   "new_status_id":"5"
  }
*/
