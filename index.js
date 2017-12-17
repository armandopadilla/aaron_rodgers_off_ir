const axios = require('axios');
const convert = require('xml-js');

axios
  .get('http://feeds.nfl.com/feeds-rs/roster/1800.xml')
  .then(resp => {
      const data = resp.data;
      const json = convert.xml2js(data);
      const players = json.elements[0].elements[2].elements;

      players.forEach(player => {
          const attr = player.attributes;
          if (attr.displayName == 'Aaron Rodgers') {
             console.log(attr.status);
             const status = attr.status;
             if (status != 'RES') {
               var AWS = require('aws-sdk');
               AWS.config.region = 'us-east-1';
               var sns = new AWS.SNS({
                 accessKeyId: '',
                 secretAccessKey: ''
               });

               var params = {
                 Message: 'Aaron Rodgers is OFF IR',
                 MessageStructure: 'string',
                 PhoneNumber: 'YOUR_NUMBER_HERE'
               };

               sns.publish(params, function(err, data) {
                 if (err) console.log(err, err.stack);
                 else console.log(data);
               });
             }
          }
      })
});

