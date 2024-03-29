// Add custom play button and custom thumbnail image
/**
 * Get videos on load
 */
(function () {
  getVideos();
})();

/**
 * For each video player, create custom thumbnail or
 * use Youtube max resolution default thumbnail and create
 * iframe video.
 */
function getVideos() {
  var v = document.getElementsByClassName("youtube-player");
  for (var n = 0; n < v.length; n++) {
    var p = document.createElement("div");
    var id = v[n].getAttribute("data-id");

    var placeholder = v[n].hasAttribute("data-thumbnail")
      ? v[n].getAttribute("data-thumbnail")
      : "";

    if (placeholder.length) p.innerHTML = createCustomThumbail(placeholder);
    else p.innerHTML = createThumbail(id);

    v[n].appendChild(p);
    p.addEventListener("click", function () {
      var parent = this.parentNode;
      createIframe(parent, parent.getAttribute("data-id"));
    });
  }
}

/**
 * Get Youtube default max resolution thumbnail
 * @param {string} id The Youtube video id
 * @return {string} The HTML containing the <img> tag
 */
function createThumbail(id) {
  return (
    '<img class="youtube-thumbnail" src="../img/video-thumbnail-image.png" alt="Youtube Preview"><div class="youtube-play-btn"></div>'
  );
}

/**
 * Create and load iframe in Youtube container
 **/
function createIframe(v, id) {
  var iframe = document.createElement("iframe");
  console.log(v);
  iframe.setAttribute(
    "src",
    `//www.youtube.com/embed/${id}?autoplay=1&color=white&autohide=2&modestbranding=1&border=0&wmode=opaque&enablejsapi=1&showinfo=0&rel=0`
  );
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("class", "youtube-iframe");
  v.firstChild.replaceWith(iframe);
}

/** Pause video on modal close **/
$("#video-modal").on("hidden.bs.modal", function (e) {
  $(this).find("iframe").remove();
});

/** Pause video on modal close **/
$("#video-modal").on("show.bs.modal", function (e) {
  getVideos();
});
