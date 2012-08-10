/**
 * @fileoverview media.js WinRTC wrapper.
 * @version 0.0.1
 * @supported Chrome 21 over.
 */
(function() {
  // initialize
  //-- cushion
  var URL = window.URL || window.webkitURL;
  var BlobBuilder = BlobBuilder || WebKitBlobBuilder || MozBlobBuilder || MSBlobBuilder;
  /**
   * capture from user media stream
   * @param {LocalMediaStream} stream
   * @param {Function} callback get capture image blob
   */
  function capture(stream, callback) {
    // initialize
    var video = document.createElement('video');
    // on play user media stream
    video.src = URL.createObjectURL(stream);
    video.autoplay = true;
    video.addEventListener('play', function() {
      // stream to canvas 2d image
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      // canvas to blob
      var dataURI = canvas.toDataURL('image/png');
      var byteString = atob(dataURI.split(',')[1]);
      var arrayBuffer = new ArrayBuffer(byteString.length);
      var intArray = new Uint8Array(arrayBuffer);
      for (var i = 0; i < byteString.length; i += 1) {
          intArray[i] = byteString.charCodeAt(i);
      }
      var bb = new BlobBuilder();
      bb.append(arrayBuffer);
      // call callback
      callback( bb.getBlob('image/png') );
      // close
      stream.stop();
      delete video;
      delete canvas;
    }, true);
  };

  window.capture = capture;

})();