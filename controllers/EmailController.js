var models  = require('./../models');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: 'skygod1994323@gmail.com',
      pass: 'Skwgirghd 1'
    }
    // host: "sg2plzcpnl473857.prod.sin2.secureserver.net",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    // auth: {
    //   user: 'hello@elonover.io', // generated ethereal user
    //   pass: '[=I+*#CQ*q^Z', // generated ethereal password
    // },
});

function sendMail(params) {

    let text = "Certain Percentage of " + params.name + " was exceeded. Current price is " + params.price;

    var mailOptions = {
        from: 'fedubs78@gmail.com',
        to: "fedubs78@gmail.com",
        subject: "Certain Percentage Exceed",
        text: text
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

function checkValidTime(before_time) {
    if (before_time) {
        let before_time_str = before_time.toLocaleDateString();
        let now = new Date().toLocaleDateString();

        if (now == before_time_str) {
            console.log('same date');

            return false;
            //return true;

        } else {
            return true;
        }
    } else {
        return true;
    }
}

module.exports.sendPercentageEmail = async (req, res, next) => {
    let params = req.body;
    let entry_id = params.entry_id;
    let entry = await models.entry.findOne({ where: { id: entry_id } });

    if (entry) {
        if (checkValidTime(entry.email_send_time)) {
            try {
                entry.email_send_time = new Date();
                await entry.save();

                // sendMail(params);

                return res.status(200).json({success: true});

            } catch (err) {
                // console.log(err);
                return res.status(200).json({success: false});
            }
            
        }
    }
}