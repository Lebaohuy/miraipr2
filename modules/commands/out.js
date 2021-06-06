var fetch = global.nodemodule["node-fetch"];
var streamBuffer = global.nodemodule['stream-buffers']
 
var out = async function (type, data) {
if(data.admin === true) {

  var content = data.args[1];
 return data.facebookapi.removeUserFromGroup(data.facebookapi.getCurrentUserID(), content);
 
}}
module.exports = {
    out: out
}
