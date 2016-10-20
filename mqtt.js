var mqtt = require("mqtt");
var player = require('play-sound')(opts = {})

// adapt this to your needs
var cfg = {
  "broker_url": 'mqtt://localhost:1883',
  "topic": "redmine",
  "status": {
    "closed": 5,
    "reopened": 8
    "closed": "5",
    "reopened": "8"
  },
  "priority": {
    "aboveNormal": 4
  }
};


// connect to the broker where the mqtt protocol endpoint is exposed
var client = mqtt.connect(cfg.broker_url);

client.on('connect', function(){
  console.log("connected!");
  client.subscribe(cfg.topic, function(err, granted){
    if (!err) {
      console.log("subscribed to " + cfg.topic);

      client.on("message", function(topic, message){
        var info = JSON.parse(message);

        console.log("MESSAGE CONTENT: " + message);
        switch(info.type){
          case "change":
            if (info.new_status == cfg.status.closed) { // issue closed!!!
              player.play('./sounds/applause.mp3');

            } else if (info.new_status == cfg.status.reopenend) { // issue reopenend!!!!
            } else if (info.new_status == cfg.status.reopened) { // issue reopenend!!!!
              console.log("BOO");
              player.play('./sounds/boo.mp3');
            }

            break;
          case "creation":
            if (info.priority > cfg.priority.aboveNormal) { // new urgent or high issue
              console.log("WATCHOUT");
              player.play('./sounds/siren.mp3');
            }
            break;
          default:
            console.log("not creation nor change, mmmmhhhh ....");
            // shouldn't get here
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
