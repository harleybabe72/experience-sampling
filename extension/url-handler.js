
var urlHandler = {};  // Namespace

/**
 * In most cases, we don't want to display a full URL with a path.
 * @param {inputUrl} The original url.
 * @returns A more minimized version of the url.
 */
urlHandler.GetMinimalUrl = function(inputUrl) {
  var scheme = '';
  var hostport = '';
  var anchor = document.createElement('a');
  anchor.href = inputUrl;

  if (anchor.protocol === 'chrome-extension:') {
    // The anchor interprets some urls without schemes as relative to
    // chrome-extension:. If that happens, turn it into a https url instead.
    anchor.href = 'https://' + inputUrl;
  }
  if ((anchor.protocol === 'file:' || anchor.protocol === ':') && 
      (inputUrl.substring(0, 6).indexOf(':') == -1)) {
    // If the protocol is empty, it might be missing the scheme. Add a scheme
    // and then try again.
    inputUrl = 'http://' + inputUrl;
    anchor.href = inputUrl;
  }

  if (anchor.protocol !== 'http:' && anchor.protocol !== 'https:')
    scheme = anchor.protocol + '//';

  return scheme + anchor.host;
};

/**
 * Check whether a URL corresponds to a domain known to produce a green lock.
 * @param {String} url The url of interest. Should be a valid HTTPS url.
 * @returns {bool} True if a url is from a green lock site.
 */
urlHandler.IsGreenLockSite = function(url) {
  // Reject a site unless it's a domain known to produce a green lock.
  var greenLockSites = [
    /^google\..\\*/,
    /^facebook\.com/,
    /^mail\.ru/,
    /^pinterest\.com/,
    /^baidu\.com/,
    /^ask\.com/,
    /^stackoverflow\.com/,
    /^twitter\.com/,
    /^linkedin\.com/,
    /^live\.com/,
    /^bing\.com/,
    /^tumblr\.com/,
    /^imgur\.com/,
    /^instagram\.com/,
    /^wordpress\.com/,
    /^yahoo\.com/,
    /^wikipedia\.org/,
    /^wikimedia\.org/,
    /^paypal\.com/,
    /^vk\.com/,
    /\\*\.google\..\\*/,
    /\\*\.facebook\.com/,
    /\\*\.mail\.ru/,
    /\\*\.pinterest\.com/,
    /\\*\.baidu\.com/,
    /\\*\.ask\.com/,
    /\\*\.stackoverflow\.com/,
    /\\*\.twitter\.com/,
    /\\*\.linkedin\.com/,
    /\\*\.live\.com/,
    /\\*\.bing\.com/,
    /\\*\.tumblr\.com/,
    /\\*\.imgur\.com/,
    /\\*\.instagram\.com/,
    /\\*\.wordpress\.com/,
    /\\*\.yahoo\.com/,
    /\\*\.wikipedia\.org/,
    /\\*\.wikimedia\.org/,
    /\\*\.paypal\.com/,
    /\\*\.vk\.com/
  ];
  var shortUrl = urlHandler.GetMinimalUrl(url);
  var found = false;
  for (var i = 0; i < greenLockSites.length; i++) {
    if (shortUrl.match(greenLockSites[i])) {
      found = true;
      break;
    }
  }
  if (!found) return false;

  // Reject subdomains/directories of whitelisted sites with mixed content.
  var blacklist = [
    /^https\:\/\/images\.google\.com\/?\\*/,
    /^https\:\/\/www\.bing\.com\/images\\*/
  ];
  for (var i = 0; i < blacklist.length; i++) {
    if (url.match(blacklist[i]))
      return false;
  }

  return true;
};
