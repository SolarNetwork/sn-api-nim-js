// https://github.com/SolarNetwork/sn-api-nim-js Version 1.0.2. Copyright 2019 SolarNetwork Foundation.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('solarnetwork-api-core')) :
  typeof define === 'function' && define.amd ? define(['exports', 'solarnetwork-api-core'], factory) :
  (global = global || self, factory(global.sn = {}, global.sn));
}(this, function (exports, solarnetworkApiCore) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  /** @module domain */

  /**
   * A grouping of image infos, to support a hierarchy of images.
   */
  var SolarNodeImageGroup =
  /*#__PURE__*/
  function () {
    /**
     * Constructor.
     *
     * @param {string} componentId the full group component ID
     * @param {string} componentName the last component from the component ID
     */
    function SolarNodeImageGroup(componentId, componentName) {
      _classCallCheck(this, SolarNodeImageGroup);

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


    _createClass(SolarNodeImageGroup, [{
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

  /** A locale options object suitable for passing to `String.localeCompare()`. */

  var LOCALE_COMPARE_OPTIONS = Object.freeze({
    sensitivity: "base",
    numeric: true
  });
  /** A regexp that looks for 8 digits at the end of the string, assuming that is a YYYYMMDD date. */

  var DATE_LIKE_ENDING = /.*(\d{4})(\d{2})(\d{2})$/;
  /**
   * An immutable NIM image info object.
   */

  var SolarNodeImageInfo =
  /*#__PURE__*/
  function () {
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
      _classCallCheck(this, SolarNodeImageInfo);

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


    _createClass(SolarNodeImageInfo, [{
      key: "toJsonEncoding",
      value: function toJsonEncoding() {
        return JSON.stringify(this);
      }
      /**
       * Get a display name based on the most specific component of this image's `id` value.
       *
       * The components of the `id` are based on splitting it on a `-` character. This method
       * returns the right-most component. If that component has a date-like structure, the
       * date will be formatted slightly.
       *
       * @returns {string} the display name
       */

    }, {
      key: "displayNameForComponent",
      value: function displayNameForComponent() {
        if (!this.id) {
          return "";
        }

        var components = this.id.split("-");

        if (components.length < 2) {
          return this.id;
        }

        var name = components[components.length - 1];
        var match = name.match(DATE_LIKE_ENDING);

        if (match) {
          return match[1] + "-" + match[2] + "-" + match[3];
        }

        return name;
      }
      /**
       * Parse a JSON string into a {@link module:domain~SolarNodeImageInfo} instance.
       *
       * The JSON must be encoded the same way {@link module:domain~SolarNodeImageInfo#toJsonEncoding} does.
       *
       * @param {string|Object} json the JSON to parse, or a parsed JSON object
       * @returns {module:domain~SolarNodeImageInfo} the session instance
       */

    }, {
      key: "hasId",

      /**
       * Compare an ID value with this object's ID value.
       *
       * This method performs a case-insensitive compare similar to {@link module:domain~SolarNodeImageInfo#compareById}.
       *
       * @param {string} id an ID value to compare
       * @returns {boolean} `true` if `id` matches this object's `id`
       */
      value: function hasId(id) {
        if (this.id == undefined || id === undefined) {
          return false;
        }

        return this.id.localeCompare(id, undefined, LOCALE_COMPARE_OPTIONS) === 0;
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

        return _construct(SolarNodeImageInfo, args);
      }
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
          } // group _should_ be set here


          if (group) {
            group.addItem(image);
          }
        }

        return rootGroups;
      }
    }]);

    return SolarNodeImageInfo;
  }();

  /** @module domain */

  /**
   * A NIM options object.
   */
  var SolarNodeImageOptions =
  /*#__PURE__*/
  function () {
    /**
     * Constructor.
     *
     * @param {object} environment environment parameters to pass to the customization process
     * @param {object} parameters parameters to pass to the customization process
     * @param {boolean} verbose `true` to output verbose information during the customization process
     */
    function SolarNodeImageOptions(environment, parameters, verbose) {
      _classCallCheck(this, SolarNodeImageOptions);

      /**
       * Environment parameters to pass to the customization process.
       *
       * The keys and values will be treated as strings.
       *
       * @type {object}
       */
      this.environment = environment;
      /**
       * Parameters to pass to the customization process.
       *
       * @type {object}
       */

      this.parameters = parameters;
      /**
       * A flag to toggle producing verbose information during the customization process.
       *
       * @type {boolean}
       */

      this.verbose = verbose;
    }
    /**
     * Get this object as a standard JSON encoded string value.
     *
     * @return {string} the JSON encoded string
     */


    _createClass(SolarNodeImageOptions, [{
      key: "toJsonEncoding",
      value: function toJsonEncoding() {
        return JSON.stringify(this);
      }
      /**
       * Parse a JSON string into a {@link module:domain~SolarNodeImageOptions} instance.
       *
       * The JSON must be encoded the same way {@link module:domain~SolarNodeImageOptions#toJsonEncoding} does.
       *
       * @param {string|Object} json the JSON to parse, or a parsed JSON object
       * @returns {module:domain~SolarNodeImageOptions} the session instance
       */

    }], [{
      key: "fromJsonEncoding",
      value: function fromJsonEncoding(json) {
        var args = [];

        if (json) {
          var obj = typeof json === "string" ? JSON.parse(json) : json;
          args.push(obj.environment || undefined);
          args.push(obj.parameters || undefined);
          args.push(obj.verbose || undefined);
        }

        return _construct(SolarNodeImageOptions, args);
      }
    }]);

    return SolarNodeImageOptions;
  }();

  /**
   * An immutable NIM receipt object.
   */

  var SolarNodeImageReceipt =
  /*#__PURE__*/
  function () {
    /**
     * Constructor.
     *
     * @param {string} id a unique ID for this work task
     * @param {string} baseImageId the ID of the image that served as the starting point for this customized image
     * @param {Date} createdDate the date the task was created
     * @param {boolean} started flag indicating if the task has started executing
     * @param {boolean} done flag indicating if the task has completed executing
     * @param {boolean} cancelled flag indicating if the task was cancelled before executing completely
     * @param {number} percentComplete the amount of work that has been completed, as a fractional percentage between `0` and `1`
     * @param {string} message a status message
     * @param {Date} [startedDate] the date the customization task started executing
     * @param {Date} [completedDate] the date the customization task completed executing
     * @param {SolarNodeImageInfo} [imageInfo] information about the final image, once ready
     * @param {string} [downloadUrl] a URL for a direct download of the finished image
     *
     */
    function SolarNodeImageReceipt(id, baseImageId, createdDate, started, done, cancelled, percentComplete, message, startedDate, completedDate, imageInfo, downloadUrl) {
      _classCallCheck(this, SolarNodeImageReceipt);

      /**
       * A unique ID for this work task.
       *
       * @type {string}
       * @readonly
       */
      this.id = id;
      /**
       * The ID of the image that served as the starting point for this customized image.
       *
       * @type {string}
       * @readonly
       */

      this.baseImageId = baseImageId;
      /**
       * The date the task was created.
       *
       * @type {Date}
       * @readonly
       */

      this.createdDate = createdDate;
      /**
       * A flag indicating if the task has started executing.
       *
       * @type {boolean}
       * @readonly
       */

      this.started = started;
      /**
       * A flag indicating if the task has completed executing.
       *
       * @type {boolean}
       * @readonly
       */

      this.done = done;
      /**
       * A flag indicating if the task task was cancelled before executing completely.
       *
       * @type {boolean}
       * @readonly
       */

      this.cancelled = cancelled;
      /**
       * The amount of work that has been completed, as a fractional percentage between `0` and `1`.
       *
       * @type {number}
       * @readonly
       */

      this.percentComplete = percentComplete;
      /**
       * A status message.
       *
       * @type {string}
       * @readonly
       */

      this.message = message;
      /**
       * The date the customization task started executing.
       *
       * @type {Date}
       * @readonly
       */

      this.startedDate = startedDate;
      /**
       * The date the customization task completed executing.
       *
       * @type {Date}
       * @readonly
       */

      this.completedDate = completedDate;
      /**
       * Information about the final image, once ready.
       *
       * @type {SolarNodeImageInfo}
       * @readonly
       */

      this.imageInfo = imageInfo;
      /**
       * A URL for a direct download of the finished image.
       *
       * @type {string}
       * @readonly
       */

      this.downloadUrl = downloadUrl;

      if (this.constructor === SolarNodeImageReceipt) {
        Object.freeze(this);
      }
    }
    /**
     * Get this object as a standard JSON encoded string value.
     *
     * @return {string} the JSON encoded string
     */


    _createClass(SolarNodeImageReceipt, [{
      key: "toJsonEncoding",
      value: function toJsonEncoding() {
        var d = Object.assign({}, this);

        if (this.createdDate) {
          d.createdDate = this.createdDate.getTime();
        }

        if (this.startedDate) {
          d.startedDate = this.startedDate.getTime();
        }

        if (this.completedDate) {
          d.completedDate = this.completedDate.getTime();
        }

        return JSON.stringify(d);
      }
      /**
       * Parse a JSON string into a {@link module:domain~SolarNodeImageReceipt} instance.
       *
       * The JSON must be encoded the same way {@link module:domain~SolarNodeImageReceipt#toJsonEncoding} does.
       *
       * @param {string|Object} json the JSON to parse, or a parsed JSON object
       * @returns {module:domain~SolarNodeImageReceipt} the session instance
       */

    }], [{
      key: "fromJsonEncoding",
      value: function fromJsonEncoding(json) {
        var args = [];

        if (json) {
          var obj = typeof json === "string" ? JSON.parse(json) : json;
          args.push(obj.id || "");
          args.push(obj.baseImageId || "");
          args.push(obj.createdDate ? new Date(obj.createdDate) : null);
          args.push(!!obj.started);
          args.push(!!obj.done);
          args.push(!!obj.cancelled);
          args.push(obj.percentComplete || 0);
          args.push(obj.message || "");
          args.push(obj.startedDate ? new Date(obj.startedDate) : null);
          args.push(obj.completedDate ? new Date(obj.completedDate) : null);
          args.push(obj.imageInfo ? SolarNodeImageInfo.fromJsonEncoding(JSON.stringify(obj.imageInfo)) : undefined);
          args.push(obj.downloadUrl || "");
        }

        return _construct(SolarNodeImageReceipt, args);
      }
    }]);

    return SolarNodeImageReceipt;
  }();

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
      /*#__PURE__*/

      /**
       * A mixin class that adds NIM specific support to {@link UrlHelper}.
       *
       * @mixin
       * @alias module:net~NimUrlHelperMixin
       */
      function (_superclass) {
        _inherits(_class, _superclass);

        /**
         * Constructor.
         *
         * @param {*} args any number of arguments, but the first argument is assumed to be either an {@link Environment}
         *                 instance or a simple object that serves as the NIM environment
         */
        function _class() {
          var _getPrototypeOf2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _classCallCheck(this, _class);

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
          return _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_class)).call.apply(_getPrototypeOf2, [this].concat(_toConsumableArray(args))));
        }
        /**
         * Get the base URL to the NIM v1 REST API.
         *
         * The returned URL uses the configured environment to resolve the `hostUrl` and the `nimPath`
         * context path.
         *
         * @returns {string} the base URL to NIM
         */


        _createClass(_class, [{
          key: "baseUrl",
          value: function baseUrl() {
            var nimPath = this.env(NimPathKey);
            var path = nimPath !== undefined ? nimPath : NimDefaultPath;
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
          key: "authorizeImageSessionUrl",
          value: function authorizeImageSessionUrl() {
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
          get: function get() {
            return this.parameter(NimSessionKey);
          },
          set: function set(sessionKey) {
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


  var NimUrlHelper =
  /*#__PURE__*/
  function (_NimUrlHelperMixin) {
    _inherits(NimUrlHelper, _NimUrlHelperMixin);

    function NimUrlHelper() {
      _classCallCheck(this, NimUrlHelper);

      return _possibleConstructorReturn(this, _getPrototypeOf(NimUrlHelper).apply(this, arguments));
    }

    return NimUrlHelper;
  }(NimUrlHelperMixin(solarnetworkApiCore.UserUrlHelperMixin(solarnetworkApiCore.UrlHelper)));

  exports.NimApiPathV1 = NimApiPathV1;
  exports.NimDefaultPath = NimDefaultPath;
  exports.NimPathKey = NimPathKey;
  exports.NimUrlHelper = NimUrlHelper;
  exports.NimUrlHelperMixin = NimUrlHelperMixin;
  exports.SolarNodeImageGroup = SolarNodeImageGroup;
  exports.SolarNodeImageInfo = SolarNodeImageInfo;
  exports.SolarNodeImageOptions = SolarNodeImageOptions;
  exports.SolarNodeImageReceipt = SolarNodeImageReceipt;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=solarnetwork-api-nim.js.map
