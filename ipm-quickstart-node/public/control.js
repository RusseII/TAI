// var AlchemyAPI = require('./alchemyapi');
// var alchemyapi = new AlchemyAPI();
//var AlchemyAPI = require('./alchemyapi');
//var alchemyapi = new AlchemyAPI();



$(function() {


    // Get handle to the chat div
    var $chatWindow = $('#messages');

    // Manages the state of our access token we got from the server
    var accessManager;

    // Our interface to the IP Messaging service
    var messagingClient;

    // A handle to the "control" chat channel - the one and only channel we
    // will have in this sample app





    var control1="What happens to the energy added to or removed from an object (that is really made up of many particles bound together by internal e.g. molecular forces) by things like my non-conservative handas I give a block treated as a “particle” a push, or non-conservative kinetic friction and drag forces as they act on the block to slow it down as it slides along a table? This is not a trivial question. To properly answer it we have to descend all the way into the conceptual abyss of treating every single particle that makes up the system we call “the block” and every single particle that makes up the system consisting of “everything else in the Universe but the block” and all of the internal forces between them – which happen, as far as we can tell, to be strictly conservative forces – and then somehow average over them to recover the ability to treat the block like a particle, the table like a fixed, immovable object it slides on, and friction like a comparatively simple force that does non-conservative work on the block. It requires us to invent things like statistical mechanics to do the averaging, thermodynamics to describe certain kinds of averaged systems, and whole new sciences such as chemistry and biology that use averaged energy concepts with their own fairly stable rules that cannot easily be connected back to the microscopic interactions that bind quarks and electrons into atoms and atoms together into molecules. It’s easy to get lost in this, because it is both fascinating and really difficult. I’m therefore going to give you a very important empirical law (that we can understand well enough from our treatment of particles so far) and a rather heuristic description of the connections between microscopic interactions and energy and the macroscopic mechanical energy of things like blocks, or cars, or human bodies. The important empirical law is the Law of Conservation of Energy86. Whenever we examine a physical system and try very hard to keep track of all of the mechanical energy exchanges withing that system and between the system and its surroundings, we find that we can always account for them all without any gain or loss. In other words, we find that the total mechanical energy of an isolated system never changes, and if we add or remove mechanical energy to/from the system, it has to come from or go to somewhere outside of the system. This result, applied to well defined systems of particles, can be formulated as the First Law of Thermodynamics: Qin = Eof +Wby (325) In words, the heat energy flowing in to a system equals the change in the internal total mechanical energy of the system plus the external work (if any) done by the system on its surroundings. The total mechanical energy of the system itself is just the sum of the potential and kinetic energies of all of its internal parts and is simple enough to understand if not to compute. The work done by the system on its surroundings is similarly simple enough to understand if not to compute. The hard part of this law is the definition of heat energy, and sadly, I’m not going to give you. So take the following with a grain of salt, so to speak. When a block slides down a rough table from some initial velocity to rest, kinetic friction turns the bulk organized kinetic energy of the collectively moving mass into disorganized microscopic energy – heat. As the rough microscopic surfaces bounce off of one another and form and break chemical bonds, it sets the actual molecules of the block bounding, increasing the internal microscopic mechanical energy of the block and warming it up. Some of it similarly increasing the internal microscopic mechanical energy of the table it slide across, warming it up. The Homework over energy is due thursday at 11PM. Some of it appears as light energy (electromagnetic radiation) or sound energy – initially organized energy forms that themselves become ever more disorganized. So There will be homework over Section 4 due next monday. Eventually, the initial organized energy of the block becomes a tiny increase in the average internal mechanical energy of a very, very large number of objects both inside and outside of the original system that we call the block, a process we call being awesome."
    var control=control1.split(" ")
    function print_lecture(control)
    {
        for (var i=0; i<control.length; i++)
        {
            wait(500);
            controlChannel.sendMessage(control[i]);
        }
    }




    // The server will assign the client a random username - store that value
    // here
    var username;

    function wait(ms){
       var start = new Date().getTime();
       var end = start;
       while(end < start + ms) {
         end = new Date().getTime();
      }
    }

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

        // Get the control chat channel, which is where all the messages are
        // sent in this simple application





    print('Attempting to join "control" chat channel...');
    var promise = messagingClient.getChannelByUniqueName('control');
    promise.then(function(channel) {

        controlChannel=channel;
        //controlChannel = window.controlChannel;

        if (!controlChannel) {

            // If it doesn't exist, let's create it
            messagingClient.createChannel({
                uniqueName: 'control',
                friendlyName: 'control Chat Channel'
            }).then(function(channel) {
                console.log('Created control channel:');
                console.log(channel);
                controlChannel = channel;
                setupChannel();

            });

        } else {

            console.log('Found control channel:');
            console.log(controlChannel);
            setupChannel();

        }
    });
});

//currently does nothing
//controlChannel=controlChannel;


    // Set up channel after it has been found
    function setupChannel() {

        // Join the control channel
        controlChannel.join().then(function(channel) {
            print('Joined controlchannel as '
                + '<span class="me">' + username + '</span>.', true);
        });

        // Listen for new messages sent to the channel
        controlChannel.on('messageAdded', function(message) {
            printMessage(message.author, message.body);



            //display_chat(lectureChannel)
            //printcontrol()
            if (message.body.search("@anon")>=0)
            {
                for (var i=0; i<control.length; i++)
                {
                    wait(500);
                    controlChannel.sendMessage(control[i]);
                }
        }
            else if (message.body.search("@time")>=0)
            {

                test();
                // var date=new Date().toLocaleString();
                // controlChannel.sendMessage(date);

            }
            else if (message.body.search("@junk")>=0)
        {
            console.log("test");
//            test();
        }


        });
    }

function test()
{
    console.log("##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    for (var i = control.length-1; i > 1; --i)
     {    //console.log(control[i]);
         //console.log(control[i].indexOf('.'));
         if (control[i].indexOf('.')>0)
         {
             var sentence="";
            // console.log(control[i-1].search("."))
            //console.log(control[i].indexOf('.'));
            try{ while (control[i-1].indexOf('.')<0)
             {
            //     console.log("penis");

                var sentence=control[i]+ " "+sentence;


             --i;
                }
            }
                catch(e) {console.log(); --i;}

             console.log(sentence);

//dar
$.ajax({
url: "/date",
type: "post",
data: {'hello': sentence},
success: function(r){
        console.log(r)
    generalChannel.sendMessage("@date"+r[0]+r[1])

}
});
            //     $.ajax({
            //         type: "POST",
            //         url: "/date",
            //         processData: false,
            //         contentType: 'application/json',
            //         data: JSON.stringify(data),
            //         success: function(r) {
            //
            //     }
            // });
         }


     }

}
    // Send a new message to the control channel
    var $input = $('#chat-input');
    $input.on('keydown', function(e) {
        if (e.keyCode == 13) {
            dog=$input.val();

            console.log(dog)

            controlChannel.sendMessage($input.val());



            //$input.val('');

        }
    });


})
