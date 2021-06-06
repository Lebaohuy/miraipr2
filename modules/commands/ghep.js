var fetch = global.nodemodule["node-fetch"];
var wait = global.nodemodule['wait-for-stuff'];
var path = global.nodemodule["path"];
var streamBuffers = global.nodemodule["stream-buffers"]


var random = function(min, max) {
    return global.plugins.librandom.getRandomNumber(min, max, 0);
}

var ghep = async function(type, data) {

            var adinfo = await data.facebookapi.getThreadInfo(data.msgdata.threadID);
            
            //nam va nu
            var gendernam = [];
            var gendernu = [];
            var idnam = [];
            var idnu = [];
            for (let z in adinfo.userInfo) {
                var gioitinhone = adinfo.userInfo[z].gender;
                if (gioitinhone == "MALE") {
                    gendernam.push(z);
                    idnam.push(adinfo.userInfo[z].id);
                }
            }

            for (let z in adinfo.userInfo) {
                var gioitinhone = adinfo.userInfo[z].gender;
                if (gioitinhone == "FEMALE") {
                    gendernu.push(z);
                    idnu.push(adinfo.userInfo[z].id);
                }

            }

            if (data.args[1] == "all") {
                var soNam = gendernam.length
                var soNu = gendernu.length
                if (soNam > soNu) {
                    var du = soNam - soNu
                    var namM = [];
                    //randomNamghep
                    for (var i = 0; i < soNu; i++) {
                        var rbede = gendernam[random(0, gendernam.length - 1)];
                        namM.push(rbede)
                        var xoa = gendernam.indexOf(rbede)
                        gendernam.splice(xoa, 1)
                    }
                    //het

                    //ghep
                    var speech = "\n";
                    for (var i = 0; i < soNu; i++) {


                        //nam
                        var nNam = adinfo.userInfo[namM[i]].name

                        //nu
                        var nNu = adinfo.userInfo[gendernu[i]].name


                        var body = `${nNam} ♥ ${nNu}\n-----------------------------\n`
                        speech += body;
                    }



                    return {
                        handler: "internal",
                        data: "Chúc mừng:" + speech + "\nBede:" + du
                    }

                } else
                    //het nam > nu
                    if (soNam < soNu) {
                        var nuN = [];
                        var du = soNu - soNam
                        //randomNamghep
                        for (var i = 0; i < soNam; i++) {
                            var rbede = gendernu[random(0, gendernu.length - 1)];
                            nuN.push(rbede)
                            var xoa = gendernu.indexOf(rbede)
                            gendernu.splice(xoa, 1)
                        }
                        //het

                        //ghep
                        var speech = "\n";
                        for (var i = 0; i < soNam; i++) {


                            //nam
                            var nNam = adinfo.userInfo[nuN[i]].name

                            //nu
                            var nNu = adinfo.userInfo[gendernam[i]].name


                            var body = `${nNam} ♥ ${nNu}\n-----------------------------\n`
                            speech += body;
                        }



                        return {
                            handler: "internal",
                            data: "Chúc mừng:" + speech + "\nLess:" + du
                        }

                    } else
                        //het nam < nu
                        if (soNam == 0) {
                            return {
                                handler: "internal",
                                data: "Không đủ có Nam để ghép"
                            }
                        } else
                if (soNu == 0) {
                    return {
                        handler: "internal",
                        data: "Không đủ có Nữ để ghép"
                    }
             }
                } else {

                    var sendID = data.msgdata.senderID;
                    for (let z in adinfo.userInfo) {
                        for (var i = 0; i < idnam.length; i++) {
                            if (sendID == idnam[i]) {
                                var sp = gendernu[random(0, gendernu.length - 1)];
                                var name = adinfo.userInfo[sp].name
                                var idty = adinfo.userInfo[sp].id
                            }

                        }

                        for (var i = 0; i < idnu.length; i++) {
                            if (sendID == idnu[i]) {
                                var sp = gendernam[random(0, gendernam.length - 1)];
                                var name = adinfo.userInfo[sp].name
                                var idty = adinfo.userInfo[sp].id
                            }

                        }

                    }
                    var tname = global.data.cacheName["FB-" + data.msgdata.senderID];
                    //thay đổi njck name
                    data.facebookapi.changeNickname(`ty của ♥${name}`, data.msgdata.threadID, data.msgdata.senderID, (err) => {
                        if (err) return console.error(err);
                    });
                    data.facebookapi.changeNickname(`ty của ♥${tname}`, data.msgdata.threadID, idty, (err) => {
                        if (err) return console.error(err);
                    });



                    //lấy avt nạn nhân :V
                    var imgX = `https://graph.facebook.com/${idty}/picture?width=512&height=512&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`;
                    var fetchimgD = await fetch(imgX);
                    var buffer = await fetchimgD.buffer();
                    var imagesx = new streamBuffers.ReadableStreamBuffer({
                        frequency: 10,
                        chunkSize: 1024
                    });
                    imagesx.path = 'image.png';
                    imagesx.put(buffer);
                    imagesx.stop();
                    var nametag = `@${name}`

                    data.facebookapi.sendMessage({
                        body: `Chúc mừng bạn đã kiếm được ny\n♥Ny của bạn là :\n${nametag}`,
                        mentions: [{
                            tag: nametag,
                            id: idty
                        }],
                        attachment: ([imagesx])
                    }, data.msgdata.threadID);
                }


            }




            module.exports = {
                ghep: ghep,
            }