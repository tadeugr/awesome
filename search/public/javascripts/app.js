$(document).ready(function(){
    const client = new MeiliSearch({
        host: 'http://localhost:8080/search',
        apiKey: 'masterKey',
    })
    client.listIndexes().then(res => {
        console.log("MeiliSearch indexes:")
        console.log({ res });
    })

    $( "#search" ).keyup(function() {
        query = $( "#search" ).val()

        if (query.length < 3){
            return false;
        }

        $("#results").empty()

        request = $.ajax({
            url: "http://localhost:8080/search/indexes/awesome/search",
            type: "get",
            data: {"limit": 1000, "q": query},
            headers: {"X-Meili-API-Key": 'masterKey'},
        });
    
        request.done(function (response, textStatus, jqXHR){
            console.log("Search result:");
            console.log(response);

            $.each(response.hits, function(k, v) {
                item = ''
                item += '<li class="py-2">'
                    item += '<span><small class="text-muted">'+v.url+'</small></span>'
                    item += '<h5><a href="'+v.url+'" target="_blank">'+v.name+'</a></h5>'
                    item += '<span>'+v.description+'</span>'
                    item += '<br/>'
                    item += '<span>'
                    count = 0
                    len = v.tags.length
                    for (const tag of v.tags) {
                        separator = ""
                        if (count < len-1){
                            separator = " - "
                        }
                        item += '<small class="text-muted">'+tag+separator+'</small>'
                        count++
                    }
                    item += '</span>'
                item += '</li>'
                $("#results").append(item);
            });
        });
    
        request.fail(function (jqXHR, textStatus, errorThrown){
            console.error(
                "The following error occurred: "+
                textStatus, errorThrown
            );
            item = ''
            item += '<li class="py-2">Error. Check the logs.</li>'
            $("#results").append(item);
        });

        
    });
});