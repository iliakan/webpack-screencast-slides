function init() {
  Reveal.initialize({
    controls: false,
    progress: false,
    history: true,
    center: false, // vertical centering
    rollingLinks: false,

    transition: 'none', // default/cube/page/concave/zoom/linear/none
    transitionSpeed: 'fast',
    backgroundTransition: 'none',  

    // Optional libraries used to extend on reveal.js
    dependencies: [{
        src: '/node_modules/reveal.js/plugin/markdown/marked.js',
        condition: function() {
          return !!document.querySelector('[data-markdown]');
        }
      }, {
        src: '/node_modules/reveal.js/plugin/markdown/markdown.js',
        condition: function() {
          return !!document.querySelector('[data-markdown]');
        }
      }, {
        src: '/node_modules/reveal.js/plugin/highlight/highlight.js',
        async: true,
        callback: function() {
          hljs.initHighlightingOnLoad();
        }
      }, {
        src: '/node_modules/reveal.js/plugin/zoom-js/zoom.js',
        async: true,
        condition: function() {
          return !!document.body.classList;
        }
      }, {
        src: '/node_modules/reveal.js/plugin/notes/notes.js',
        async: true,
        condition: function() {
          return !!document.body.classList;
        }
      }
    ]
  });

  document.addEventListener("fragmentshown", function(e) {
    setCurrentFragment(e.fragment)
  }, false);
  document.addEventListener("fragmenthidden", function(e) {
    setCurrentFragment(e.fragment)
  }, false);

  Array.from(document.querySelectorAll('.fragments > li')).forEach(
    elem => elem.classList.add('fragment')
  );
  var fragments = document.querySelector('.fragments');

  if (fragments) {
    fragments.insertAdjacentHTML("beforeEnd", '<li class="fragment" hidden></li>');
  }
}


function setCurrentFragment(fragment) {

  var section = fragment.closest('section');

  var fragmentCurrent = section.querySelector('.fragment-current');

  if (fragmentCurrent) {
    fragmentCurrent.classList.remove('fragment-current');
  }

  var visible = section.querySelectorAll('.visible');
  if (visible.length) {
    visible[visible.length - 1].classList.add('fragment-current');
  }
}

var path = document.location.pathname + "index.html";

fetch(path)
  .then(res => {
    if (res.status != 200) {
      throw new Error(`URL ${path} status ${res.status}`);
    }
    return res.text()
  })
  .then(content => {
    content = content.replace(/`(.*?)`/gim, '<code>$1</code>');
    document.querySelector('#main').innerHTML = content;
    setTimeout(init, 0);
  })
  .catch(function(err) {
    alert(err);
  });

