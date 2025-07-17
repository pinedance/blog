(function () {
  // Create the store for looking up results
  var store = search_metadata.reduce(function (acc, cur) {
    acc[cur.url] = cur;
    return acc;
  }, {});

  // Build the lunr index
  var idx = lunr(function () {
    // this.use(lunr.ko); // Use Korean language support
    // this.use(lunr.zh); // Use Chinese language support
    this.use(lunr.ngram);
    // this.use(lunr.multiLanguage('en', 'zh', 'ko', 'ja'));
    // this.use(lunr.multiLanguage('en', 'ngram'));
    // this.use(lunr.multiLanguage('en', 'ngram', 'ko'));
    this.ref('url');
    this.field('title');
    this.field('body');

    search_metadata.forEach(function (doc) {
      this.add(doc);
    }, this);
  });

  // Get elements
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var searchClear = document.getElementById('search-clear');

  function clearSearch() {
    searchInput.value = '';
    searchResults.style.display = 'none';
    searchClear.style.display = 'none';
  }

  // Add the event listeners
  searchInput.addEventListener('keyup', function (e) {
    // Listen for escape key
    if (e.key === 'Escape' || e.keyCode === 27) {
      clearSearch();
      return;
    }

    var query = this.value;

    if (query.length === 0) {
      clearSearch();
      return;
    }

    searchClear.style.display = 'block';
    searchResults.style.display = 'block';
    var results = idx.search(query);
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
  });

  searchClear.addEventListener('click', function () {
    clearSearch();
    searchInput.focus();
  });
})();