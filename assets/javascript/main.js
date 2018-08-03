
// var http_request;
// http_request = new XMLHTTPRequest();
// http_request.onreadystatechange = function () { /* .. */ };
// http_request.open("POST", "https://sso.moxio.com");
// http_request.withCredentials = true;
// http_request.setRequestHeader("Content-Type", "application/json");
// http_request.send({ 'request': "authentication token" });

// Access-Control-Allow-Origin: http://api.eventful.com/rest/events/search?
// Access-Control-Allow-Credentials: true
// Access-Control-Allow-Methods: POST
// Access-Control-Allow-Headers: Content-Type 

    // var xhr = createCORSRequest('GET', url);
    // if (!xhr) {
    //     throw new Error('CORS not supported');
    // }

$(document).ready(function() {   
    var map = new L.map('mapid2').setView([0, 0], 12);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXJqdW5hbGFwc2Fwa290YSIsImEiOiJjampkdDlwYnkxNjV1M3dxa2cxdDZ5OXgwIn0.XkQ9e9ccEuhN0FV1pC6q3Q', {
        attribution: '',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiYXJqdW5hbGFwc2Fwa290YSIsImEiOiJjampkdDlwYnkxNjV1M3dxa2cxdDZ5OXgwIn0.XkQ9e9ccEuhN0FV1pC6q3Q'
    }).addTo(map);


    $("#mapid2").hide();
    $(".lyrics").hide();

    // Basic URL with application-key for search 
    var eventURL="http://api.eventful.com/json/events/search?app_key=5gPscV7SZB2jTK6n&q=music"

    // List of some global variables!!
    var queryURL="";  // place holder for Actual Query
    var artist="";      // place holder for artist name
    var location="";    // place holder for event locaton
    var date="";        // place holder for date

    // When user enters the information and clicks the button 
    $("#picture").empty();

    $('#sendform').click(function(event) { 
        event.preventDefault();
        if ($("#artist-name").val() == "" && $("#location").val() == "" && $("#date").val() == "" ) {
            console.log('swal runs')
            swal({
                title: 'Please input at least one of search words!!',
                animation: false,
                footer: "Need any input :)",
                customClass: 'animated tada'
            });
        } else {

            $(".lyrics").hide();
            // a fucntion which will detect which information has been entered ,
            // which will be used to build the URL
            var parameter= getParameter();
            // var apiKey = 'VGmgGkmbkTMtXhHH';////API KEY
            var apiKey = 'app_key=5gPscV7SZB2jTK6n&q=music';
            
            //once we have parameter, we can create Query URL 
            // Page sze is to limit only one event at a time
            // queryURL='https://cors-anywhere.herokuapp.com/'+URL+parameter+"&page_size=10";
            queryURL = 'http://api.eventful.com/json/events/search?' + apiKey +'&' + parameter;
            
            console.log('queryURL eventful', queryURL);




            $.ajax({
                // The 'type' property sets the HTTP method.
                // A value of 'PUT' or 'DELETE' will trigger a preflight request.
                dataType: 'jsonp',
                // The URL to make the request to.
                url: queryURL,
                jsonpCallback: 'logResults',
                // The 'contentType' property sets the 'Content-Type' header.
                // The JQuery default for this property is
                // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
                // a preflight. If you set this value to anything other than
                // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
                // you will trigger a preflight request.
                contentType: 'text/plain',
                
              
                success: function(data) {
                    console.log('JSONP SUCCESS!!!');
                    console.log(data);
                    console.log(data.events.event[1]);
                  // Here's where you handle a successful response.
                    $(".hide-show").show();
                    console.log('response from eventful', data.events.event);
                    $("#picture").empty();

                    createEventPost(data.events.event);
                
                },
              
                error: function(e) {
                    console.log("JSONP NOT SUCCEss ;( :( :(,", e, queryURL)
                  // Here's where you handle an error response.
                  // Note that if the error was due to a CORS issue,
                  // this function will still fire, but there won't be any additional
                  // information about the error.
                }
            });


    
        //     $.ajax({
        //         url: queryURL,
        //         // method: 'GET',
        //         //   crossDomain: true,
        //         //   dataType: 'jsonp'
                
        //     }).then(function(response) { 
        //       $(".hide-show").show();
        //     console.log('response from eventful', JSON.parse(response));
        //     var res = JSON.parse(response);
        //     $("#picture").empty();
                
            
        //         for(var i = 0; i < res.events.event.length; i++) {
        //             var postCard = $("<div id='" + post + i + "'>");
        //             postCard.addClass("post-card");
        //             var result=res.events.event[i];               // result
        //             console.log('This part is running')
                    
        //             if(result.image!=null) {
        //                 var imgResponse = result.image.medium.url;
        //                 console.log(imgResponse);
        //                 var image = $("<div>");
        //                 image.addClass("post-head");

        //                 image.css("background-image", 'url(+ "https:" + imgResponse)');
        //                 image.addClass("icon");
        //                 // postCard.append(image);
        //                 // image.appendTo('.post-card');
        //                 $('#post'+i).prepend(image);
        //             }
        //             //   $("#picture").append(image);}
        //             //   $("#picture").append("Venue :" + result.venue_name);
        //             var thelatitude = result.latitude;
        //             console.log("the latitude is :", thelatitude);
        //             var thelongitude = result.longitude;
        //             console.log("the longitude is :", thelongitude);
            
        //             // var thecity = result.city_name;
        //             // var thecountry = result.country_name;
        //             // var thevenu = result.venue_name;
        //             // var thevenueadress = result.venue_address;

        //             var context = $('div');
        //             context.addClass('post-body');
                    
        //             var title = $('<p>TiTle: ' + result.title + '</p>');
        //             var venue = $('<p>Venue: ' + result.venue_name + '</p>');
        //             var city = $('<p>City: ' + result.city_name + '</p>');
        //             var date = $('<p>Date & Time: ' + result.start_time + '</p>');
        //             // var title = $('<p>TiTle: ' + result.title + '</p>');
        //             var eventMap = $("<p class='venue-address' data-lat='" + thelatitude + "' data-lon='" + thelongitude + "' data-venue='" + thevenu + "' data-url='" + result.url + "'>Address: " + thevenueadress + "</p><br>");
                    
        //             context.append(title, venue, city, date, eventMap);

        //             console.log("The date and time returned from api is: " + result.start_time);

        //             // postCard.append(context);
        //             // context.appendTo('.post-card')

        //             $('#post'+i).prepend(context);
        //             $('#event-posts').append(postCard);

        //             // information.append("Title : <strong>"+result.title+"</strong><br>");
        //             // information.append("venue : <strong>"+result.venue_name+"</strong><br>");
                    
        //             // information.append("City  : <strong>"+result.city_name+"</strong><br>");
        //             // // information.append("Country : <strong>"+result.country_name+"</strong><br>");
        //             // information.append("Date & Time : "+result.start_time+"<br>");
        //             // information.append("<hr class=\"bg-dark\">");
        //             // $("#picture").append(information); 
        //         } 
        // });
    }});

    function getParameter() {
        //reading value from the form
        // these variables are already decalred on top *** GLOBAL Variable****
        artist = $("#artist-name").val().trim();
        location = $("#location").val().trim();
        date = $("#date").val();

        // a local variable Parameter
        var parameter="";

        //clearing all three fields
        $("#artist-name").val("");
        $("#location").val("");
        $("#date").val("");

            if(artist!=="") {
                parameter=parameter+"&keywords="+artist;
                musixmatch();
            }
            if(location!=="") {
                parameter=parameter+"&l="+location;
            }
            if(date!=="") {
                parameter=parameter+"&date="+date;
            }
            return parameter;
    }

    function musixmatch() {
        var url="http://api.musixmatch.com/ws/1.1/track.search?apikey=ca4466429fdf97191afe3158735bd7ef&q_artist=";
        var queryURL="https://cors-anywhere.herokuapp.com/"+url+artist+"&page_size=1&page=1&s_track_rating=desc";
        // console.log('queryURL1', queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET',
            
        }).then(function(response) { 
            // console.log('response response', response);
            var res = JSON.parse(response);
            // console.log('res', res);
                if(res.message.body.track_list[0].track.has_lyrics==1) {
                    $(".artist").empty();
                    $(".artist").append(res.message.body.track_list[0].track.artist_name);
                    var track_id=res.message.body.track_list[0].track.track_id;
                    console.log('track id:',track_id);
                    var qurl="https://cors-anywhere.herokuapp.com/"+
                    "http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=ca4466429fdf97191afe3158735bd7ef&track_id="+
                    track_id;
                    $.ajax({
                        url: qurl,
                        method: 'GET',
                    }).then(function(response) { 
                        var res = JSON.parse(response);
                        console.log('lyrics pull:',res);
                        $(".lyrics").show();
                        $(".lyric").empty();
                        $(".lyric").append(res.message.body.lyrics.lyrics_body);
                    });

                }      
        });
            //return 0;
    }

    function createEventPost(dataArray) {
        for (var i = 0; i < dataArray.length; i++) {
            var postCard = $("<div id='post" + i + "'>");
            postCard.addClass("post-card");
            var post = dataArray[i];               // result 
            console.log('The createEventPost function is running');
            console.log('The each event info: ' + post);
            
            if(post.image!=null) {
                var imgResponse = post.image.medium.url;
                console.log(imgResponse);
                var image = $("<div>");
                image.addClass("post-head");

                image.css("background-image", 'url('+imgResponse+')');
                // image.addClass("icon");
                // postCard.append(image);
                // image.appendTo('.post-card');
                postCard.append(image);
            }
            //   $("#picture").append(image);}
            //   $("#picture").append("Venue :" + post.venue_name);
            var thelatitude = post.latitude;
            console.log("the latitude is :", thelatitude);
            var thelongitude = post.longitude;
            console.log("the longitude is :", thelongitude);
    
            // var thecity = post.city_name;
            // var thecountry = post.country_name;
            var thevenu = post.venue_name;
            var thevenueadress = post.venue_address;

            var context = $('<div>');
            context.addClass('post-body');
            
            var title = $('<p>TiTle: ' + post.title + '</p>');
            var venue = $('<p>Venue: ' + post.venue_name + '</p>');
            var city = $('<p>City: ' + post.city_name + '</p>');
            var date = $('<p>Date & Time: ' + post.start_time + '</p>');
            // var title = $('<p>TiTle: ' + post.title + '</p>');
            var eventMap = $("<p class='venue-address' data-lat='" + thelatitude + "' data-lon='" + thelongitude + "' data-venue='" + thevenu + "' data-url='" + post.url + "'>Address: " + thevenueadress + "</p><br>");
            
            context.append(title, venue, city, date, eventMap);

            console.log("The date and time returned from api is: " + post.start_time);

            // postCard.append(context);
            // context.appendTo('.post-card')

            postCard.prepend(context);
            $('#event-posts').append(postCard);

            // information.append("Title : <strong>"+post.title+"</strong><br>");
            // information.append("venue : <strong>"+post.venue_name+"</strong><br>");
            
            // information.append("City  : <strong>"+post.city_name+"</strong><br>");
            // // information.append("Country : <strong>"+post.country_name+"</strong><br>");
            // information.append("Date & Time : "+post.start_time+"<br>");
            // information.append("<hr class=\"bg-dark\">");
            // $("#picture").append(information); 
        } 
    }
    $("body").on('click', '.venue-address', function () {
        $("#mapid2").show();
        console.log('address was clicked', $(this));
        var long = $(this).data('lon');
        var lat = $(this).data('lat');
        var venue = $(this).data('venue');
        var url = $(this).data('url');
        $("#mapid2").get(0).scrollIntoView();
        map.setView([lat, long], 12);
        L.marker([lat,long]).addTo(map);
    })
});

