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
    var URL="http://api.eventful.com/json/events/search?app_key=5gPscV7SZB2jTK6n&q=music"

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
                title: 'We dont know what you want!',
                animation: false,
                footer: "input a band!",
                customClass: 'animated tada'
            });
        } else {
            $(".lyrics").hide();
            // a fucntion which will detect which information has been entered ,
            // which will be used to build the URL
            var parameter= getParameter();
            
            //once we have parameter, we can create Query URL 
            // Page sze is to limit only one event at a time
            queryURL='https://cors-anywhere.herokuapp.com/'+URL+parameter+"&page_size=10";
            console.log('queryURL eventful', queryURL);
            $.ajax({
                url: queryURL,
                method: 'GET',
                //   crossDomain: true,
                //   dataType: 'jsonp'
            }).then(function(response) { 
              $(".hide-show").show();
            console.log('response from eventful', JSON.parse(response));
            var res = JSON.parse(response);
            $("#picture").empty();
                
                for(var i=0;i<res.events.event.length;i++) {
                    var information=$("<div>");
                    information.addClass("text-center");
                    var result=res.events.event[i];               // result
                    
                    if(result.image!=null) {
                        var imgResponse=result.image.medium.url;
                        console.log(imgResponse);
                        var image=$("<img>");
                        image.attr("src",'https:' + imgResponse);
                        image.addClass("icon");
                        information.append(image);
                    }
                    //   $("#picture").append(image);}
                    //   $("#picture").append("Venue :" + result.venue_name);
                    var thelatitude = result.latitude;
                    console.log("the latitude is :", thelatitude);
                    var thelongitude = result.longitude;
                    console.log("the longitude is :", thelongitude);
            
                    var thecity = result.city_name;
                    var thecountry = result.country_name;
                    var thevenu = result.venue_name;
                    var thevenueadress = result.venue_address;

                    information.append("<br>");
                    information.append("Title : <strong>"+result.title+"</strong><br>");
                    information.append("venue : <strong>"+result.venue_name+"</strong><br>");
                    information.append("<span class='venue-address' data-lat='" + thelatitude + "' data-lon='" + thelongitude + "' data-venue='" + thevenu + "' data-url='" + result.url + "'>Address: " + thevenueadress + "</span><br>");
                    information.append("City  : <strong>"+result.city_name+"</strong><br>");
                    information.append("Country : <strong>"+result.country_name+"</strong><br>");
                    information.append("Date & Time : "+result.start_time+"<br>");
                    information.append("<hr class=\"bg-dark\">");
                    $("#picture").append(information); 
                } 
        });
    }});

    function getParameter() {
        //reading value from the form
        // these variables are already decalred on top *** GLOBAL Variable****
        artist=$("#artist-name").val().trim();
        location=$("#location").val().trim();
        date=$("#date").val();

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
        console.log('queryURL1', queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET',
            
        }).then(function(response) { 
            // console.log('response response', response);
            var res = JSON.parse(response);
            console.log('res', res);
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