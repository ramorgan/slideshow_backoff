window.addEventListener("load", function() {
  articles = document.getElementsByTagName('article');

  for (index = 0; index < articles.length; ++index) {
    slide = articles[index];
    el = slide.dataset.original
    console.log(el)
  }
});
