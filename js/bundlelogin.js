(function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r)
        }, p, p.exports, r, e, n, t)
      }
      return n[i].exports
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o
  }
  return r
})()({
  1: [function(require, module, exports) {
    var GlobalControllerContractAddress = "0xc38B47169950D8A28bC77a6Fa7467464f25ADAFc"; //Add live contract here
    var GlobalControllerABI = JSON.parse('[ { "constant": true, "inputs": [], "name": "last_completed_migration", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": false, "inputs": [ { "name": "completed", "type": "uint256" } ], "name": "setCompleted", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "new_address", "type": "address" } ], "name": "upgrade", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "pinToAdd", "type": "string" }, { "name": "pinSize", "type": "uint32" } ], "name": "PinAdd", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "pin", "type": "string" } ], "name": "PinRemove", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": false, "inputs": [], "name": "deleteContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "set", "type": "address" } ], "name": "SetAccountCollectionAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "hostingCost", "type": "uint256" } ], "name": "SetHostingCost", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "pinStorageAddress", "type": "address" } ], "name": "SetPinStorageAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "ethoFSDashboardAddress", "type": "address" } ], "name": "SetEthoFSDashboardAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "ethoFSHostingContractsAddress", "type": "address" } ], "name": "SetEthoFSHostingContractsAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "UserAddress", "type": "address" }, { "name": "AccountName", "type": "string" } ], "name": "AddNewUserOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "AccountName", "type": "string" } ], "name": "AddNewUserPublic", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "UserAddress", "type": "address" } ], "name": "RemoveUserOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "RemoveUserPublic", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "MainContentHash", "type": "string" }, { "name": "HostingContractName", "type": "string" }, { "name": "HostingContractDuration", "type": "uint32" }, { "name": "TotalContractSize", "type": "uint32" }, { "name": "pinSize", "type": "uint32" }, { "name": "ContentHashString", "type": "string" }, { "name": "ContentPathString", "type": "string" } ], "name": "AddNewContract", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "HostingContractAddress", "type": "address" }, { "name": "MainContentHash", "type": "string" } ], "name": "RemoveHostingContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "HostingContractAddress", "type": "address" }, { "name": "HostingContractExtensionDuration", "type": "uint32" } ], "name": "ExtendContract", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "ScrubHostingContracts", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "UserAddress", "type": "address" } ], "name": "GetUserAccountName", "outputs": [ { "name": "value", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "UserAddress", "type": "address" } ], "name": "GetUserAccountActiveContractCount", "outputs": [ { "name": "value", "type": "uint32", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "UserAddress", "type": "address" } ], "name": "GetUserAccountTotalContractCount", "outputs": [ { "name": "value", "type": "uint32", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "UserAddress", "type": "address" }, { "name": "ArrayKey", "type": "uint256" } ], "name": "GetHostingContractAddress", "outputs": [ { "name": "value", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "UserAddress", "type": "address" } ], "name": "CheckAccountExistence", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetMainContentHash", "outputs": [ { "name": "MainContentHash", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetContentHashString", "outputs": [ { "name": "ContentHashString", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetContentPathString", "outputs": [ { "name": "ContentPathString", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetHostingContractDeployedBlockHeight", "outputs": [ { "name": "value", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetHostingContractExpirationBlockHeight", "outputs": [ { "name": "value", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetHostingContractStorageUsed", "outputs": [ { "name": "value", "type": "uint32", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetHostingContractName", "outputs": [ { "name": "value", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newOperator", "type": "address" } ], "name": "changeOperator", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "set", "type": "address" } ], "name": "SetAccountCollectionAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "UserAddress", "type": "address" }, { "name": "AccountName", "type": "string" } ], "name": "AddNewUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "UserAddress", "type": "address" } ], "name": "RemoveUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "newContractAddress", "type": "address" }, { "name": "UserAddress", "type": "address" }, { "name": "HostingContractName", "type": "string" }, { "name": "HostingContractDuration", "type": "uint32" }, { "name": "TotalContractSize", "type": "uint32" } ], "name": "AddHostingContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "UserAddress", "type": "address" }, { "name": "HostingContractAddress", "type": "address" } ], "name": "RemoveHostingContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "UserAddress", "type": "address" } ], "name": "GetUserAccountAddress", "outputs": [ { "name": "value", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "UserAddress", "type": "address" } ], "name": "GetUserAccountName", "outputs": [ { "name": "value", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "UserAddress", "type": "address" } ], "name": "GetUserAccountActiveContractCount", "outputs": [ { "name": "value", "type": "uint32" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "UserAddress", "type": "address" } ], "name": "GetUserAccountTotalContractCount", "outputs": [ { "name": "value", "type": "uint32" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "UserAddress", "type": "address" }, { "name": "ArrayKey", "type": "uint256" } ], "name": "GetHostingContractAddress", "outputs": [ { "name": "value", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "UserAddress", "type": "address" } ], "name": "CheckAccountExistence", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "ScrubContractList", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "set", "type": "uint256" } ], "name": "SetHostingContractCost", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "HostingContractAddress", "type": "address" }, { "name": "HostingContractExtensionDuration", "type": "uint32" } ], "name": "ExtendHostingContract", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetMainContentHash", "outputs": [ { "name": "MainContentHash", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetContentHashString", "outputs": [ { "name": "ContentHashString", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetContentPathString", "outputs": [ { "name": "ContentPathString", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetHostingContractDeployedBlockHeight", "outputs": [ { "name": "value", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetHostingContractExpirationBlockHeight", "outputs": [ { "name": "value", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetHostingContractStorageUsed", "outputs": [ { "name": "value", "type": "uint32" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "HostingContractAddress", "type": "address" } ], "name": "GetHostingContractName", "outputs": [ { "name": "value", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "MainContentHash", "type": "string" }, { "name": "HostingContractName", "type": "string" }, { "name": "HostingContractDuration", "type": "uint32" }, { "name": "TotalContractSize", "type": "uint32" }, { "name": "ContentHashString", "type": "string" }, { "name": "ContentPathString", "type": "string" } ], "name": "AddHostingContract", "outputs": [ { "name": "value", "type": "address" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "CustomerAddress", "type": "address" }, { "name": "HostingContractAddress", "type": "address" }, { "name": "AccountCollectionAddress", "type": "address" } ], "name": "RemoveHostingContract", "outputs": [ { "name": "value", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "AccountCollectionAddress", "type": "address" } ], "name": "SetAccountCollectionAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]');
    var GlobalUserAddress = "";

    window.addEventListener('load', function() {

      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        web3.eth.getAccounts(function(err, accounts) {
          if (err != null) {
            console.error("An error occurred: " + err);
          } else if (accounts.length == 0) {
            console.log("User is not logged in");
            var formText = '<form id="subscribe-form"><div class="form-group group-inline"></div><p class="m-b-0 fade-color-3"><small>Please Install or Login to Metamask/The Ether-1 Browser Extension to Continue</small></p></form>';
            document.getElementById("ethoFSLogin").innerHTML = formText;
          } else {
            console.log("User is logged in");
            web3.eth.defaultAccount = accounts[0];
            GlobalUserAddress = accounts[0];
            var AccountContract = web3.eth.contract(GlobalControllerABI);
            var Accounts = AccountContract.at(GlobalControllerContractAddress);
            Accounts.CheckAccountExistence(GlobalUserAddress, function(error, result) {
              if (!error) {
                if (result) {
                  Accounts.GetUserAccountName(GlobalUserAddress, function(error, result) {
                    if (!error) {
                      if (result) {
                        console.log("User Account Found: " + web3.eth.defaultAccount);
                        var formText = '<div class="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + result + '</div>';
                        document.getElementById("ethoFSLogin").innerHTML = formText;
                      }
                    } else {
                      console.log("Error getting user account name");
                      var formText = '<form id="subscribe-form"><div class="form-group group-inline"></div><p class="m-b-0 fade-color-3"><small>Please Install or Login to Metamask/The Ether-1 Browser Extension to Continue</small></p></form>';
                      document.getElementById("ethoFSLogin").innerHTML = formText;
                    }
                  });

                } else {
                  console.log("User Account Not Found: " + web3.eth.defaultAccount);
                  var formText = '<form id="signup-form"><div class="form-group group-inline"><label for="etho-address" class="form-label">Enter New ethoFS User Name</label><br><input id="etho-address" class="form-control form-primary form-animated" name="etho-address" required="" placeholder=""><button type="button" class="btn btn-primary" onclick="window.AddNewUser();">Signup</button></div><p class="m-b-0 fade-color-3"><small><span id="wait">Click Signup to Register Your Metamask/Ether-1 Browser Extension Address With ethoFS To Continue</span></small></p></form>';
                  document.getElementById("ethoFSLogin").innerHTML = formText;
                }
              } else {
                console.log("Access To Browser Extension Not Found");
                var formText = '<form id="subscribe-form"><div class="form-group group-inline"></div><p class="m-b-0 fade-color-3"><small>Please Install or Login to Metamask/The Ether-1 Browser Extension to Continue</small></p></form>';
                document.getElementById("ethoFSLogin").innerHTML = formText;
              }
            });
          }
        });
      } else {
        console.log("Access To Browser Extension Not Found");
        var formText = '<form id="subscribe-form"><div class="form-group group-inline"></div><p class="m-b-0 fade-color-3"><small>Please Install or Login to Metamask/The Ether-1 Browser Extension to Continue</small></p></form>';
        document.getElementById("ethoFSLogin").innerHTML = formText;
      }
    })

    //*****************************************************************************************************************************************
    //function AddNewUser() {
    window.AddNewUser = function() {
      var ethoAddress = document.getElementById("etho-address").value;
      console.log("Initiating New User Addition... " + ethoAddress);
      var controllerContract = web3.eth.contract(GlobalControllerABI);
      var controller = controllerContract.at(GlobalControllerContractAddress);
      controller.AddNewUserPublic.sendTransaction(ethoAddress, function(error, result) {
        if (!error) {
          if (result) {
            document.getElementById("wait").innerHTML = 'Waiting For Add User Confirmation.';
            WaitingForTransaction();
            waitForReceipt(result, function(receipt) {
              console.log("Transaction Has Been Mined: " + receipt);
              console.log("User Account Found: " + web3.eth.defaultAccount);
              var formText = '<a href="uploads.html"><button type="enter" id="enter-button" class="btn btn-primary-enter">Enter</button></a><br><p class="m-b-0 fade-color-3"><small>User Address Found - Click Enter To Proceed</small></p>';
              document.getElementById("ethoFSLogin").innerHTML = formText;
            });
          } else {
            console.log("There was a problem adding new user");
          }
        } else {
          console.error(error);
        }
      });
    }
    //*****************************************************************************************************************************************
    function WaitingForTransaction() {
      window.dotsGoingUp = true;
      var dots = window.setInterval(function() {
        var wait = document.getElementById("wait");
        if (wait.innerHTML.length > 37) {
          wait.innerHTML = "Waiting For Add User Confirmation";
        } else {
          wait.innerHTML += ".";
        }

      }, 1000);
    }
    //*****************************************************************************************************************************************
    function waitForReceipt(hash, cb) {
      web3.eth.getTransactionReceipt(hash, function(err, receipt) {
        web3.eth.getBlock('latest', function(e, res) {
          if (!e) {}
        });
        if (err) {
          error(err);
        }
        if (receipt !== null) {
          if (cb) {
            cb(receipt);
          }
        } else {
          window.setTimeout(function() {
            waitForReceipt(hash, cb);
          }, 10000);
        }
      });
    }
    //*****************************************************************************************************************************************
    getBalance(web3);

    function getBalance(web3) {
      console.log("Starting Balance Detection..");
      web3.eth.getBalance(web3.eth.defaultAccount, function(err, data) {
        var balance = "ETHO Balance: " + web3.fromWei(data, "ether").toFixed(2);
        document.getElementById("ethobalance").textContent = balance;
        console.log("ETHO Balance: " + data);
      });
    }
    //*****************************************************************************************************************************************

  }, {}]
}, {}, [1]);
