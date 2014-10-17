"use strict";

 angular.module("config", [])

.constant("ENV", {
  "name": "development",
  "apiEndpoint": "http://dev.yoursite.com:10000/"
})
.constant("EVERLIVE", "http://api.everlive.com/v1/ISDTe40ezNnnMAmk/")

;