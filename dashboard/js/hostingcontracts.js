var hostingContractArray={
        "row1": {"name":"TestContract1","address":"0xB36fEEBEfB3207e9efdg33557Ce6350c3hedfd73","startblock":"896342","endblock":"916342","status":"Active","cost":"0000"},
        "row2": {"name":"TestContract2","address":"0xAd11445B9B3207e9E0f331d57Ce6350c10788076","startblock":"865701","endblock":"932981","status":"Active","cost":"0000"},
        "row3": {"name":"TestContract3","address":"0x45B9aF3207e9E0aa0131d57Ce6350c10781a3555","startblock":"901239","endblock":"965825","status":"Active","cost":"0000"},
        "row4": {"name":"TestContract4","address":"0xAf625FA7234abC32031d57Ce6350c1078af35FEB","startblock":"910287","endblock":"990241","status":"Expired","cost":"0000"}
    }


var hostingContracts = "";
//var tableRef = document.getElementById('hostingcontractstable').getElementsByTagName('tbody')[0];
for (var i in hostingContractArray)
{
    hostingContracts += '<tr class="tr-shadow"><td>' + hostingContractArray[i].name + '</td><td><span class="block-email">' + hostingContractArray[i].address + '</span></td><td class="desc">' + hostingContractArray[i].startblock + '</td><td>' + hostingContractArray[i].endblock + '</td><td><span class="status--process">' + hostingContractArray[i].status + '</span></td><td>' + hostingContractArray[i].cost + '</td><td><div class="table-data-feature"><button class="item" data-toggle="tooltip" data-placement="top" title="Send"><i class="zmdi zmdi-mail-send"></i></button><button class="item" data-toggle="tooltip" data-placement="top" title="Edit"><i class="zmdi zmdi-edit"></i></button><button class="item" data-toggle="tooltip" data-placement="top" title="Delete"><i class="zmdi zmdi-delete"></i></button><button class="item" data-toggle="tooltip" data-placement="top" title="More"><i class="zmdi zmdi-more"></i></button></div></td></tr>';
}
document.getElementById("hostingcontractstablebody").innerHTML=hostingContracts;
