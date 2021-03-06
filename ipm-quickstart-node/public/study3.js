// var AlchemyAPI = require('./alchemyapi');
// var alchemyapi = new AlchemyAPI();
//var AlchemyAPI = require('./alchemyapi');
//var alchemyapi = new AlchemyAPI();
//var controlChannel=window.controlChannel;

$(function() {

    // Get handle to the chat div
    var $chatWindow = $('#messages');

    // Manages the state of our access token we got from the server
    var accessManager;

    // Our interface to the IP Messaging service
    var messagingClient;

    // A handle to the "study3" chat channel - the one and only channel we
    // will have in this sample app



    // The server will assign the client a random username - store that value
    // here
    var username;



    // Helper function to print info messages to the chat window
    function print(infoMessage, asHtml) {
        var $msg = $('<div class="info">');
        if (asHtml) {
            $msg.html(infoMessage);
        } else {
            $msg.text(infoMessage);
        }
        $chatWindow.append($msg);

    }

    // Helper function to print chat message to the chat window
    function printMessage(fromUser, message) {
        // if (message.search("@anon")>=0)
        // {
        //     fromUser="hidden";
        // }
        var $user = $('<span class="username">').text(fromUser + ':');
        if (fromUser === username) {
            $user.addClass('me');
        }
        var $message = $('<span class="message">').text(message);
        var $container = $('<div class="message-container">');
        $container.append($user).append($message);

        $chatWindow.append($container);
        //console.log(message)



        $chatWindow.scrollTop($chatWindow[0].scrollHeight);
        //wait(10000);
        //$chatWindow.append("yo");
    }

    // Alert the user they have been assigned a random username
    print('Logging in...');

    // Get an access token for the current user, passing a username (identity)
    // and a device ID - for browser-based apps, we'll always just use the
    // value "browser"
    $.getJSON('/token', {
        identity: username,
        device: 'browser'
    }, function(data) {
        // Alert the user they have been assigned a random username
        username = data.identity;
        print('You have been assigned a random username of: '
            + '<span class="me">' + username + '</span>', true);

        // Initialize the IP messaging client
        accessManager = new Twilio.AccessManager(data.token);
        messagingClient = new Twilio.IPMessaging.Client(accessManager);

        // Get the study3 chat channel, which is where all the messages are
        // sent in this simple application





    print('Attempting to join "study3" chat channel...');
    var promise = messagingClient.getChannelByUniqueName('study3');
    promise.then(function(channel) {

        study3Channel = channel;
        if (!study3Channel) {
            // If it doesn't exist, let's create it
            messagingClient.createChannel({
                uniqueName: 'study3',
                friendlyName: 'study3 Chat Channel'
            }).then(function(channel) {
                console.log('Created study3 channel:');
                console.log(channel);
                study3Channel = channel;
                setupChannel();
            });

        } else {
            console.log('Found study3 channel:');
            console.log(study3Channel);
            setupChannel();
        }
    });
});




    // Set up channel after it has been found
    function setupChannel() {
        // Join the study3 channel
        study3Channel.join().then(function(channel) {
            print('Joined study3channel as '
                + '<span class="me">' + username + '</span>.', true);
        });

        // Listen for new messages sent to the channel
        study3Channel.on('messageAdded', function(message) {
            //printMessage(message.author, message.body);

            if (message.body.search("@")>=0)
            {
                controlChannel.sendMessage(message.author+" "+ message.body)
            }

        });
    }

    // Send a new message to the study3 channel
    var $input = $('#chat-input');
    $input.on('keydown', function(e) {
        if (e.keyCode == 13) {
            dog=$input.val();

            console.log(dog)
            study3Channel.sendMessage("study3Channel "+$input.val());


            //$input.val('');

        }
    });

});
