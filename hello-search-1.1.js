// hello-search
// https://github.com/sukuba/howto-jquery-search

$(document).ready(function(){
  
  function clearSearchResult() {
    $("#result").html("");
  }
  
  function makeHtmlTrTd(tds) {
    var tr = [];
    tr.push('<tr>');
    for(var i = 0; i < tds.length; i++) {
      tr.push('<td>' + tds[i] + '</td>');
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
  
  var fileHello = "utf8-Hello2.json"
  
  function appendSearchResult(what) {
    //$.getJSON(fileHello
    //explicit content-type parameter is needed to be called on local
    $.ajax(fileHello, commonParams
    ).done(function(result){
      //$.each(result, function(i, val){
      $.each(result.filter(
        function(element, index, array){return(element.join(' ').indexOf(what) != -1);}
      ), function(i, val){
        $("#result").append(makeHtmlTrTd(val));
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
