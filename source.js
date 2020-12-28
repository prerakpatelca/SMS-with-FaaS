// "StAuth10065: I Prerak Patel, 000825410 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."


var redis = require("redis");
const axios = require("axios");

client = redis.createClient({
    url: "redis://redis-13302.c13.us-east-1-3.ec2.cloud.redislabs.com:13302",
    password: "4H10yr9gHoo7Wlt165H8oQhJtSCfMH3N"
});

function updateStatus(_status, _message) {
    return new Promise(function(resolve) {
        try {
            client.set("update", _status, _message);

        } catch (error) {
            console.error(error);
        }
    });
}


exports.handler = function(context, event, callback) {
    const got = require('got');
    var twiml = new Twilio.twiml.MessagingResponse();
    var message = event.Body.toLowerCase();


    if (message.startsWith("update")) {
        var first_position = message.indexOf("update") + 6;
        var half_slice = message.slice(first_position).trim();
        var second_position = half_slice.indexOf(" ");
        var _status = half_slice.slice(0, second_position);
        var _message = half_slice.slice(second_position);
        const apiResponse = updateStatus(_status, _message.trim());
        twiml.message("Update Status Inserted")
        callback(null, twiml);
    } else if (message.startsWith("quote")) {
        got('https://programming-quotes-api.herokuapp.com/quotes/random').then(response => {
            const jsonBody = JSON.parse(response.body);
            let quote = JSON.stringify(jsonBody.en);
            twiml.message(quote)
            callback(null, twiml);
        });
    } else if (message.startsWith("advice")) {
        got('https://api.adviceslip.com/advice').then(response => {
            const jsonBody = JSON.parse(response.body);
            let advice = JSON.stringify(jsonBody.slip.advice);
            twiml.message(advice)
            callback(null, twiml);
        });
    } else if (message.startsWith("helpme")) {
        let helpmeCommand = "Available Commands:\n\n" +
            "Quote - This command will return random programming quotes.\n\n" +
            "Advice - This command will return random advices.\n\n" +
            "Update - This command will update the SQLite database on the server side." +
            "helpme - This command will return all the commands that the number would respond to.\n\n" +
            "help command - This command will return with explaination on how to use that command that specific command";
        twiml.message(helpmeCommand)
        callback(null, twiml);
    } else if (message.startsWith("help")) {
        var position = message.indexOf("help") + 5;
        var command = message.slice(position).toLowerCase();
        let explaination = "";
        if (command.startsWith("quote")) {
            explaination = "This command will return random programming quotes.\n\nFor example sending text message saying 'Quote' will return with a random quote.";
        } else if (command.startsWith("advice")) {
            explaination = "This command will return random advices.\n\nFor example sending text message saying 'Advice' will return with a random advice.";
        } else if (command.startsWith("update")) {
            explaination = "This command will update the SQLite database on the server side.\n\nFor example sending text message saying 'Update Warning new Software found' will insert a query into databse with that status, message and timestamp.";
        } else if (command.startsWith("helpme")) {
            explaination = "This command will return all the commands that the number would respond to.\n\nFor example sending text message saying 'helpme' will return with all the commands.";
        } else if (command.startsWith("help")) {
            explaination = "This command will return with explaination on how to use that command that sepcific command.\n\nFor example sending text message saying 'help quote' will return an explaination of what that command does with an example.";
        } else {
            explaination = "Unfortunately, command you are trying to ask help for is not programmed."
        }
        twiml.message(explaination)
        callback(null, twiml);
    } else {
        twiml.message("Unfortunately, command you have entered is not programmed.")
        callback(null, twiml);
    }
};