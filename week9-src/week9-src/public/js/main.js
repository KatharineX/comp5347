$(document).ready(function(){
    $('#button').on('click', function(e){
        var parameters = {title: $('#title').val() };
        $.get('revisionajax/getLatest', parameters, function(result) {
            $('#results').html(result);
        });
    });
});
