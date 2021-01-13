
$(document).ready(function(){
    const client = new MeiliSearch({
        host: 'http://localhost:8080/search',
        apiKey: 'masterKey',
      })
      client.listIndexes().then(res => {
        console.log({ res });
      })

    $( "#search" ).keyup(function() {
        console.log("key pressed")
        console.log($( "#search" ).val())
        $("#results").empty()
        item = ''
        item += '<li class="py-2">'
            item += '<span><small class="text-muted">https://github.com/gitpod-io/gitpod</small></span>'
            item += '<h5><a href="#">gitpod-io/gitpod</a></h5>'
            item += '<span>Gitpod automates the provisioning of ready-to-code development environments.</span>'
            item += '<br/>'
            item += '<span><small class="text-muted">dev environment</small> <small class="text-muted">dev environment</small></span>'
        item += '</li>'
        $("#results").append(item);
    });
});