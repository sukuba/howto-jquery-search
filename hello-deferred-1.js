// hello-search
// https://github.com/sukuba/howto-jquery-search

$(document).ready(function(){
  
  function clearSearchResult() {
    $("#result").html("");
  }
  
  var commonParams = {
    dataType: "json",
    mimeType: "text/plain; charset=utf8"
  }
  
  function appendSearchResult1(what) {
    $.ajax(what, commonParams
    ).done(function(result){
      $("#result").append("success");
    }).fail(function(result){
      $("#result").append("fail");
    });
  }
  
  function appendSearchResult2(what) {
    $.ajax(what, commonParams
    ).always(function(result){
      $("#result").append("always");
    }).fail(function(result){
      $("#result").append("fail");
    });
  }
  
  function appendSearchResult3(what) {
    $.when(appendSearchResult1(what + '1'), appendSearchResult1(what)
    ).done(function(result){
      $("#result").append("Done");
    }).fail(function(result){
      $("#result").append("Fail");
    });
  }
  
  function onSearch(what) {
    clearSearchResult();
    appendSearchResult3(what);
  }
  
  $("#search").click(function(){
    onSearch($("#q").val());
  });
  
});
