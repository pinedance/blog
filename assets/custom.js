
// to apply prism
(function(){
  // var el = document.getElementsByTagName('code');
  var el = document.getElementsByClassName('highlight');
  // Loop the NodeList through
  for (var i = 0; i < el.length; i++) {
      el[i].classList.add('line-numbers');
  }
})()
