var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//checkForUploadedContentAvailability('QmP6jZxSkotSHThWiZiL5rp2rEFPsqgF2D6kH7RkoXPjjA')
//checkForUploadedContentAvailability();

window.checkForUploadedContentAvailability = function() {
    hash = GlobalUploadHash;
    console.log("Inside checkForUploadedContentAvailability >> hash: " + hash);
    const Http = new XMLHttpRequest();
    const url = 'http://data.ethofs.com/ipfs/' + hash;
    Http.open("GET", url, true);
    console.log("Http open: " + url);
    Http.send();
    console.log("Http Send");
    Http.onreadystatechange = function(){
        if(this.status == 200){
            console.log('Status: ' + this.status + ' >> Content Upload Successful!');
        }else{
            console.log('Status: ' + this.status + ' >> Content Is Not Available');
            //checkForUploadedContentAvailability();
        }
    }
};
