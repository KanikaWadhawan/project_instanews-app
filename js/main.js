$(function () {
 
  const resFail = "<li>Sorry, something went terribly wrong</li>";
  const $loader = $(".loader-container");
  const $loadTime = 1000;
  const $target= "_blank";

  $('#select-menu').on('change', function (e) {
    e.preventDefault();
    
    const selected = $(this).val();
    if (selected !== '') {
      console.log('The value you picked is: ' + selected);
      $(".nyt-logo").addClass("active");
      loadArticles(selected);
    }
  });


  function loadArticles(selected) {
    const $selectedList = $(".selected-list");

    $selectedList.html("");
    
    $loader.fadeIn($loadTime);

    $.ajax({
      method: 'get',
      url: 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json?api-key=aH4FAhLkiG9ICtGxYuBVuGhjQviN4Geb'
    }).done(function (data) {
     
      $loader.fadeOut($loadTime);
      const results = data.results;

      const filteredResults = results.filter(function (article) {
        return article.multimedia.length;
      }).slice(0, 12);



     

      $.each(filteredResults, function (index, value) {
        
        $selectedList.append(`
              <li class="result-data">
              <a href ="${value.url}" target="${$target}" >
      <div class="bckg-img" style="background-image: url(${value.multimedia[4].url})">
      </div>
        <p class="abstract">${value.abstract}</p>
       
        </a>
      </li>
             ` )
      })
    }).fail(function () {
      $selectedList.append(resFail);
    }).always(function () {
     
    });
  }

});//end of document ready