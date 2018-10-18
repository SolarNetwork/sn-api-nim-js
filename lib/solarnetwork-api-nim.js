// https://github.com/SolarNetwork/sn-api-nim-js Version 0.1.0-dev.0. Copyright 2018 Matt Magoffin.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('solarnetwork-api-core')) :
	typeof define === 'function' && define.amd ? define(['exports', 'solarnetwork-api-core'], factory) :
	(factory((global.sn = global.sn || {}),global.sn));
}(this, (function (exports,solarnetworkApiCore) { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/** @module domain */

/**
 * A grouping of image infos, to support a hierarchy of images.
 */
var SolarNodeImageGroup = function () {
  /**
   * Constructor.
   *
   * @param {string} componentId the full group component ID
   * @param {string} componentName the last component from the component ID
   */
  function SolarNodeImageGroup(componentId, componentName) {
    classCallCheck(this, SolarNodeImageGroup);

    /**
     * The full group component ID.
     *
     * @type {string}
     * @readonly
     */
    this.componentId = componentId;

    /**
     * The last component from the component ID.
     *
     * @type {string}
     * @readonly
     */
    this.componentName = componentName;

    /**
     * The items of this group.
     *
     * @type {module:domain~SolarNodeImageInfo[]}
     * @readonly
     */
    this.items = [];

    /**
     * The child groups of this group.
     *
     * @type {module:domain~SolarNodeImageGroup[]}
     * @readonly
     */
    this.groups = [];

    if (this.constructor === SolarNodeImageGroup) {
      Object.freeze(this);
    }
  }

  /**
   * Add an image to this group.
   *
   * @param {module:domain~SolarNodeImageInfo} image the image to add
   * @returns {module:domain~SolarNodeImageGroup} this object
   */


  createClass(SolarNodeImageGroup, [{
    key: "addItem",
    value: function addItem(image) {
      this.items.push(image);
      return this;
    }

    /**
     * Add another group as a child of this group.
     *
     * @param {module:domain~SolarNodeImageGroup} group the group to add
     * @returns {module:domain~SolarNodeImageGroup} this object
     */

  }, {
    key: "addGroup",
    value: function addGroup(group) {
      this.groups.push(group);
      return this;
    }

    /**
     * Get this object as a standard JSON encoded string value.
     *
     * @return {string} the JSON encoded string
     */

  }, {
    key: "toJsonEncoding",
    value: function toJsonEncoding() {
      return JSON.stringify(this);
    }
  }]);
  return SolarNodeImageGroup;
}();

/** @module domain */

var LOCALE_COMPARE_OPTIONS = Object.freeze({
  sensitivity: "base",
  numeric: true
});

/**
 * An immutable NIM image info object.
 */

var SolarNodeImageInfo = function () {
  /**
   * Constructor.
   *
   * @param {string} id a unique identifier for this image
   * @param {string} sha256 hex-encoded SHA-256 digest of the image content
   * @param {number} contentLength the content length of the image content, in bytes
   * @param {string} uncompressedSha256 a hex-encoded SHA-256 digest of the image contents when uncompressed
   * @param {number} uncompressedContentLength the size of the image contents when uncompressed, in bytes
   */
  function SolarNodeImageInfo(id, sha256, contentLength, uncompressedSha256, uncompressedContentLength) {
    classCallCheck(this, SolarNodeImageInfo);

    /**
     * A unique identifier for this image.
     *
     * @type {string}
     * @readonly
     */
    this.id = id;

    /**
     * A hex-encoded SHA-256 digest of the image content.
     *
     * @type {string}
     * @readonly
     */
    this.sha256 = sha256;

    /**
     * The content length of the image content, in bytes.
     *
     * @type {number}
     * @readonly
     */
    this.contentLength = contentLength;

    /**
     * A hex-encoded SHA-256 digest of the image contents when uncompressed.
     *
     * @type {string}
     * @readonly
     */
    this.uncompressedSha256 = uncompressedSha256;

    /**
     * The size of the image contents when uncompressed, in bytes.
     *
     * @type {number}
     * @readonly
     */
    this.uncompressedContentLength = uncompressedContentLength;

    if (this.constructor === SolarNodeImageInfo) {
      Object.freeze(this);
    }
  }

  /**
   * Get this object as a standard JSON encoded string value.
   *
   * @return {string} the JSON encoded string
   */


  createClass(SolarNodeImageInfo, [{
    key: "toJsonEncoding",
    value: function toJsonEncoding() {
      return JSON.stringify(this);
    }

    /**
     * Parse a JSON string into a {@link module:domain~SolarNodeImageInfo} instance.
     *
     * The JSON must be encoded the same way {@link module:domain~SolarNodeImageInfo#toJsonEncoding} does.
     *
     * @param {string|Object} json the JSON to parse, or a parsed JSON object
     * @returns {module:domain~SolarNodeImageInfo} the session instance
     */

  }], [{
    key: "fromJsonEncoding",
    value: function fromJsonEncoding(json) {
      var args = [];
      if (json) {
        var obj = typeof json === "string" ? JSON.parse(json) : json;
        args.push(obj.id || "");
        args.push(obj.sha256 || "");
        args.push(obj.contentLength || 0);
        args.push(obj.uncompressedSha256 || "");
        args.push(obj.uncompressedContentLength || 0);
      }
      return new (Function.prototype.bind.apply(SolarNodeImageInfo, [null].concat(args)))();
    }

    /**
     * Compare two `SolarNodeImageInfo` objects based on their IDs.
     *
     * The `id` values are compared in a case-insensitive manner, using a natural number ordering.
     *
     * @param {SolarNodeImageInfo} l the left-hand object to compare
     * @param {SolarNodeImageInfo} r the right-hand object to compare
     * @returns {number} < `0` if `l` sorts before `r`, > `0` if `l` sorts after `r`, or `0` if `l` and `r` sort equally
     */

  }, {
    key: "compareById",
    value: function compareById(l, r) {
      var lId = l ? l.id : "";
      var rId = r ? r.id : "";
      return lId.localeCompare(rId, undefined, LOCALE_COMPARE_OPTIONS);
    }

    /**
     * Take an array of `SolarNodeImageInfo` objects and split them into a hierarchy based on
     * the components of their IDs.
     *
     * The ID components are derived by splitting the `id` values on a `-` (dash) character.
     * They are then grouped going from left to right by component.
     *
     * @param {SolarNodeImageInfo[]} imageList the image infos to get a hierarchy for
     * @returns {module:domain~SolarNodeImageGroup[]} the hierarchy as a list of groups
     */

  }, {
    key: "idComponentGroups",
    value: function idComponentGroups(imageList) {
      var sortedImageList = Array.isArray(imageList) ? imageList.slice() : [];
      sortedImageList.sort(SolarNodeImageInfo.compareById);
      var rootGroups = [];
      var groupMap = {};

      /**
       * Get a cached group by ID.
       * @param {string} id the ID of the group to get
       * @returns {SolarNodeImageGroup} the group, or `undefined`
       */
      function getGroup(id) {
        for (var oneId in groupMap) {
          if (oneId.localeCompare(id, undefined, LOCALE_COMPARE_OPTIONS) === 0) {
            return groupMap[oneId];
          }
        }
        return undefined;
      }

      for (var i = 0, len = sortedImageList.length; i < len; i += 1) {
        var image = sortedImageList[i];
        var groupIdComponents = image.id.split("-").slice(0, -1);
        var groupComponentId = groupIdComponents.join("-").toLowerCase();
        var group = getGroup(groupComponentId);
        if (group === undefined) {
          for (var j = 0, _len = groupIdComponents.length; j < _len; j += 1) {
            var componentId = groupIdComponents.slice(0, j + 1).join("-").toLowerCase();
            var parentGroup = getGroup(componentId);
            if (!parentGroup) {
              parentGroup = new SolarNodeImageGroup(componentId, groupIdComponents[j]);
              groupMap[componentId] = parentGroup;
              if (group !== undefined) {
                group.addGroup(parentGroup);
              }
              if (j === 0) {
                rootGroups.push(parentGroup);
              }
            }
            group = parentGroup;
          }
        }
        // group _should_ be set here
        if (group) {
          group.addItem(image);
        }
      }
      return rootGroups;
    }
  }]);
  return SolarNodeImageInfo;
}();

/** @module net */

/** The NIM default path. */
var NimDefaultPath = "/solarnode-image-maker";

/** The {@link UrlHelper} parameters key for the NIM path. */
var NimPathKey = "nimPath";

/** The NIM REST API path. */
var NimApiPathV1 = "/api/v1";

/** An {@link UrlHelper} parameter key for a NIM session key. */
var NimSessionKey = "nimSessionKey";

/**
 * Create a NimUrlHelperMixin class.
 *
 * @exports net
 * @param {UrlHelper} superclass the UrlHelper class to mix onto
 * @return {module:net~NimUrlHelperMixin} the mixin class
 */
var NimUrlHelperMixin = function NimUrlHelperMixin(superclass) {
  return (
    /**
     * A mixin class that adds NIM specific support to {@link UrlHelper}.
     *
     * @mixin
     * @alias module:net~NimUrlHelperMixin
     */
    function (_superclass) {
      inherits(_class, _superclass);

      /**
       * Constructor.
       *
       * @param {*} args any number of arguments, but the first argument is assumed to be either an {@link Environment}
       *                 instance or a simple object that serves as the NIM environment
       */
      function _class() {
        var _ref;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        classCallCheck(this, _class);

        var env = args && args[0] ? args[0] instanceof solarnetworkApiCore.Environment ? args[0] : new solarnetworkApiCore.Environment(args[0]) : new solarnetworkApiCore.Environment({
          tls: true,
          host: "apps.solarnetwork.net",
          port: 443,
          nimPath: NimDefaultPath
        });
        if (!args) {
          args = [];
        }
        args[0] = env;
        return possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(toConsumableArray(args))));
      }

      /**
       * Get the base URL to the NIM v1 REST API.
       *
       * The returned URL uses the configured environment to resolve the `hostUrl` and the `nimPath`
       * context path.
       *
       * @returns {string} the base URL to NIM
       */


      createClass(_class, [{
        key: "baseUrl",
        value: function baseUrl() {
          var path = this.env(NimPathKey) || NimDefaultPath;
          return this.hostUrl() + path + NimApiPathV1;
        }

        /**
         * A NIM session key.
         *
         * Configuring this value is a convenient way to avoid having to pass the key to many of the
         * `*Url` methods that require this value.
         *
         * @type {string}
         */

      }, {
        key: "pingUrl",


        /**
         * Generate a URL for the "ping" health test URL.
         *
         * @returns {string} the URL
         */
        value: function pingUrl() {
          return this.baseUrl() + "/ping";
        }

        /**
         * Generate a URL for authorizing a new NIM session.
         *
         * @returns {string} the URL
         */

      }, {
        key: "authorizeSessionUrl",
        value: function authorizeSessionUrl() {
          return this.baseUrl() + "/images/authorize";
        }

        /**
         * Generate a URL for listing the available base images.
         *
         * @returns {string} the URL
         */

      }, {
        key: "listBaseImagesUrl",
        value: function listBaseImagesUrl() {
          return this.baseUrl() + "/images/infos";
        }

        /**
         * Generate a URL for creating a custom image.
         *
         * @param {string}  imageId the ID of the base image to customize
         * @param {string} [sessionKey] the session key returned from a call to `/images/authorize`; if not provided the {@link module:net~NimUrlHelperMixin#nimSessionKey} value will be used
         * @returns {string} the URL
         */

      }, {
        key: "createImageUrl",
        value: function createImageUrl(imageId, sessionKey) {
          var key = sessionKey || this.nimSessionKey;
          return this.baseUrl() + "/images/create/" + encodeURIComponent(imageId) + "/" + encodeURIComponent(key);
        }

        /**
         * Generate a URL for getting a receipt for an image creation request.
         *
         * @param {string}  receiptId the ID of the image creation receipt returned from a call to `/images/create/{imageId}/{sessionKey}`
         * @param {string} [sessionKey] the session key returned from a call to `/images/authorize`; if not provided the {@link module:net~NimUrlHelperMixin#nimSessionKey} value will be used
         * @returns {string} the URL
         */

      }, {
        key: "createImageReceiptUrl",
        value: function createImageReceiptUrl(receiptId, sessionKey) {
          var key = sessionKey || this.nimSessionKey;
          return this.baseUrl() + "/images/receipt/" + encodeURIComponent(receiptId) + "/" + encodeURIComponent(key);
        }

        /**
         * Generate a URL for downloading a completed image file.
         *
         * @param {string}  receiptId the ID of the image creation receipt returned from a call to `/images/create/{imageId}/{sessionKey}`
         * @param {string} [sessionKey] the session key returned from a call to `/images/authorize`; if not provided the {@link module:net~NimUrlHelperMixin#nimSessionKey} value will be used
         * @returns {string} the URL
         */

      }, {
        key: "downloadImageUrl",
        value: function downloadImageUrl(receiptId, sessionKey) {
          var key = sessionKey || this.nimSessionKey;
          return this.baseUrl() + "/images/" + encodeURIComponent(receiptId) + "/" + encodeURIComponent(key);
        }
      }, {
        key: "nimSessionKey",
        get: function get$$1() {
          return this.parameter(NimSessionKey);
        },
        set: function set$$1(sessionKey) {
          this.parameter(NimSessionKey, sessionKey);
        }
      }]);
      return _class;
    }(superclass)
  );
};

/**
 * A concrete {@link UrlHelper} with the {@link module:net~NimUrlHelperMixin} and
 * {@link UserUrlHelperMixin} mixins.
 *
 * @mixes NimUrlHelperMixin
 * @mixes UserUrlHelperMixin
 * @extends UrlHelper
 */

var NimUrlHelper = function (_NimUrlHelperMixin) {
  inherits(NimUrlHelper, _NimUrlHelperMixin);

  function NimUrlHelper() {
    classCallCheck(this, NimUrlHelper);
    return possibleConstructorReturn(this, (NimUrlHelper.__proto__ || Object.getPrototypeOf(NimUrlHelper)).apply(this, arguments));
  }

  return NimUrlHelper;
}(NimUrlHelperMixin(solarnetworkApiCore.UserUrlHelperMixin(solarnetworkApiCore.UrlHelper)));

exports.SolarNodeImageGroup = SolarNodeImageGroup;
exports.SolarNodeImageInfo = SolarNodeImageInfo;
exports.NimUrlHelperMixin = NimUrlHelperMixin;
exports.NimDefaultPath = NimDefaultPath;
exports.NimPathKey = NimPathKey;
exports.NimApiPathV1 = NimApiPathV1;
exports.NimUrlHelper = NimUrlHelper;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=solarnetwork-api-nim.js.map
