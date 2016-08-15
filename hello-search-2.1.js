// hello-search
// https://github.com/sukuba/howto-jquery-search

$(document).ready(function(){
  
  function showErrorMessage(msg) {
    $('#error').text(msg);
  }
  
  function clearErrorMessage() {
    showErrorMessage('');
  }
  
  function clearSearchResult() {
    $('#result').html('');
  }
  
  function makeHtmlOption(value, text) {
    var opt = [];
    opt.push('<option value="');
    opt.push(value);
    opt.push('">');
    opt.push(text);
    opt.push('</option>');
    return(opt.join(''));
  }
  
  function makeHtmlTrTd(tds) {
    var tr = [];
    tr.push('<tr>');
    for(var i = 0; i < tds.length; i++) {
      if(i == urlAt) { continue; }
      tr.push('<td>');
      var url = tds[urlAt];
      if(i == urlShow && url) {
        tr.push('<a href="');
        tr.push(linkBase);
        tr.push(url);
        tr.push('" target="_blank">');
        tr.push(tds[i]);
        tr.push('</a>');
      } else {
        tr.push(tds[i]);
      }
      tr.push('</td>');
    }
    tr.push('</tr>');
    return(tr.join(''));
  }
  
  function makeHtmlTrTh(ths) {
    var tr = [];
    tr.push('<tr><th>');
    tr.push(ths.filter(function(ele, idx){return idx != urlAt}).join('</th><th>'));
    tr.push('</th></tr>');
    return(tr.join(''));
  }
  
  function failMessageHandler(xhr, ajaxOptions, thrownError) {
    var msg =xhr.status + ' / ' + thrownError;
    console.log(this.url);
    console.log(msg);
    showErrorMessage(this.url + ' / ' + msg);
  }
  
  var commonParams = {
    dataType: 'json',
    mimeType: 'text/plain; charset=utf8'
  }
  
  var linkBase = 'hoge/';
  var jsonBase = 'priv/';
  var fileColumns = jsonBase + 'columns.json';
  var fileIndex = jsonBase + 'index.json';
  var urlAt = 6;
  var urlShow = 4;
  
  function loadColumns() {
    $.ajax(fileColumns, commonParams
    ).done(function(result){
      $('#result-head').append(makeHtmlTrTh(result));
    }).fail(failMessageHandler
    );
  }
  
  function setupSheetSelector() {
    $.ajax(fileIndex, commonParams
    ).done(function(result){
      $.each(result, function(idx, val){
        $('#sheet').append(makeHtmlOption(jsonBase + val['url'], val['title']));
      });
    }).fail(failMessageHandler
    );
  }
  
  function appendSearchResult(what) {
    var findWhat = new RegExp(what.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    var fileSheet = $('#sheet').val();
    console.log(findWhat);
    console.log(fileSheet);
    $.ajax(fileSheet, commonParams
    ).done(function(result){
      $.each(result, function(i, val){
        strVal = JSON.stringify(val);
        if(findWhat.test(strVal)) {
          $('#result').append(makeHtmlTrTd(val));
        }
      });
    }).fail(failMessageHandler
    );
  }
  
  function onSearch(what) {
    clearSearchResult();
    clearErrorMessage();
    appendSearchResult(what);
  }
  
  $('#search').click(function(){
    onSearch($('#q').val());
  });
  
  loadColumns();
  setupSheetSelector();
});
