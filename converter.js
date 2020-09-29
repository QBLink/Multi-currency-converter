document.body.ondrop = function(event) {
    event.preventDefault();
    event.stopPropagation();
}
var incomparetable = []; //global variable for checking the flags that already in the comparebox

//check the language of this system, if necessary, change the language
window.onload = function() {
    var language = navigator.language;
    languagechange(language);
}

//multi languages
function languagechange(language) {
    if (language == "zh-CN") {
        var maintitle = document.getElementById("maintitle");
        maintitle.innerHTML = "支持多币种的汇率换算器";
        var maintitleex = document.getElementById("maintitleex");
        maintitleex.innerHTML = "拖动相应的旗标到对应的方框里，最多可同时比较5种货币"
        var par = document.getElementById("par");
        par.innerHTML = "语言";
        var legend1 = document.getElementById("legend1");
        legend1.innerHTML = "基准货币";
        var legend2 = document.getElementById("legend2");
        legend2.innerHTML = "比较货币";
    } else if (language == "ja") {
        var maintitle = document.getElementById("maintitle");
        maintitle.innerHTML = "通貨換算ツール";
        var maintitleex = document.getElementById("maintitleex");
        maintitleex.innerHTML = "最大5つの通貨への換算ができます。フラグを対応のブロックにドラッグしてください！"
        var par = document.getElementById("par");
        par.innerHTML = "言語";
        var legend1 = document.getElementById("legend1");
        legend1.innerHTML = "基準通貨";
        var legend2 = document.getElementById("legend2");
        legend2.innerHTML = "変換通貨";
    } else if (language == "en") {
        var maintitle = document.getElementById("maintitle");
        maintitle.innerHTML = "One-to-Many Currency Converter";
        var maintitleex = document.getElementById("maintitleex");
        maintitleex.innerHTML = "Calculate up to 5 currency rates. Drag the flag into the box"
        var par = document.getElementById("par");
        par.innerHTML = "language";
        var legend1 = document.getElementById("legend1");
        legend1.innerHTML = "base currency";
        var legend2 = document.getElementById("legend2");
        legend2.innerHTML = "converted currency";
    }
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id); //get the id of the dragged element
}

function allowDrop(ev) {
    ev.preventDefault();
}

function dropbaseline(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text"); //data: the id of the dragged element
    table = createTable(data);
    table.id = "baselinetable";
    var baselinefield = document.getElementById("baselinefield");
    if (baselinefield.children.length < 2) {
        baselinefield.appendChild(table);
        var comparelist = document.getElementById("comparefield").children; //get all the tables that in the comparefield
        if (comparelist.length > 1) {
            currencycoverter(ev);
        }
    } else {
        return;
    }
}

function createTable(data) {
    var table = document.createElement("div");
    table.className = "table";
    table.addEventListener("mouseover", function() { mouseovertable(event); })
    table.addEventListener("mouseout", function() { mouseouttable(event); })
    var tableflag = document.createElement("div");
    tableflag.className = "tableflag";
    var flag = document.createElement("img");
    flag.src = document.getElementById(data).src;
    flag.alt = data;
    tableflag.appendChild(flag);
    var tablecurrency = document.createElement("div");
    tablecurrency.className = "tablecurrency"
    tablecurrency.innerHTML = data;
    tablecurrency.id = "baselinecurrency";
    var tablenum = document.createElement("div");
    tablenum.className = "tablenum";
    var tablenuminput = document.createElement("input");
    tablenuminput.placeholder = "1";
    tablenuminput.style.textAlign = "right";
    tablenuminput.id = "baselinetablenum"
    tablenuminput.name = "basevalue";
    tablenuminput.addEventListener("input", function() { currencycoverter(event); });
    tablenum.appendChild(tablenuminput);
    var close = document.createElement("div");
    close.innerHTML += "<svg onclick = 'clickclose(event)' viewBox='0 0 1025 1024'><path d='M874.873786 149.126214C676.038835-49.708738 352.221914-49.708738 153.386963 149.126214s-198.834951 522.651872 0 721.486823 522.651872 198.834951 721.486823 0 198.834951-516.970874 0-721.486823z m-39.76699 687.400832c-176.110957 176.110957-465.841886 176.110957-641.952843 0S17.042996 370.68516 193.153953 194.574202s465.841886-176.110957 641.952843 0 176.110957 460.160888 0 641.952844z' fill='#bfbfbf'></path><path d='M511.289875 552.477115l142.024965 142.024965c11.361997 11.361997 28.404993 11.361997 39.766991 0 11.361997-11.361997 11.361997-28.404993 0-39.76699L551.056865 512.710125l142.024966-142.024965c11.361997-11.361997 11.361997-28.404993 0-39.766991-11.361997-11.361997-28.404993-11.361997-39.766991 0L511.289875 472.943135 369.26491 330.918169c-11.361997-11.361997-28.404993-11.361997-39.76699 0-11.361997 11.361997-11.361997 28.404993 0 39.766991L471.522885 512.710125l-142.024965 142.024965c-11.361997 11.361997-11.361997 28.404993 0 39.76699 11.361997 11.361997 28.404993 11.361997 39.76699 0L511.289875 552.477115z' fill='#bfbfbf'></path></svg>";
    close.className = "close";
    table.appendChild(tableflag);
    table.appendChild(tablecurrency);
    table.appendChild(tablenum);
    table.appendChild(close);
    return table;
}

function createCompareTable(data) { //the tables in comparefield do not need the input box
    var table = document.createElement("div");
    table.className = "table";
    table.addEventListener("mouseover", function() { mouseovertable(event); })
    table.addEventListener("mouseout", function() { mouseouttable(event); })
    var tableflag = document.createElement("div");
    tableflag.className = "tableflag";
    var flag = document.createElement("img");
    flag.src = document.getElementById(data).src;
    flag.alt = data;
    tableflag.appendChild(flag);
    var tablecurrency = document.createElement("div");
    tablecurrency.className = "tablecurrency"
    tablecurrency.innerHTML = data;
    var tablenumcompare = document.createElement("div");
    tablenumcompare.className = "tablenumcompare";
    tablenumcompare.innerHTML += "<label style='text-align: right;' class='comparelabel'>1</label></div>"
    var close = document.createElement("div");
    close.innerHTML += "<svg onclick = 'clickclose(event)' viewBox='0 0 1025 1024'><path d='M874.873786 149.126214C676.038835-49.708738 352.221914-49.708738 153.386963 149.126214s-198.834951 522.651872 0 721.486823 522.651872 198.834951 721.486823 0 198.834951-516.970874 0-721.486823z m-39.76699 687.400832c-176.110957 176.110957-465.841886 176.110957-641.952843 0S17.042996 370.68516 193.153953 194.574202s465.841886-176.110957 641.952843 0 176.110957 460.160888 0 641.952844z' fill='#bfbfbf'></path><path d='M511.289875 552.477115l142.024965 142.024965c11.361997 11.361997 28.404993 11.361997 39.766991 0 11.361997-11.361997 11.361997-28.404993 0-39.76699L551.056865 512.710125l142.024966-142.024965c11.361997-11.361997 11.361997-28.404993 0-39.766991-11.361997-11.361997-28.404993-11.361997-39.766991 0L511.289875 472.943135 369.26491 330.918169c-11.361997-11.361997-28.404993-11.361997-39.76699 0-11.361997 11.361997-11.361997 28.404993 0 39.766991L471.522885 512.710125l-142.024965 142.024965c-11.361997 11.361997-11.361997 28.404993 0 39.76699 11.361997 11.361997 28.404993 11.361997 39.76699 0L511.289875 552.477115z' fill='#bfbfbf'></path></svg>";
    close.className = "close";
    table.appendChild(tableflag);
    table.appendChild(tablecurrency);
    table.appendChild(tablenumcompare);
    table.appendChild(close);
    return table;
}

function clickclose(ev) {
    //closetable:  find the node table that to be closed
    if (ev.target.tagName == "svg") { //click on svg
        var closetable = ev.target.parentNode.parentNode;
        var field = closetable.parentNode.id; //get the field of table that to be deleted, if field is comparefield, remove the flag from incomparetable
        closetable.parentNode.removeChild(closetable);
    } else { //click on path
        var closetable = ev.target.parentNode.parentNode.parentNode;
        var field = closetable.parentNode.id;
        closetable.parentNode.removeChild(closetable);
    }
    if (field == "comparefield") { //if field is comparefield, remove the flag from incomparetable
        var flag = closetable.children[1].innerHTML;
        var i = incomparetable.indexOf(flag);
        incomparetable.splice(i, 1);
    }
}

function mouseovertable(ev) {
    //console.log(ev.target.parentNode.className);
    //find the <div id="close">
    if (ev.target.parentNode.className == "table") { //mouse on table
        var closebutton = ev.target.parentNode.children[3];
        closebutton.style.cssText += "visibility: visible";
    } else if (ev.target.parentNode.parentNode.className == "table") { //mouse on tableflag or tablenum
        var closebutton = ev.target.parentNode.parentNode.children[3];
        closebutton.style.cssText += "visibility: visible";
    } else if (ev.target.parentNode.parentNode.parentNode.className == "table") { //mouse on tableflag or tablenum
        var closebutton = ev.target.parentNode.parentNode.parentNode.children[3];
        closebutton.style.cssText += "visibility: visible";
    } else {
        return;
    }
}

function mouseouttable(ev) {
    //find the <div id="close">
    if (ev.target.parentNode.className == "table") {
        var closebutton = ev.target.parentNode.children[3];
        closebutton.style.cssText += "visibility: hidden";
    } else if (ev.target.parentNode.parentNode.className == "table") {
        var closebutton = ev.target.parentNode.parentNode.children[3];
        closebutton.style.cssText += "visibility: hidden";
    } else if (ev.target.parentNode.parentNode.parentNode.className == "table") { //mouse on tableflag or tablenum
        var closebutton = ev.target.parentNode.parentNode.parentNode.children[3];;
        closebutton.style.cssText += "visibility: visible";
    } else {
        return;
    }
}

function dropcompare(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text"); //data: the id of the dragged element
    table = createCompareTable(data);
    var comparefield = document.getElementById("comparefield");
    if (comparefield.children.length < 6) {
        if (incomparetable.indexOf(data) != -1) { //if the flag that dragged already exists in the comparefield
            return;
        }
        comparefield.appendChild(table);
        incomparetable.push(data); //add the flag to incomparetable
        if (document.getElementById("baselinetablenum") != null) { //if there has been a baseline in the baselinefield, convert the value of dragged currrency
            currencycoverter(ev);
        }
    } else {
        return;
    }
}

function currencycoverter(ev) { //get the rates from api, calculate the values for each currency
    var baselinevalue = document.getElementById("baselinetablenum").value;
    var baselinevalue = parseFloat(baselinevalue);
    var baselinecurrency = document.getElementById("baselinecurrency").innerHTML;

    //api: https://www.exchangerate-api.com/
    //api example: var note = { "result": "success", "documentation": "https://www.exchangerate-api.com/docs", "terms_of_use": "https://www.exchangerate-api.com/terms", "time_last_update_unix": 1600733050, "time_last_update_utc": "Tue, 22 Sep 2020 00:04:10 +0000", "time_next_update_unix": 1600819570, "time_next_update_utc": "Wed, 23 Sep 2020 00:06:10 +0000", "base_code": "CNY", "conversion_rates": { "CNY": 1, "AED": 0.5431, "ARS": 11.1379, "AUD": 0.2029, "BGN": 0.2445, "BRL": 0.7955, "BSD": 0.1479, "CAD": 0.1951, "CHF": 0.1346, "CLP": 112.8460, "COP": 538.3333, "CZK": 3.3548, "DKK": 0.9295, "DOP": 8.6232, "EGP": 2.3190, "EUR": 0.1249, "FJD": 0.3124, "GBP": 0.1145, "GTQ": 1.1462, "HKD": 1.1430, "HRK": 0.9430, "HUF": 45.2126, "IDR": 2190.4417, "ILS": 0.5071, "INR": 10.8494, "ISK": 20.1719, "JPY": 15.3876, "KRW": 171.9294, "KZT": 62.4586, "MVR": 2.2674, "MXN": 3.1503, "MYR": 0.6084, "NOK": 1.3541, "NZD": 0.2195, "PAB": 0.1479, "PEN": 0.5209, "PHP": 7.1510, "PKR": 24.5228, "PLN": 0.5586, "PYG": 1027.7273, "RON": 0.6075, "RUB": 11.2137, "SAR": 0.5533, "SEK": 1.2999, "SGD": 0.2005, "THB": 4.6032, "TRY": 1.1201, "TWD": 4.2850, "UAH": 4.1526, "USD": 0.1474, "UYU": 6.2736, "ZAR": 2.4416 } };
    const api = new XMLHttpRequest();
    const url = "https://v6.exchangerate-api.com/v6/d43944a0946b870ae5b2bcee/latest/" + baselinecurrency;
    api.open("GET", url);
    api.send();

    api.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { //after getting the respond from api successfully, calculate the values for each currency
            response = api.responseText;
            var rateinfo = JSON.parse(response);
            var comparelist = document.getElementById("comparefield").children; //get all the tables that in the comparefield
            if (comparelist.length <= 1) {
                return;
            }

            var i = 1;
            for (i = 1; i < comparelist.length; i++) {
                var curr = comparelist[i].children[1].innerHTML; //get the currency to be converted
                var rate = rateinfo["conversion_rates"][curr];
                var convertedvalue = rate * baselinevalue;
                convertedvalue = convertedvalue.toFixed(2);
                var label = document.getElementsByClassName("comparelabel");
                if (convertedvalue == 'NaN') {
                    label[i - 1].innerHTML = rate;
                } else {
                    label[i - 1].innerHTML = convertedvalue;
                }
            }
        }
    }
}