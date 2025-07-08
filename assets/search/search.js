(function () {
  // build the index
  var index = lunr(function () {
    this.field('title');
    this.field('body');
    this.ref('url');
  });

  // get the data
  var store = {};
  fetch('/search.json').then(function (response) {
    return response.json();
  }).then(function (data) {
    store = data.reduce(function (acc, cur) {
      acc[cur.url] = cur;
      return acc;
    }, {});
    data.forEach(function (doc) {
      index.add(doc);
    });
  });

  // get the elements
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');

  // add the event listener
  searchInput.addEventListener('keyup', function () {
    var query = this.value;

    if (query.length > 0) {
      searchResults.style.display = 'block';
      var results = index.search(query);
      var resultsHtml = '';

      if (results.length > 0) {
        results.forEach(function (result) {
          var item = store[result.ref];
          resultsHtml += '<li>';
          resultsHtml += '<a href="' + item.url + '">' + item.title + '</a>';
          resultsHtml += '<p>' + item.date + '</p>';
          resultsHtml += '</li>';
        });
      } else {
        resultsHtml = '<li>No results found.</li>';
      }
      searchResults.innerHTML = resultsHtml;
    } else {
      searchResults.style.display = 'none';
    }
  });
})();
