var DataLoad = function () { };

var bookdatacopy = {};

DataLoad.prototype.getSomeJsonData = function (aJsonFile, typeJson) {
    var dataReturned = {};
    $.getJSON(aJsonFile, function (dataReturned) {
        loadData(dataReturned, typeJson);
        if (typeJson == "BookData")
            bookdatacopy = dataReturned;
    });
};

function needToSort(columnToSort, bookdatacopy) {

    var sortedBooks = bookdatacopy;

    switch (columnToSort) {
        case "Sort_Books":
            sortedBooks.TableElements.sort(function (a, b) { return (a.colNum - b.colNum) });
            break;
        case "Sort_Title":
            sortedBooks.TableElements.sort(function (a, b) { return (a.title > b.title ? 1 : -1) });
            break;
        case "Sort_Author":
            sortedBooks.TableElements.sort(function (a, b) { return (a.author_lname > b.author_lname ? 1 : -1) });
            break;
        case "Sort_Date":
            sortedBooks.TableElements.sort(function (a, b) { return (a.pubDate > b.pubDate ? 1 : -1) });
            break;
        default:
            break;
    };

    var i = 0;
    var k = 0;
    var tdelems = document.getElementsByTagName("TD");
    if (tdelems && sortedBooks) {
        for (var i; i < sortedBooks.TableElements.length; i++) {
            tdelems[k].innerHTML = sortedBooks.TableElements[i].colNum;
            k++;
            tdelems[k].innerHTML = sortedBooks.TableElements[i].title;
            k++;
            tdelems[k].innerHTML = (sortedBooks.TableElements[i].author_fname + ' ' + bookdatacopy.TableElements[i].author_lname);
            k++;
            tdelems[k].innerHTML = sortedBooks.TableElements[i].pubDate;
            k++;
        }
    }
}

function loadData(page_data, typeJson) {
    //Load the header and footers
    if (typeJson == "HdrFtr") {
        $("#link_h").append(page_data.HdrFtrElems[0].lhh);
        $("#link_v").append(page_data.HdrFtrElems[1].lvh);
        $("#link_t").append(page_data.HdrFtrElems[2].lth);
        $("#link_c").append(page_data.HdrFtrElems[3].lch);
        $("#link_f").append(page_data.HdrFtrElems[4].lfh);

        $("#link_h_f").append(page_data.HdrFtrElems[0].lhh);
        $("#link_c_f").append(page_data.HdrFtrElems[3].lch);
        $("#link_v_f").append(page_data.HdrFtrElems[1].lvh);
        $("#link_f_f").append(page_data.HdrFtrElems[4].lfh);
        $("#link_t_f").append(page_data.HdrFtrElems[2].lth);
    }
    else {
        var tbRow = document.getElementById("bk_hdr_row");
        //First make sure we are on the Tables page
        if (tbRow != null) {
            //Load book table headers and details
            var bookTable = document.getElementById("bk_tbl");
            var bookTableDetails = document.getElementById("bk_tbl_details");
            var bookList = $("tr").find("td");
            if (bookList.length < page_data.TableElements.length) {
                var i = 0;
                var tableElem;
                //Find out if a table with table detail cells exist, if not create one
                if (bookList.length != 0) {
                    i = page_data.TableElements.length - bookList.length;
                }

                for (; i < page_data.TableElements.length; i++) {
                    //insert one past the header row
                    var trElem = bookTable.insertRow(i + 1);
                    //create table cells
                    var tdElem = document.createElement("TD");
                    var tdElem2 = document.createElement("TD");
                    var tdElem3 = document.createElement("TD");
                    var tdElem4 = document.createElement("TD");

                    //add cell to row and insert cell data
                    tdElem.innerHTML = page_data.TableElements[i].colNum;
                    var cell1 = trElem.insertCell(0);
                    cell1.appendChild(tdElem);
                    tdElem2.innerHTML = page_data.TableElements[i].title;
                    var cell2 = trElem.insertCell(1);
                    cell2.appendChild(tdElem2);
                    tdElem3.innerHTML = (page_data.TableElements[i].author_fname + ' ' + page_data.TableElements[i].author_lname);
                    var cell3 = trElem.insertCell(2);
                    cell3.appendChild(tdElem3);
                    tdElem4.innerHTML = page_data.TableElements[i].pubDate;
                    var cell4 = trElem.insertCell(3);
                    cell4.appendChild(tdElem4);
                }
            }
        }
    }
}

$(document).ready(function () {

    var getTheHdrFtrData;
    var getTheBookData;

    var testBkPage = document.getElementById("bk_tbl");

    $(window).unload(function () {
        getTheHdrFtrData = 0;
        getTheBookData = 0;
        bookdatacopy = 0;
    });

    getTheHdrFtrData = new DataLoad;
    getTheHdrFtrData.getSomeJsonData("http://localhost/myApp/liitLinkStore.json", "HdrFtr");

    if (testBkPage) {
        $.ajaxSetup({ cache: false });
        getTheBookData = new DataLoad;
        getTheBookData.getSomeJsonData("http://localhost/myApp/liitLinkStoreBooks.json", "BookData");
        $("li").on('click', function () {
            var sortType = $(this).text();
            needToSort(sortType, bookdatacopy);
        });
    }
});
