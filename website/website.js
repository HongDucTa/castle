var tableEtablissement = document.getElementById("tableEtablissement");


for (var i=0;i<test.length;i++)
{
    var row = tableEtablissement.insertRow(i+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "<a href=\"" + test[i].link + "\">" + test[i].name;
    cell2.innerHTML = test[i].price;
}