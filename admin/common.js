function getTemplateAjax(path,domId,context) {
    var source;
    var template;
    $.ajax({
        url: path,
        cache: false,
        success: function(data) {
            source    = data;
            template  = Handlebars.compile(source);
            $('#'+domId).html(template(context));
        }               
    });         
}

function putAjaxData(url,body){
    return $.ajax({
            method: "PUT",
            url: url,
            contentType: 'application/json',
            headers: {Accept:'application/json'},
            data: JSON.stringify(body),
            cache: false
        });
}

function postAjaxData(url,body){
    return $.ajax({
            method: "POST",
            url: url,
            contentType: 'application/json',
            headers: {Accept:'application/json'},
            data: JSON.stringify(body),
            cache: false
        });
}

function deleteAjaxData(url){
    return $.ajax({
            method: "DELETE",
            url: url,
            cache: false
        });
}

function getAjaxData(url){
    return $.ajax({
            method: "GET",
            url: url,
            cache: false
        });
}

function getAPIUrl(view){
    var host = getAPIHost();
    if(view=='managequeue')
        return host + "queue";
    else if(view=='addqueue')
        return host + "queue";
    else
        return "";
}

function getAPIHost(){
    var host = "http://localhost:3000/api/";
    return host;
}

function objectifyForm(formArray) {//serialize data function

  var returnArray = {};
  for (var i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  return returnArray;
}

function submitForm(_id){
    var body = objectifyForm($('form').serializeArray());
    console.log(body);
    var geturl = getAPIHost() + 'queue';
    if(_id!="")
        geturl += '/'+_id;
    postAjaxData(geturl,body).done((data) => {
        console.log(data);
        if(data.success)
            location.href='index.html?view=managequeue';
        else
            $('#errorMsg').html(data.message);
        //getTemplateAjax(view+'.html','maincontent',context);
    });
    return false;
}

function deleteRow(_id){
    var geturl = getAPIHost() + 'queue';
    if(_id!="")
        geturl += '/'+_id;
    deleteAjaxData(geturl).done((data) => {
        console.log(data);
        if(data.success)
           location.href='index.html?view=managequeue';
        else
            $('#errorMsg').html(data.message);
        //getTemplateAjax(view+'.html','maincontent',context);
    });
}