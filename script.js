window.addEventListener("load", function() {
  function loadJSON(path, success, error){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (success){
            success(JSON.parse(xhr.responseText));
          }
        } else {
          if (error) {
            error(xhr);
          }
        }
      }
    };
    xhr.open("GET", path, true);
    xhr.send();
  }

  loadJSON('http://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=84fc26d21495396d52011cfbab701ec9&photoset_id=72157641873353803&format=json&media=photos&extras=url_m,description&nojsoncallback=1',
   function(data) {
    console.log(data);
    var output = Mustache.render("{{#photo}}<article id='photo_{{id}}' data-pid='{{id}}' data-original='{{url_m}}' title='{{title}}'><p>{{description._content}}</p></article>{{/photo}}", data.photoset);
    document.getElementById('w').innerHTML = output;

    processSlides();
   },
   function(xhr) { console.error(xhr); }
  );

  function processSlides() {
    // Start processing the slides
    articles = document.getElementsByTagName('article');

    // set the screen width
    w = document.getElementById('b').offsetWidth;
    document.getElementById('w').setAttribute('style', 'width:' + (w * articles.length) + 'px');

    for (index = 0; index < articles.length; ++index) {
      slide = articles[index];
      t = document.getElementById('photo_' + slide.dataset.pid);
      t.setAttribute('style', 'width:' + w +'px; background: url(' + slide.dataset.original + '); background-size: cover;');
    }
  }
});


