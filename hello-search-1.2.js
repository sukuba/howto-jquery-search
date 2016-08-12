// hello-search
// https://github.com/sukuba/howto-jquery-search

$(document).ready(function(){
  
  function clearSearchResult() {
    $("#result").html("");
  }
  
  function makeHtmlTrTd(tds) {
    var tr = [];
    tr.push('<tr>');
    //var n = Object.keys(tds).length;
    for(var key in tds) {
      tr.push('<td>' + tds[key] + '</td>');
    }
    tr.push('</tr>');
    return(tr.join(''));
  }
  
  function failMessageHandler(xhr, ajaxOptions, thrownError) {
    var msg =xhr.status + " / " + thrownError;
    console.log(this.url);
    console.log(msg);
  }
  
  var commonParams = {
    dataType: "json",
    mimeType: "text/plain; charset=utf8"
  }
  
  var fileHello = "hello-excel-9-Hello2.json"
  
  function appendSearchResult(what) {
    var findWhat = new RegExp(what.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    // escaping for regexp
    // http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    console.log(findWhat);
    $.ajax(fileHello, commonParams
    ).done(function(result){
      $.each(result, function(i, val){
        strVal = JSON.stringify(val);
        // it includes also keys, but is simplest for this example.
        console.log(strVal);
        if(findWhat.test(strVal)) {
          $("#result").append(makeHtmlTrTd(val));
        }
      });
    }).fail(failMessageHandler
    );
  }
  
  function onSearch(what) {
    clearSearchResult();
    appendSearchResult(what);
  }
  
  $("#search").click(function(){
    onSearch($("#q").val());
  });
  
});
