
local topHtml = "<h1>Restourant name</h1> <div id='center-container'> <div id='container'> <div id='login'> <form action='/'>";
local middleHtml = "";
local endHtml = "</form></div></div></div>";
local style = "<style>html,body { margin: 0; padding: 0; background: url('http://www.okilla.com/example/2013/7/947/images/bg.jpg'); font-family: 'Lato', sans-serif; font-weight: 400; }h1 { font-size: 60px; text-align: center; font-family: 'JerryshandwritingRegular'; color: #FFFFFF; margin-top: 50px; }#center-container { width: 500px; height: 270px; position: absolute; left: 50%; top: 50%; margin: -135px 0 0 -250px; }#container { display: inline-block; background: transparent; border: 0; background: url('http://www.okilla.com/example/2013/7/947/images/blackboard-bg.png') no-repeat; width: 500px; height: 270px; }form { width: 390px; height: 150px; overflow: hidden; padding: 80px 0 0 70px; }form fieldset { margin: 0 0 10px 0; padding: 0 0 10px 0; font-size: 20px; }form fieldset.form-actions { margin: 0; padding: 0; border: none; float: right; text-align: right; }form fieldset label { float: left; width: 190px; margin: 4px 0 5px 0; font-weight: normal; font-family: 'JerryshandwritingRegular'; font-size: 25px; color: #e4e4e4; }form fieldset input.form-text { display: inline-table; width: 200px; padding: 5px; font-size: 14px; border: 2px solid #e4e4e4; background: none; -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.05); -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,.05); -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.05); -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; font-family: 'JerryshandwritingRegular'; font-size: 20px; }form fieldset input.form-text:focus { border: 1px solid #ccc; background: #fff; }form input[type='submit'] { margin: 0; border: 0; text-indent: -99999px; background: url('../images/submit.png') no-repeat; width: 78px; height: 24px; }</style>";
  local send = {
        "temp": "22",
        "humidity": "11%",
        "dateTaken": time()
    };
        local headers = { "Content-Type": "application/json" };
    //this get the user token from telerik backend services

   local token = {"Content-Type": "application/json","Authorization": "some"};
   
   
    local user = {
        "username": "admin",
        "password": "aaaaaa",
        "grant_type": "password"
    };
    
    function authTelerikBackendService() {
  local request = http.post("http://api.everlive.com/v1/ISDTe40ezNnnMAmk/oauth/token", headers, http.jsonencode(user));
  local userToken = request.sendsync();
    foreach(key,value in userToken) {
                  
             if(key == "body") {
                  local dataJson = http.jsondecode(value);
                     foreach(key,value in dataJson) {
                       token["Authorization"] = "bearer " + value.access_token;
                       //server.log(value.access_token);
                       //return value;
                     }
                  }
               
             }
       }

    
function HttpPostWrapper (url, headers, string) {
  local request = http.post(url, headers, string);
  local response = request.sendsync();
  return response;
}



function HttpGetWrapper (url, headers) {
  authTelerikBackendService();
  local request = http.get(url, token);
  local response = request.sendsync();
  return response;
}




function parseData(data) {
middleHtml = "";
foreach(key,value in data) {
    if(key == "body") {
   // server.log("Mitko : " + value);    
     local dataJson = http.jsondecode(value);
     foreach(keyy,valuee in dataJson) {
         if(keyy == "Result") {
             for(local a = 0,len = valuee.len(); a < len; a++) {
                 //server.log(valuee[a].EntryName);
                 middleHtml += "<fieldset><label for='menuEntry'><small>"  + valuee[a].EntryName + "</small></label></fieldset><br/>";
             }
         }
     }
     
    }
}
 
}


function imaggaPost(urlPath) {
    //local request = http.post("http://api.imagga.com/draft/classify/mobile_photos_sliki_v7?api_key=acc_d8832cc8e56fc51", headers, http.jsonencode({"urls": "http://upload.wikimedia.org/wikipedia/commons/d/db/Painted_Pony_Bean.JPG"}));
    local request = http.get("http://78.128.78.164:8080/classify/sliki/?limit=10&url=" + urlPath + "&threshold=8", headers);
    local response = request.sendsync();
    foreach(key,value in response) {
           return value;
    }
 
}

function sendData(temp) {
     send.temp = temp.temp;
     send.humidity = temp.humidity;
     HttpPostWrapper("http://api.everlive.com/v1/ISDTe40ezNnnMAmk/TempHum",headers,http.jsonencode(send));
}


device.on("temp", sendData); 

function addColons(bssid) {
    local result = bssid.slice(0, 2);
    
    for (local i = 2; i < 12; i += 2) {
        result += ":" + bssid.slice(i, (i + 2));
    }
    
    return result;
}
local locationData = "";

device.on("location", function (location) {
    local url = "https://maps.googleapis.com/maps/api/browserlocation/json?browser=electric-imp&sensor=false";
    
    foreach (network in location) {
        url += ("&wifi=mac:" + addColons(network.bssid) + "|ss:" + network.rssi);
    }

    local request = http.get(url);
    local response = request.sendsync();

    if (response.statuscode == 200) {
        local data = http.jsondecode(response.body);
        locationData = data.location.lat + "," + data.location.lng;
        server.log("http://maps.google.com/maps?q=loc:" + data.location.lat + "," + data.location.lng);
    }
});



http.onrequest(function(request,response)
{
    
    if ("order" in request.query) {
        device.send("order", "Item added to query !");
    }
    
    if("location" in request.query) {
        device.send("location","Give me location man !");
    }
    
    if("temp" in request.query) {
           response.header("Restourant-Temperature",  send.temp);
    }
    
     if("humidity" in request.query) {
           response.header("Restourant-Humidity",  send.humidity);
    }
    
    if("imagga" in request.query) {
        response.header("Imagga-Response", imaggaPost(request.query["imagga"]));
    } 
    
   try
   {    
       authTelerikBackendService();
       
       parseData(HttpGetWrapper("http://api.everlive.com/v1/ISDTe40ezNnnMAmk/MenuEntry",headers));
  
       response.header("Location-Data-Restourant",  locationData);
       response.send(200,style + topHtml +  bb + endHtml);
        // local request = http.get("https://graph.facebook.com/522895771085601/", { "Content-Type": "text/json" });
        // local response = request.sendsync();
        
        // foreach(key,value in response)
        // {
          //     server.log(value);
          //    local data = http.jsondecode(value);
          //    server.log(http.jsondecode(value));
          //    if("likes" in data)
          //    {
                //  server.log("Likes : " + data.likes);
           //   }
       //  }
          //response.send(200,"OK");
   }
   catch(e)
   {
       server.log(e);
      // response.send(500,"Invalide JSON !");
   }
    
});



