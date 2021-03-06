"use strict";
var utils = require("utils/utils");

function openApp(appID, storeFallback, appleStoreId, queries) {
    if (storeFallback === void 0) { storeFallback = true; }
    var sharedApplication = UIApplication.sharedApplication;
    var url = NSURL.URLWithString(appID.trim());
    if (sharedApplication.canOpenURL(url)) {
        //Append Query
        var query = "";
        if(queries != null && queries.length > 0){
            query = "?";
            for(var x in queries){
                query += queries[x]['key']+"="+queries[x]['value'];
                if(parseInt(x+1)!=queries.length) query += "&";
            }
        }
        url = NSURL.URLWithString(url+query);
        // open app
        sharedApplication.openURL(url);
        return true;
    }
    else if (storeFallback && appleStoreId) {
        // can't open app - open store
        url = NSURL.URLWithString("itms-apps://itunes.apple.com/app/id" + appleStoreId);
        if (sharedApplication.canOpenURL(url)) {
            sharedApplication.openURL(url);
        }
        else {
            // can't open store - open the website
            url = NSURL.URLWithString("https://itunes.apple.com/app/id" + appleStoreId);
            sharedApplication.openURL(url);
        }
    }
    return false;
}
exports.openApp = openApp;
