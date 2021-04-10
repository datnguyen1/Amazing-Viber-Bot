var axios = require('axios');

const ID = process.env['ID']

const TOKEN = process.env['TOKEN']


// SEND MESSAGE
const sendMessage = async (time) => {
    try {
        const res = await axios.post('https://chatapi.viber.com/pa/send_message', {
            "receiver": `${ID}`,
            "min_api_version": 1,
            "sender": {
                "name": "The Awesome Bot",
                "avatar": ""
            },
            "tracking_data": "tracking data",
            "type": "text",
            "text": `It is ${time}, and you are amazing`
        }, {
            headers: {
                'X-Viber-Auth-Token': `${TOKEN}`,
                'Content-Type': 'application/json'
            }
            });
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

// GET USER ONLINE STATUS
const getOnlineStatus = async () => {
    try {
        const res = await axios.post('https://chatapi.viber.com/pa/get_online', {
            "ids": [
                `${ID}`
            ]
        }, {
            headers: {
                'X-Viber-Auth-Token': TOKEN,
                'Content-Type': 'application/json'
            }
            }
        )
        return res.data.users[0].online_status;
    }
    catch (err) {
        console.log(err);
    }
}

// GET CDT TIME ZONE
const getTime = async () => {
    try {
        const res = await axios.get('http://worldtimeapi.org/api/timezone/America/Chicago')
        return res.data.datetime;
    } catch (err) {
        console.log('Not available');
    }
}

const youAreAwesome = async () => {
    const status = getOnlineStatus();
    const time = getTime();
    let combo = await Promise.all([status, time]);
    console.log(combo);
    if (combo[1] == undefined) {
        isGoodTime();
    }
    if (parseInt(combo[1].slice(11, 13)) > 23 && parseInt(combo[1].slice(11, 13)) < 7) {
        console.log("It is not the right time");
    } else {
        if (combo[0] == 0 && combo[1] !== undefined) {
            sendMessage(combo[1].slice(11, 16))
        }
    }
}

setInterval(youAreAwesome, 5000);
