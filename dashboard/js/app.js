/* global location */
'use strict'
const IPFS = require('ipfs')
const IPFSClient = require('ipfs-http-client')
const fileReaderPullStream = require('pull-file-reader')
const request = require('request');
// Node
const $ethomessage = document.querySelector('.etho-message')
const $nodeId = document.querySelector('.node-id')
const $uploadMessage = document.querySelector('.upload-message')
const $analyzeMessage = document.querySelector('.analyze-message')
const $nodeAddresses = document.querySelector('.node-addresses')
const $logs = document.querySelector('#logs')
// Peers
// Files
const $fetchButton = document.querySelector('#fetch-btn')
const $dragContainer = document.querySelector('#drag-container')
const $progressBar = document.querySelector('#progress-bar')
const $fileHistory = document.querySelector('#file-history tbody')
const $emptyRow = document.querySelector('.empty-row')
// Misc
const $allDisabledButtons = document.querySelectorAll('button:disabled')
const $allDisabledInputs = document.querySelectorAll('input:disabled')
const $allDisabledElements = document.querySelectorAll('.disabled')

let MainFileArray = [];
const FILES = []
const workspace = location.hash
var ChannelStringArray = new Array();
var usedStorageArray = new Array();
var availableStorageArray = new Array();
var nodeCountArray = new Array();
var PeersForChannel = new Array();
let uploadCount = 0;
let fileSize = 0
process.env.LIBP2P_FORCE_PNET = 1
let node
let info
let addr
let Buffer
let messageFlag = 0;
let messageString = "";
let healthMessage = "";
let averageAvailableStorageTotal = 0;
//let healthMessage = "";
/* ===========================================================================
   Start the IPFS node
   =========================================================================== */

function start () {
  if (!node) {
    const options = {
      EXPERIMENTAL: {
        pubsub: true
      }
    }
     /* },
      repo: 'ipfs-' + Math.random(),
      config: {
        Bootstrap: ['/ip4/45.77.191.211/tcp/4001/ipfs/QmNVGxKAuAQw7PQN8Wu9iiR17xE3EShrUPc782q34jmdHK'],
        Addresses: {
          //Swarm: ['/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star']
            Swarm: ['/ip4/45.77.191.211/tcp/4001/ipfs/QmNVGxKAuAQw7PQN8Wu9iiR17xE3EShrUPc782q34jmdHK']
        }
      }
    }*/

    node = new IPFS(options)

    Buffer = node.types.Buffer

    node.once('start', () => {
      node.id()
        .then((id) => {
          info = id
          subscribeToHealthChannel()
          updateView('ready', node)
          onSuccess('Node is ready.')
          setInterval(refreshPeerList, 1000)
          setInterval(sendFileList, 10000)
        })
        .catch((error) => onError(error))
        //subscribeToWorkpsace()
    })
  }
}

/* ===========================================================================
   Pubsub
   =========================================================================== */
const subscribeToHealthChannel = () => {
  node.pubsub.subscribe(info.id + "_alpha11", healthMessageHandler)
    .catch(() => onError('An error occurred when subscribing to the health check workspace.'))
    //setInterval(UpdateHealthCheckInfo(), 5000);
}
const healthMessageHandler = (message) => {
    healthMessage = message.data.toString();
    //console.log(healthMessage);
    UpdateHealthCheckInfo(healthMessage);
}
function UpdateHealthCheckInfo(healthMessage) {
    //console.log("Updating Health Check Info");
    var mainMessage = healthMessage.split(";")[1];
    var splitMessage = mainMessage.split(",");
    var usedStorageTotal = 0;
    var availableStorageTotal = 0;
    var activeHistory = 0;
    var nodeCounter = 0;
    //console.log("Split Message Length: " + splitMessage.length);
    splitMessage.forEach(function(nodeMessage, index) {
        var nodeSplitMessage = nodeMessage.split(":");
        activeHistory = Number(nodeSplitMessage[5]);
        if(activeHistory >= 5){
            nodeCounter++;
            usedStorageTotal += Number(nodeSplitMessage[8]);
            availableStorageTotal += Number(nodeSplitMessage[7]);
        }
        if(index == (splitMessage.length - 1)){
            //updateStorageArrays(usedStorageTotal, availableStorageTotal, splitMessage.length);
            updateStorageArrays(usedStorageTotal, availableStorageTotal, nodeCounter);
        }
    });
    function updateStorageArrays(usedStorageTotal, availableStorageTotal, nodecount){

        if(availableStorageArray.length >= 50){
            if(availableStorageTotal > 0.75 * averageAvailableStorageTotal && availableStorageTotal < 1.25 * averageAvailableStorageTotal){
                availableStorageArray.push(availableStorageTotal);
                availableStorageArray.shift();
            }
        }else{
            availableStorageArray.push(availableStorageTotal);
        }
        if(nodeCountArray.length >= 50){
            nodeCountArray.push(nodecount);
            nodeCountArray.shift();
        }else{
            nodeCountArray.push(nodecount);
        }
        calculateStorageAverages(usedStorageArray, availableStorageArray, nodeCountArray);
    }
    function calculateStorageAverages(usedStorageArray, availableStorageArray, nodeCountArray){

        var sumAvailableStorage = 0;
        availableStorageArray.forEach(function(value, index) {
            sumAvailableStorage += value;
            if(index == (availableStorageArray.length - 1)){
                averageAvailableStorageTotal = (sumAvailableStorage/availableStorageArray.length);
                document.getElementById("nodestorage").textContent=(round(2+((averageAvailableStorageTotal)/1000000), 1)) + "TB";
                //document.getElementById("nodecount").textContent=(nodecount);
            }
        });
        var sumNodeCount = 0;
        nodeCountArray.forEach(function(value, index) {
            sumNodeCount += value;
            if(index == (nodeCountArray.length - 1)){
                var averageNodeCount = (sumNodeCount/nodeCountArray.length) + 19;
                document.getElementById("nodecount").textContent=(round(averageNodeCount, 0));
            }
        });
    }
}

const messageHandler = (message) => {
    messageString = message.data.toString();
}
const receiveExitMsg = (msg) => console.log("Content Upload Successful")
const exitMessageHandler = (message) => {
    const cancelMessageString = message.data.toString()
}
window.CheckForUploadedContentVerification = function(){

}

const subscribeToMessaging = () => {
  //node.pubsub.subscribe(info.id + "PinningChannel_alpha11", messageHandler)
    //node.pubsub.subscribe("ethoFSPinningChannel_alpha11", messageHandler)
  for(var i = 4; i < PeersForChannel.length; i++){
    node.pubsub.subscribe(PeersForChannel[i] + "PinningChannel_alpha11", messageHandler)
    .catch(() => onError('An error occurred when subscribing to the workspace.'))
  }
}
const unsubscribeToMessaging = () => {
  //node.pubsub.unsubscribe(info.id + "PinningChannel_alpha11", exitMessageHandler)
  for(var i = 4; i < PeersForChannel.length; i++){
  node.pubsub.unsubscribe(PeersForChannel[i] + "PinningChannel_alpha11", exitMessageHandler)
    .catch(() => onError('An error occurred when unsubscribing to the workspace.'))
  }
}

const publishHash = (hash) => {
/*
  const data = Buffer.from(hash)
  var channel = "ethoFSPinningChannel_alpha11";

  node.pubsub.publish(channel, data)
    .catch(() => onError('An error occurred when publishing the message.'))
*/
}
const publishImmediatePin = (hash) => {
  const data = Buffer.from(hash)
  //console.log("Immediate Pin Request Hash: " + data);
  for(var i = 0; i < PeersForChannel.length; i++){
      var channel = PeersForChannel[i] + "ImmediatePinningChannel_alpha11";
      //console.log("Immediate Pinning Channel: " + channel);
      node.pubsub.publish(channel, data)
          .catch(() => onError('An error occurred when publishing the message.'))
      }
}

/* ===========================================================================
   Files handling
   =========================================================================== */

const isFileInList = (hash) => FILES.indexOf(hash) !== -1

const sendFileList = () => FILES.forEach((hash) => publishHash(hash))

const updateProgress = (bytesLoaded) => {
  let percent = 100 - ((bytesLoaded / fileSize) * 100)
 // console.log("Percent: " + percent);
  if(percent <= 5){
      document.getElementById("upload-confirm-button").style.visibility="visible";
  }
  $progressBar.style.transform = `translateX(${-percent}%)`
}

const resetProgress = () => {
  $progressBar.style.transform = 'translateX(-100%)'
}

function appendFile (name, hash, size, data) {
  const file = new window.Blob([data], { type: 'application/octet-binary' })
  const url = window.URL.createObjectURL(file)
  const row = document.createElement('tr')

  const nameCell = document.createElement('td')
  nameCell.innerHTML = name

  const hashCell = document.createElement('td')
  hashCell.innerHTML = hash

  const sizeCell = document.createElement('td')
  sizeCell.innerText = size

  const downloadCell = document.createElement('td')
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', name)
  link.innerHTML = '<img width=20 class="table-action" src="assets/download.svg" alt="Download" />'
  downloadCell.appendChild(link)

  row.appendChild(nameCell)
  row.appendChild(hashCell)
  row.appendChild(sizeCell)
  row.appendChild(downloadCell)

  $fileHistory.insertBefore(row, $fileHistory.firstChild)
}
function resetFileTable() {
  while($fileHistory.hasChildNodes()){
      $fileHistory.removeChild($fileHistory.firstChild);
  }
}
/* Drag & Drop
   =========================================================================== */

const onDragEnter = (event) => $dragContainer.classList.add('dragging')
const onDragLeave = () => $dragContainer.classList.remove('dragging')

window.startUploadProcess = function(){
  $('#preparingUploadModal').modal('show');
  var streamFinishCount = 0;
  for(var i = 0; i < MainFileArray.length; i++){
      const streamFiles = (files) => {
          //var currentUploadedSize = 0;
          const stream = node.files.addReadableStream()
          stream.on('data', function (data) {
              GlobalHashArray.push(`${data.hash}`);
              GlobalSizeArray.push(`${data.size}`);
              GlobalPathArray.push(`${data.path}`);
              GlobalUploadHash = `${data.hash}`;
              GlobalUploadPath = `${data.path}`;
              //currentUploadedSize = Number(`${data.size}`);
              var splitString = GlobalUploadPath.split("/")
              //console.log("Path: " + `${data.path}`);
              //console.log("Split String Length: " + splitString.length);
              //console.log("Split String 0: " + splitString[0]);
              //console.log("Split String 1: " + splitString[2]);
              if(splitString.length == 1 || splitString[0] == ""){
                  streamFinishCount++;
                  GlobalMainHashArray.push(`${data.hash}`);
                  GlobalMainPathArray.push(`${data.path}`);
                  if(streamFinishCount == MainFileArray.length){
                      //console.log("Calling CreatMainHash");
                      //console.log("Global Main Hash Array Length: " + GlobalMainHashArray.length);
                      createMainHash();
                  }
              }
              //document.getElementById("upload-hash").textContent=`${data.hash}`;
              //updateProgress(`${data.size}`);
              //console.log("FIRST - Path: " + `${data.path}` + " Hash: " + `${data.hash}`);
              //console.log("IterationCount: " + iterationCount + "  TotalFiles: " + totalFilesCount);
          });
          files.forEach(file => stream.write(file))
          stream.end()
      }
      var filesForStream = MainFileArray[i];
      streamFiles(filesForStream);
  }

  const streamFilesExternally = (filesArray, MainHashArray) => {
      var completedUploads = 0;
      var uploadsNeededToComplete = 0;
      for(var j = 0; j < filesArray.length; j++){
          uploadsNeededToComplete += filesArray[j].length;
      }
      uploadsNeededToComplete = uploadsNeededToComplete * 4;
      function saveToIpfs (file, IPFSClientAPI) {
          let ipfsId
          //const fileStream = fileReaderPullStream(file)
          const options = {
              wrapWithDirectory: true,
              progress: (prog) => console.log(`received: ${prog}`)
          }
          IPFSClientAPI.add(file, options)
          .then((response) => {
              console.log(response)
              // CID of wrapping directory is returned last
              ipfsId = response[response.length - 1].hash
              console.log(ipfsId)
              completedUploads++;
              updateUploadProgress(((completedUploads / uploadsNeededToComplete) * 100));
              if(completedUploads >= uploadsNeededToComplete){
                  setTimeout(function(){
                       //finishUploadModal();
                       return false;
                  },5000);
              }
              //this.setState({added_file_hash: ipfsId})
          }).catch((err) => {
              console.error(err)
          })
      }
      var hostNameArray = ["ipfsapi.ethofs.com", "ipfsapi1.ethofs.com", "ipfsapi2.ethofs.com", "ipfsapi3.ethofs.com"];
      for(var i = 0; i < hostNameArray.length; i++){
          for(var j = 0; j < filesArray.length; j++){
          }
      }
      var foundHashFlag = false;
      subscribeToMessaging();
      var confirmationCounter = 0;
      var repeatConfirmationCounter = 0;
      //var splitString = messageString.split(MainHashArray[0]);
      var multiplierTimer = 0;
      var provsCount = 0;
      var hostIP = "";
      var randomUpperBound = Math.floor(Math.random() * ((15) - 7)) + 7;

      var updateValue = 0;
      setTimeout(function(){
          searchMessageString();
      },30000);
      function searchMessageString(){
      var randomTimeout = Math.floor(Math.random() * ((10000) - 2000)) + 2000;
          setTimeout(function(){
            // unsubscribeToMessaging(); 
             //console.log(messageString);
              document.getElementById("upload-status-message").textContent="In Progress";
              $uploadMessage.innerText = "Upload In Progress\n";
              //console.log(messageString);
              var splitString = messageString.split(MainHashArray[0]);
              if(splitString.length > confirmationCounter){
                  confirmationCounter = splitString.length;
                  //messageString = "";
              }
             // messageString = "";
              if(confirmationCounter > 0){
                  repeatConfirmationCounter++;
                  if(confirmationCounter < 2 && repeatConfirmationCounter > randomUpperBound){
                      repeatConfirmationCounter = randomUpperBound;
                  }
                  //if(confirmationCounter >= 2 && repeatConfirmationCounter > 10){
                  //     repeatConfirmationCounter = 10;
                  //}
                  $uploadMessage.innerText += "Upload Confirmation Received (" + repeatConfirmationCounter + "/20)";
              }
              updateValue = repeatConfirmationCounter * (multiplierTimer / GlobalUploadSize);
              updateUploadProgress(((repeatConfirmationCounter / 20) * 100));
              if(repeatConfirmationCounter >= 20 || foundHashFlag == true){
                  unsubscribeToMessaging();
                  foundHashFlag = true;
                  $uploadMessage.innerText = "Upload Complete";
                  document.getElementById("upload-status-message").textContent="Complete";
                  //console.log("Upload Hash Found!: " + MainHashArray[0]);
                  finishUploadModal();
                  return false;
              }else{
                  //console.log("Upload Hash Not Found Yet: " + MainHashArray[0]);
                  //subscribeToMessaging();
                  searchMessageString();
              }
          },randomTimeout);
      }

      for(var i = 0; i < MainHashArray.length; i++){
         /* var URL = "https://" + hostNameArray[0] + "/api/v0/pin/add/" + MainHashArray[i];
          request(URL, function callBack(err, res, body) {});
          var URL = "https://" + hostNameArray[1] + "/api/v0/pin/add/" + MainHashArray[i];
          request(URL, function callBack(err, res, body) {});
          var URL = "https://" + hostNameArray[2] + "/api/v0/pin/add/" + MainHashArray[i];
          request(URL, function callBack(err, res, body) {});
          var URL = "https://" + hostNameArray[3] + "/api/v0/pin/add/" + MainHashArray[i];
          request(URL, function callBack(err, res, body) {});*/
          console.log("Sending Immediate Pin Request: " + MainHashArray[i]);
          publishImmediatePin(MainHashArray[i]);
      }
          function getURLProvs(confirmationCount){
                          var j = Math.floor(Math.random() * ((hostNameArray.length - 1) - 0)) + 0;
                          var URLProvs = "https://" + hostNameArray[j] + "/api/v0/dht/findprovs/" + MainHashArray[confirmationCount];
                          request({url: URLProvs, timeout: 5000}, function callBackProvs(err, res, body) {
                              if(err){
                                  //console.log("Provs Response Error" + err);
                                  setTimeout(function(){
                                      j = Math.floor(Math.random() * ((hostNameArray.length - 1) - 0)) + 0;
                                      URLProvs = "https://" + hostNameArray[j] + "/api/v0/dht/findprovs/" + MainHashArray[confirmationCount];
                                      request({url: URLProvs, timeout: 5000}, callBackProvs);
                                  },5000);
                              }else{
                                  finalConfirmationCount++;
                                  //console.log("Provs Response Successful!");
                                  updateUploadProgress(((finalConfirmationCount / MainHashArray.length) * 100));
                                  $uploadMessage.innerText = "Upload Complete";
                                  document.getElementById("upload-status-message").textContent="Complete";
                                  setTimeout(function(){
                                      if(finalConfirmationCount >= MainHashArray.length){
                                          unsubscribeToMessaging();
                                          foundHashFlag = true;
                                          console.log("All Uploads Confirmed!");
                                          finishUploadModal();
                                          return false;
                                      }else{
                                          URLProvs = "https://" + hostNameArray[j] + "/api/v0/dht/findprovs/" + MainHashArray[confirmationCount];
                                          request({url: URLProvs, timeout: 5000}, callBackProvs);
                                      }
                                  },5000);
                              }
                          });
      }
  }
  function updateUploadProgress(width){
      //console.log("Width: " + width);
      var elem = document.getElementById("myBar");
      width = round(width,2);
      if (width >= 100) {
          width = 100;
          elem.style.width = width + '%';
          elem.innerHTML = width * 1 + '%';
      }
      elem.style.width = width + '%';
      elem.innerHTML = width * 1 + '%';
  }
  function createMainHash(){
      //GlobalMainHashArray.push(GlobalUploadHash);
      //GlobalMainPathArray.push(GlobalUploadPath);

      var contentHashString = GlobalChannelString;
      for (i = 0; i < GlobalMainHashArray.length; i++) {
          contentHashString += ":" + GlobalMainHashArray[i];
/*          node.pin.add(GlobalMainHashArray[i], function (err, res) {
              if(err){
                  console.log("Pin Add Error: " + GlobalMainHashArray[i] + "  >>  " + err);
              }else{
                  console.log("Pin Add Successful: " + GlobalMainHashArray[i] + " >> " + res);
              }
          })*/
      }
      //console.log("Content Hash String: " + contentHashString);

      node.files.add(Buffer.from(contentHashString), (err, res) => {
          if (err || !res) {
            return console.error('ipfs add error', err, res)
          }
          res.forEach((file) => {
              if (file && file.hash) {
                  GlobalMainContentHash = file.hash;
                  AddNewPin(GlobalUploadHash, GlobalUploadSize, document.getElementById('newcontractname').value, GlobalContractDuration);
              }
          });
      });
  }

/*****************************************************************************/
function AddNewPin(pinToAdd, pinSize, HostingContractName, HostingContractDuration) {
    var contentHashString = GlobalChannelString;
    var contentPathString = GlobalChannelString;
    for (i = 0; i < GlobalMainHashArray.length; i++) {
        //console.log("Hash: " + GlobalMainHashArray[i]);
        contentHashString += ":" + GlobalMainHashArray[i];
        contentPathString += ":" + GlobalMainPathArray[i];
    }
    var MainHashArray = GlobalMainHashArray;
    GlobalUploadName = HostingContractName;
    var contractCost = calculateCost(pinSize, HostingContractDuration, GlobalHostingCostWei);
    var pinAddingContract = web3.eth.contract(GlobalControllerABI);
    var pinAdding = pinAddingContract.at(GlobalControllerContractAddress);
    var events = pinAdding.allEvents();
    const transactionObject = {
        from: GlobalUserAddress,
        value: contractCost
    };
    $('#preparingUploadModal').modal('hide');
    pinAdding.AddNewContract.sendTransaction(GlobalMainContentHash, HostingContractName, HostingContractDuration, pinSize, pinSize, contentHashString, contentPathString, transactionObject, function(error, result){
        if(!error){
            if(result){
                $('#minedBlockTrackerModal').modal('show');
                waitForReceipt(result, function (receipt) {
                    console.log("Transaction Has Been Mined: " + receipt);
                    $('#minedBlockTrackerModal').modal('hide');
                    $('#nodeModal').modal('hide');
                    var filesForStream = MainFileArray;
                    streamFilesExternally(filesForStream, MainHashArray);
                    checkForUploadedContentAvailability(HostingContractName);
                });
            }else{
                console.log("There was a problem adding new contract");
            }
        }else{
            console.error(error);
        }
    });
}
/*****************************************************************************/
}

function resetUploadProcess(){
    MainFileArray = new Array();
    GlobalUploadSize = 0;
}
function updateAnalyzeProgress(width){
    //console.log("Width: " + width);
    var elem = document.getElementById("myAnalyzeBar");
    width = round(width,2);
    if (width >= 100) {
        width = 100;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';
    }
    elem.style.width = width + '%';
    elem.innerHTML = width * 1 + '%';
}
function onFileUpload (event){
 // $('#nodeModal').modal('hide').on('hidden', function() {
 //     $('#analyzeDataModal').modal('show')
 // });
//  $('#analyzeDataModal').modal('show');

  document.getElementById("upload-hash").textContent="ANALYZING UPLOAD DATA";
  document.getElementById("upload-confirm-button").style.visibility="hidden";
  MainFileArray.push([]);
  let filesUploaded = event.target.files;
  var streamCompareCount = filesUploaded.length;
  for (let i=0; filesUploaded.length > i; i++){
      handleFile(filesUploaded[i]);
  }
  function readFileContents (file) {
      return new Promise((resolve) => {
          const reader = new window.FileReader()
          reader.onload = (event) => resolve(event.target.result)
          reader.readAsArrayBuffer(file)
      })
  }
  function handleFile(file){
      readFileContents(file).then((buffer) => {
          var filePath = file.webkitRelativePath;
          var filetowrite = {path: filePath, content: Buffer.from(buffer)};
          MainFileArray[MainFileArray.length - 1].push(filetowrite);
          GlobalUploadSize += Number(file.size);
          fileSize += Number(file.size);
          var totalUploadSizeMB = GlobalUploadSize/1000000;
          appendFile(filePath, file.name, file.size, null);
          console.log("Path: " + filePath + " Size: " + file.size + " Total Size: " + GlobalUploadSize);
          document.getElementById("upload-size").textContent=totalUploadSizeMB;
          contractDurationChange(document.getElementById('contract-duration').value);
          streamCompareCount--;
          updateAnalyzeProgress(((filesUploaded.length - streamCompareCount) / filesUploaded.length));
          if(streamCompareCount == 0){
  //            $analyzeMessage.innerText = "Data Analysis Complete";
//              document.getElementById("analyze-status-message").textContent="Analysis Complete";
//              setTimeout(function(){
                  //$('#analyzeDataModal').modal('hide');
                //  $('#analyzeDataModal').modal('hide').on('hidden', function() {
                  //    $('#nodeModal').modal('show')
                  //});
                  //$('#analyze-close-button').click();
                  document.getElementById("upload-hash").textContent="READY FOR UPLOAD";
                  document.getElementById("upload-confirm-button").style.visibility="visible";
  //            },5000);
          }
      });
  }
}
function onDrop (event) {
  MainFileArray.push([]);
  document.getElementById("upload-hash").textContent="ANALYZING UPLOAD DATA";
 // $('#nodeModal').modal('hide').on('hide', function() {
 //     $('#analyzeDataModal').modal('show')
 // });
  //$('#analyzeDataModal').modal('show');
  document.getElementById("upload-confirm-button").style.visibility="hidden";
  fileSize = 0;
  resetProgress();
  onDragLeave()
  event.preventDefault()
  if(GlobalUploadHash != "" && GlobalUploadPath != ""){
      GlobalMainHashArray.push(GlobalUploadHash);
      GlobalMainPathArray.push(GlobalUploadPath);
  }
  const dt = event.dataTransfer
  const filesDropped = dt.files
  const itemsDropped = dt.items

  function readFileContents (file) {
    return new Promise((resolve) => {
      const reader = new window.FileReader()
      reader.onload = (event) => resolve(event.target.result)
      reader.readAsArrayBuffer(file)
    })
  }
  var totalItemCount = 0;
  var streamCompareCount = 0;
  function initialHandleItems(items) {
      const files = [];
      totalItemCount = items.length;
      streamCompareCount = items.length;
      for (var item of items) {
          var awaitHandleEntry = handleEntry(item.webkitGetAsEntry());
      }
  function handleEntry(entry) {
      if (entry.isFile) {
          getFile(entry);
          function getFile(entry) {
              entry.file(function(file) {
                  readFileContents(file)
                      .then((buffer) => {
                          var filePath = entry.fullPath;
                          var filetowrite = {path: entry.fullPath, content: Buffer.from(buffer)};
                          MainFileArray[MainFileArray.length - 1].push(filetowrite);
                          GlobalUploadSize += Number(file.size);
                          fileSize += Number(file.size);
                          var totalUploadSizeMB = GlobalUploadSize/1000000;
                          appendFile(entry.fullPath, entry.name, file.size, null);
                          //console.log("Path: " + entry.fullPath + " Size: " + file.size + " Total Size: " + GlobalUploadSize);
                          document.getElementById("upload-size").textContent=totalUploadSizeMB;
                          contractDurationChange(document.getElementById('contract-duration').value);
                          streamCompareCount--;
                          updateAnalyzeProgress(((totalItemCount - streamCompareCount) / totalItemCount));
                          if(streamCompareCount == 0){
                              document.getElementById("upload-hash").textContent="READY FOR UPLOAD";
                              //$analyzeMessage.innerText = "Data Analysis Complete";
                              //document.getElementById("analyze-status-message").textContent="Analysis Complete";
                              //$('#analyzeDataModal').modal('hide');
                              //$('#analyze-close-button').click();
                              //document.getElementById("upload-confirm-button").style.visibility="visible";
                              //setTimeout(function(){
                                  //$('#analyzeDataModal').modal('hide');
                                  //$('#nodeModal').modal('show');
                                  //$('#analyze-close-button').click();
                                //  $('#analyzeDataModal').modal('hide').on('hide', function() {
                                 //     $('#nodeModal').modal('show')
                                 // });
                                  document.getElementById("upload-confirm-button").style.visibility="visible";
                               //},5000);
                          }
                  });
              });
          }

      } else if (entry.isDirectory) {
          let directoryReader = entry.createReader();
          directoryReader.readEntries(function(entries) {
              streamCompareCount += entries.length - 1;
              totalItemCount += entries.length - 1;
              entries.forEach(function(newEntry) {
                  handleEntry(newEntry);
              });
          });
      }
  }

  }
initialHandleItems(event.dataTransfer.items);
}

/* ===========================================================================
   Peers handling
   =========================================================================== */

function connectToPeer (event) {
  const multiaddr = $multiaddrInput.value

  if (!multiaddr) {
    return onError('No multiaddr was inserted.')
  }

  node.swarm.connect(multiaddr)
    .then(() => {
      onSuccess(`Successfully connected to peer.`)
      $multiaddrInput.value = ''
    })
    .catch(() => onError('An error occurred when connecting to the peer.'))
}
function updatePeerProgress(width, peercount){
    //console.log("Width: " + width);
    var backgroundcolor = "";
    var elem = document.getElementById("myPeerBar");
    width = round(width,2);
    if (width >= 100) {
        width = 100;
        //elem.style.width = width + '%';
        //elem.innerHTML = peercount * 1;
    }
    if(width >= 80){
        backgroundcolor = '"#3CB371"';
    }else if(width >= 40 && width < 80){
        backgroundcolor = '"#FFFF00"';
    }else{
        backgroundcolor = '"#FF0000"';
    }
   // console.log("Background: " + backgroundcolor);
    //elem.style.backgroundColor = backgroundcolor;
    elem.style.width = width + '%';
//    elem.innerHTML = peercount * 1;
}
function refreshPeerList () {
  var updatedPeerCount = 0;
  node.swarm.peers()
    .then((peers) => {
      const peersAsHtml = peers.reverse()
        .map((peer) => {
          if (peer.addr) {
            const addr = peer.addr.toString()
            if (addr.indexOf('ipfs') >= 0) {
              return addr
            } else {
              return addr + peer.peer.id.toB58String()
            }
          }
        })
        .map((addr) => {
          var splitString = addr.split("/");
          addr = splitString[splitString.length - 1];
          updatedPeerCount++;
          if(!PeersForChannel.includes(addr)){
              PeersForChannel.push(addr);
              //subscribeToHealthChannel()
          }
          return `<tr><td>${addr}</td></tr>`
        }).join('')

//      $peersList.innerHTML = peersAsHtml
    }).then(() => {
       // console.log("Updated Peer Count: " + updatedPeerCount);
        updatePeerProgress(((updatedPeerCount / 7) * 100), updatedPeerCount)
    })
    .catch((error) => onError(error))
}

/* ===========================================================================
   Error handling
   =========================================================================== */

function onSuccess (msg) {
  $logs.classList.add('success')
  $logs.innerHTML = msg
}

function onError (err) {
  let msg = 'An error occured, check the dev console'

  if (err.stack !== undefined) {
    msg = err.stack
  } else if (typeof err === 'string') {
    msg = err
  }

  $logs.classList.remove('success')
  $logs.innerHTML = msg
}

window.onerror = onError

/* ===========================================================================
   App states
   =========================================================================== */

const states = {
  ready: () => {
    const addressesHtml = info.addresses.map((address) => {
      return `<li><pre>${address}</pre></li>`
    }).join('')
    $nodeId.innerText = info.id
    $allDisabledButtons.forEach(b => { b.disabled = false })
    $allDisabledInputs.forEach(b => { b.disabled = false })
    $allDisabledElements.forEach(el => { el.classList.remove('disabled') })
  }
}

function updateView (state, ipfs) {
  if (states[state] !== undefined) {
    states[state]()
  } else {
    throw new Error('Could not find state "' + state + '"')
  }
}
/* ===========================================================================
   Boot the app
   =========================================================================== */
//const startApplication = () => {
window.startApplication = function(){
  // Setup event listeners
  $dragContainer.addEventListener('dragenter', onDragEnter)
  $dragContainer.addEventListener('dragover', onDragEnter)
  $dragContainer.addEventListener('drop', onDrop)
  $dragContainer.addEventListener('dragleave', onDragLeave)
  document.getElementById("fileUploadButton").addEventListener("change", onFileUpload)
  start()
  extendedStartApplication()
}
function extendedStartApplication(){
    $ethomessage.innerText = GlobalUserAddress;
}
window.stopApplication = function(){
    //node.stop();
    resetUploadProcess();
    resetFileTable();
   // window.startApplication();
}
