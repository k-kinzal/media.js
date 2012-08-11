#Media.js
Media.js is WebRTC wrapper.

It's supperted Google Chrome version 21 over.

```javascript
// get permission
navigator.webkitGetUserMedia({video:true}, function(stream) {
    // allow permission
    // call capture
    capture(stream, function(blob) {
        // get blob and blob to image src
        //-- Webkit browser is window.webkitURL.createObjectURL
        document.querySelector('img').src = window.webkitURL.createObjectURL(blob);
    });
}, function(e) {
    // permission denied or not connect device
});
```

See is example [http://logn.in/example/media.js/index.html](http://logn.in/example/media.js/index.html)