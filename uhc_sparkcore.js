spark.on('login', function(){
    // If login is successful we get an accessToken,
  	// we'll use that to call Spark API ListDevices
  	var devicesPr = spark.listDevices();
  	
    devicesPr.then(
    	// We get an array with devices back and we list them
    	function(devices){

        // callback to be executed by each core
        var callback = function(err, data) {
          if (err){
            console.log('An error occurred while getting core attrs:', err);
          }else{
            console.log('Core attr retrieved successfully:', data);
          }
        };

        console.log('API call List Devices: ', devices);
        // Once you have a device/core instance you can use that to call functions on it.
  			// The main difference between this and directly using the main `spark` instance is
  			// that you no longer need to pass the id.
  			var core = devices[0];
  			
        $('#init').on('click', function () {
          setTimeout(function(){core.callFunction('init', callback);}, 500);
        })

        // Button action definitions
        // n is for on and f is for off 
        $('.lockbtn').on('click', function () {
            console.log("The door will lock");
            var cmd = this.parentNode.id+"dl"; //0dl forexample
            console.log(cmd);
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500); // dl for door lock

        })

        $('.unlockbtn').on('click', function () {
            console.log("The door will unlock");
            var cmd = this.parentNode.id+"du";
            console.log(cmd);
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500); // du for door unlock
        })

        $('.doorlockstatusbtn').on('click', function (){
          var mId = this.parentNode.id;
          var cmd = this.parentNode.id+"d";
          setTimeout(function(){core.callFunction('getStatus',cmd, callback);}, 500);
          setTimeout(function(){core.getVariable('dLStatus', function(err, data) {
            if (err) {
              console.log('An error occurred while getting attrs:', err);
            } else {
              console.log('Core attr retrieved successfully:', data);
              if(data.result == 0){
                $('.doorlockstatus').val("UNLOCKED");  
              }else{
                $('.doorlockstatus').val("LOCKED");
              }
            }
          });}, 5000);
        })

        $('.lightonbtn').on('click', function () {
            console.log("The light will switch on");
            var cmd = this.parentNode.id+"ln";
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500); // dl for door lock
        })

        $('.lightoffbtn').on('click', function () {
            console.log("The light will switch off");
            var cmd = this.parentNode.id+"lf";
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500); // du for door unlock
        })

        $('.lightswstatusbtn').on('click', function (){
          var cmd = this.parentNode.id+"l";
          setTimeout(function(){core.callFunction('getStatus',cmd, callback);}, 500);
          setTimeout(function(){core.getVariable('lSStatus', function(err, data) {
            if (err) {
              console.log('An error occurred while getting attrs:', err);
            } else {
              console.log('Core attr retrieved successfully:', data);
              if(data.result == 0){
                  $('.lightswstatus').val("OFF");  
                }else if(data.result == 1){
                  $('.lightswstatus').val("ON");
                }else{
                  $('.lightswstatus').val("IN PROCESS");
                }
            }
          });}, 5000);
        })

         // AC Stuff
        $('#destempbtn').on('click', function () {
            console.log("Set temperature");
            var val;
            if ($('#desTemp').val() !== "") {
              val = $('#desTemp').val();
              console.log(val);
              var cmd = "0h"+val;
              console.log(cmd);
            }
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500); // du for door unlock
        })

        $('#tempreqbtn').on('click', function () {
            console.log("Request the actual temperature from HVAC");
            var cmd = "0ha";
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500);
            setTimeout(function(){core.getVariable('getCurrTemp', function(err, data) {
              if (err) {
                console.log('An error occurred while getting attrs:', err);
              } else {
                console.log('Core attr retrieved successfully:', data);
                $('#actTemp').val(data.result);
              }
            });}, 5000);
        })

        $('#hvacstatusbtn').on('click', function (){
          var cmd = "0h";
          setTimeout(function(){core.callFunction('getStatus',cmd, callback);}, 500);
          setTimeout(function(){core.getVariable('hvacStatus', function(err, data) {
            if (err) {
              console.log('An error occurred while getting attrs:', err);
            } else {
              console.log('Core attr retrieved successfully:', data);
              if(data.result == 1){
                $('#acstatus').val("OFF");
                $('#heat1status').val("OFF");
                $('#heat2status').val("OFF");
                $('#fanstatus').val("ON");
              }else if(data.result == 3){
                $('#acstatus').val("OFF");
                $('#heat1status').val("ON");
                $('#heat2status').val("OFF");
                $('#fanstatus').val("ON");
              }else if(data.result == 7){
                $('#acstatus').val("OFF");
                $('#heat1status').val("ON");
                $('#heat2status').val("ON");
                $('#fanstatus').val("ON");
              }else if(data.result == 9){
                $('#acstatus').val("ON");
                $('#heat1status').val("OFF");
                $('#heat2status').val("OFF");
                $('#fanstatus').val("ON");
              }else{
                $('#acstatus').val("OFF");
                $('#heat1status').val("OFF");
                $('#heat2status').val("OFF");
                $('#fanstatus').val("OFF");
              }
            }
          });}, 8000);
        })

        $('#heatbtn').on('click', function () {
            console.log("Switch to Heat mode");
            var cmd = "0hh";
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500); // du for door unlock
        })

        $('#hvacoffbtn').on('click', function () {
            console.log("Switch HVAC off");
            var cmd = "0hf";
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500); // du for door unlock
        })
  
        $('#acbtn').on('click', function () {
            console.log("Switch AC on");
            var cmd = "0hn";
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500); // du for door unlock
        })

        $(".ponbtn").on('click', function () {
            console.log("power outlet on");
            var cmd = this.parentNode.id+"pn";
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500); // du for door unlock
        })

        $('.poffbtn').on('click', function () {
            console.log("power outlet off");
            var cmd = this.parentNode.id+"pf";
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500); // du for door unlock
        })

        $('.poutletstatusbtn').on('click', function (){
          var cmd = this.parentNode.id+"p";
          setTimeout(function(){core.callFunction('getStatus',cmd, callback);}, 500);
          setTimeout(function(){core.getVariable('pOStatus', function(err, data) {
            if (err) {
              console.log('An error occurred while getting attrs:', err);
            } else {
              console.log('Core attr retrieved successfully:', data);
              if(data.result == 0){
                $('.poutletstatus').val("ON");  
              }else{
                $('.poutletstatus').val("OFF");
              }
            }
          });}, 5000);
        })

        $('.circuitonbtn').on('click', function () {
            console.log("Circuit on");
            var cmd = this.parentNode.id+"cn";
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500); // du for door unlock
        })

        $('.circuitoffbtn').on('click', function () {
            console.log("Circuit off");
            var cmd = this.parentNode.id+"cf";
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500); // du for door unlock
        })

        $('.circuitstatusbtn').on('click', function (){
          var cmd = this.parentNode.id+"c";
          setTimeout(function(){core.callFunction('getStatus',cmd, callback);}, 500);
          setTimeout(function(){core.getVariable('cirStatus', function(err, data) {
            if (err) {
              console.log('An error occurred while getting attrs:', err);
            } else {
              console.log('Core attr retrieved successfully:', data);
              if(data.result == 0){
                  $('.circuitstatus').val("ON");  
                }else{
                  $('.circuitstatus').val("OFF");
                }
            }
          });}, 5000);
        })

        $('.poreqbtn').on('click', function () {
            console.log("Request the actual power");
            var cmd = this.parentNode.id+"cp";
            console.log(cmd);
            setTimeout(function(){core.callFunction('sendCmd',cmd, callback);}, 500);
            setTimeout(function(){core.getVariable('getCurrPower', function(err, data) {
              if (err) {
                console.log('An error occurred while getting attrs:', err);
              } else {
                console.log('Core attr retrieved successfully:', data);
                $('.poreq').val(data.result);
              }
            });}, 8000);
        })

        // $('input[name="light-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
        //   if(state == true){
        //     console.log("The button is on");
        //     setTimeout(function(){core.callFunction('sendData','a', callback);}, 500);
        //   }else{
        //     console.log("The button is off");
        //     setTimeout(function(){core.callFunction('sendData','f', callback);}, 500);
        //   }
        // });
        
        console.log('core: ',core);
      },
    
    //If retriving the devices fails
    function(err){
      console.log('API call failed: ', err);
    });
});

spark.login({username: 'yasman8@gmail.com', password: 'qwertyASDFGH'});

function populate(){
  var onlineDevices = ["Door1", "Door2", "CurrentSensor1"];
  // core.getVariable('onlineDevices', function(err, data) {
  //   if (err) {
  //     console.log('An error occurred while getting attrs:', err);
  //   } else {
  //     console.log('Core attr retrieved successfully:', data);
  //     onlineDevices = data;
  //   }
  // });
  
  for (var i = 0; i < onlineDevices.length; i++) {
    if(onlineDevices[i].indexOf("Door") > -1){
      $("#doorlocks").append("<li><a>Door"+i+"</a></li>");  
    }else if(onlineDevices[i].indexOf("Current") > -1){
      $("#currentsensor").append("<li><a>Current Sensor"+i+"</a></li>");
    }
  }
}

// one of each subsystem and the power source control has 8 cirucuits (8 controllable unints) and no current sensors.