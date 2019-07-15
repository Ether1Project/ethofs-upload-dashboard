//JS for GN Reward data

function updateRewardGN() {
  $.getJSON('https://api.ether1.org/mnpapi.php?api=mnp_summary', function(data) {
    var text = `${data.gn_reward}`
    var text = Math.round(data.gn_reward) + " ETHO"

    $(".gn_reward").html(text);

    setTimeout(updateRewardGN(), 90000000);
  });
}

setTimeout(updateRewardGN(), 90000000);

//JS for the amount of GN Online

function updateonlineGN() {
  $.getJSON('https://api.ether1.org/mnpapi.php?api=mnp_summary', function(data) {
    var text = `${data.active_gn}`
    var text = Math.round(data.active_gn) + " Gateway Nodes Online"

    $(".gn_active").html(text);

    setTimeout(updateonlineGN(), 2000000);
  });
}

setTimeout(updateonlineGN(), 2000000);

//JS for MN Reward data

function updateMNR() {
  $.getJSON('https://api.ether1.org/mnpapi.php?api=mnp_summary', function(data) {
    var text = `${data.mn_reward}`
    var text = Math.round(data.mn_reward) + " ETHO"

    $(".mn_reward").html(text);

    setTimeout(updateMNR(), 90000000);
  });
}

setTimeout(updateMNR(), 90000000);

//JS for the amount of MN Online

function updateOMN() {
  $.getJSON('https://api.ether1.org/mnpapi.php?api=mnp_summary', function(data) {
    var text = `${data.active_mn}`
    var text = Math.round(data.active_mn) + " Master Nodes Online"

    $(".mn_active").html(text);

    setTimeout(updateOMN(), 2000000);
  });
}

setTimeout(updateOMN(), 2000000);

//JS for SN Reward data

function updateSNR() {
  $.getJSON('https://api.ether1.org/mnpapi.php?api=mnp_summary', function(data) {
    var text = `${data.sn_reward}`
    var text = Math.round(data.sn_reward) + " ETHO"

    $(".sn_reward").html(text);

    setTimeout(updateSNR(), 90000000);
  });
}

setTimeout(updateSNR(), 90000000);

//JS for the amount of SN Online

function updateOSN() {
  $.getJSON('https://api.ether1.org/mnpapi.php?api=mnp_summary', function(data) {
    var text = `${data.active_sn}`
    var text = Math.round(data.active_sn) + " Service Nodes Online"

    $(".sn_active").html(text);

    setTimeout(updateOSN(), 2000000);
  });
}

setTimeout(updateOSN(), 2000000);

// GN Cost/Price

function updateGNC() {
  $.getJSON('https://www.coincalculators.io/api.aspx?name=ether1&hashrate=38000000&power=175&poolfee=0&powercost=0.1', function(data) {
    var text = `${data.price_usd}`
    var text = "$" + Math.round(data.price_usd * 30000 * 100000) / 100000 + " USD"

    $(".price16").html(text);

    setTimeout(updateGNC(), 100000);
  });
}

setTimeout(updateGNC(), 100000);

// MN Cost/Price

function updateMNC() {
  $.getJSON('https://www.coincalculators.io/api.aspx?name=ether1&hashrate=38000000&power=175&poolfee=0&powercost=0.1', function(data) {
    var text = `${data.price_usd}`
    var text = "$" + Math.round(data.price_usd * 15000 * 100000) / 100000 + " USD"

    $(".price17").html(text);

    setTimeout(updateMNC(), 100000);
  });
}

setTimeout(updateMNC(), 100000);

// MN Cost/Price

function updateSNC() {
  $.getJSON('https://www.coincalculators.io/api.aspx?name=ether1&hashrate=38000000&power=175&poolfee=0&powercost=0.1', function(data) {
    var text = `${data.price_usd}`
    var text = "$" + Math.round(data.price_usd * 5000 * 100000) / 100000 + " USD"

    $(".price18").html(text);

    setTimeout(updateSNC(), 100000);
  });
}

setTimeout(updateSNC(), 100000);

//price JS

function updatePriceData() {
  $.getJSON('https://www.coincalculators.io/api.aspx?name=ether1&hashrate=38000000&power=175&poolfee=0&powercost=0.1', function(data) {
    var text = `${data.price_usd}`
    var text = Math.round(data.price_usd * 100000) / 100000 + " USD"

    $(".price").html(text);

    setTimeout(updatePriceData(), 100000);
  });
}

setTimeout(updatePriceData(), 100000);

//END
