(function () {
  var serviceHost = window._ax_ws_host_ || 'http://ws-axax.rhcloud.com';

  function getHTMLOfSelection() {
    var range;
    if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      return range.htmlText;
    }
    else if (window.getSelection) {
      var selection = window.getSelection();
      if (selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
        var clonedSelection = range.cloneContents();
        var div = document.createElement('div');
        div.appendChild(clonedSelection);
        return div.innerHTML;
      }
      else {
        return '';
      }
    }
    else {
      return '';
    }
  }

  function docHtml() {
    var i, l, attr,
      html = '<!DOCTYPE html><html',
      doc = document.documentElement,
      preTags = doc.getElementsByTagName('pre'),
      head = document.getElementsByTagName("html")[0],
      attrs = head ? head.attributes : [];

    for (i = 0, l = preTags.length; i < l; i++) {
      preTags[i].innerHTML = preTags[i].innerHTML.replace(/ /g, '&nbsp;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\n/g, '--ax-newline--');
    }
    for (i = 0, l = attrs.length; i < l; i++) {
      attr = attrs.item(i);
      html += ' ' + attr.nodeName + '="' + attr.nodeValue + '"';
    }
    html += '>' + doc.innerHTML + "</html>";
    html = html.replace(/[\s\t\r\n]+/g, ' ');
    html = html.replace(/<!--.*?-->/g, '');
    html = html.replace(/--rdb-newline--/g, "\n");
    for (i = 0; i < preTags.length; i++) {
      preTags[i].innerHTML = preTags[i].innerHTML.replace(/--ax-newline--/g, "\n");
    }
    html = html.replace(/<script\b[^>]*>(.*?)<\/script\s*>/gi, '');
    return html;
  }

  function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }

  var sendPage = function (page) {
    if (!page.type)
      page.type = 'text/html;charset=utf-8';
    else
      page.type = page.type.match(/^[^;]+/) + ';charset=utf-8';

    var metadata = {
      contentType: page.type,
      customMetadata : {
        'title' : page.title,
        'url' : page.url
      }
    };


    var key = firebase.database().ref().child('ws').push().key;
    firebase.storage().ref().child('ws/' + key).putString(page.html, 'raw', metadata).then(function (snapshot) {
      
      firebase.database().ref('ws/' + key).set({
        title: page.title,
        url: page.url,
        downloadURL:  snapshot.downloadURL,
        totalBytes: snapshot.totalBytes
      });

      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log(snapshot.metadata);
      var url = snapshot.metadata.downloadURLs[0];
      console.log('File available at', url);
      window.location.assign(url)
      // var win = window.open(url, '_blank');
      // win.focus();
    }).catch(function (error) {
      console.error('Upload failed:', error);
    });
  };

  var showLoad = function () {
    if (document.getElementById('_____ax_____')) return;
    var div = document.createElement('div'),
      img = document.createElement('img');
    img.setAttribute('src', serviceHost + 'img/wait.gif');
    div.appendChild(img);
    div.setAttribute('style', 'position: fixed; left: 50%; top: 0; margin-left: -24px; padding: 8px; background: rgba(255,255,255,0.1);');
    div.id = '_____ax_____';
    document.body.appendChild(div);
  };

  var processPage = function () {
    try {
      var s, i,
        scripts = document.getElementsByTagName('script'),
        url = location.href,
        head = document.getElementsByTagName('head')[0],
        title = document.getElementsByTagName("title")[0],
        doc = document.documentElement,
        sa = 'setAttribute';

      //remove script
      for (i = scripts.length - 2; i >= 0; --i) {
        s = scripts[i];
        s.parentElement.removeChild(s);
      }


      title = title ? title.text : '';
      s = '<!DOCTYPE html><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">' +
        '<base href="' + (location.origin || location.host) + location.pathname + '">' +
        '<div style="background:#fff;border:1px solid #999;margin:-1px -1px 0;padding:0;z-index: 32000;">' +
        '<div style="background:#ddd;border:1px solid #999;color:#000;font:13px arial,sans-serif;font-weight:normal;margin:0px;padding:2px;text-align:left"> Page: <a href="' + url + '" style="text-decoration:underline;color:#00c">' + title + '</a><div style="float:right"><a href="' + url + '" style="text-decoration:underline;color:#00c">Текстовая версия</a></div>' +
        '</div></div><div style="position:relative">'

      var selHtml = getHTMLOfSelection();
      if (selHtml) {
        document.body.innerHTML = selHtml;
      }
      var html = s + docHtml();
      document.title = "Process... " + document.title;

      try {
        sendPage({
          url: url,
          type: 'text/html;charset=utf-8',
          html: html,
          title: title
        });
      }
      catch (e) {
        alert('Error: ' + e + '\nPlease, try again');
      }
      document.title = document.title.substring(11);
    }
    catch (e) {
      alert('Error: ' + e + '\nPlease, try again');
    }
  };

  var showPage = function () {
    //        showLoad();
  };
  // check on
  if (location.href.indexOf(serviceHost) >= 0) {
    //        showPage();
  }
  else {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.onload = function () {
        // remote script has loaded
        console.log('firebase', typeof (firebase))
        var config = {
          apiKey: "AIzaSyDc_LHRrNRto4BV23Do8NHsqNdAt26Fz10",
          authDomain: "data-ab752.firebaseapp.com",
          databaseURL: "https://data-ab752.firebaseio.com",
          storageBucket: "data-ab752.appspot.com",
          messagingSenderId: "141730081452"
        };

        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(function (user) {
          console.log('USER', user)
          if (user) {
            processPage();
          } else {
            firebase.auth().signInAnonymously()
              .then(function (error) {
              })
              .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/operation-not-allowed') {
                  alert('You must enable Anonymous auth in the Firebase Console.', 'Firebase');
                } else {
                  alert(errorMessage, 'Firebase')
                  console.error(error);
                }
              });
          }
        })

      };
      js.src = "https://www.gstatic.com/firebasejs/3.6.9/firebase.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'firebase-webshoot'));

  }
})();