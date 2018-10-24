/** @module net */

import { Environment, UrlHelper, UserUrlHelperMixin } from "solarnetwork-api-core";

/** The NIM default path. */
export const NimDefaultPath = "/solarnode-image-maker";

/** The {@link UrlHelper} parameters key for the NIM path. */
export const NimPathKey = "nimPath";

/** The NIM REST API path. */
export const NimApiPathV1 = "/api/v1";

/** An {@link UrlHelper} parameter key for a NIM session key. */
export const NimSessionKey = "nimSessionKey";

/**
 * Create a NimUrlHelperMixin class.
 *
 * @exports net
 * @param {UrlHelper} superclass the UrlHelper class to mix onto
 * @return {module:net~NimUrlHelperMixin} the mixin class
 */
const NimUrlHelperMixin = superclass =>
  /**
   * A mixin class that adds NIM specific support to {@link UrlHelper}.
   *
   * @mixin
   * @alias module:net~NimUrlHelperMixin
   */
  class extends superclass {
    /**
     * Constructor.
     *
     * @param {*} args any number of arguments, but the first argument is assumed to be either an {@link Environment}
     *                 instance or a simple object that serves as the NIM environment
     */
    constructor(...args) {
      const env =
        args && args[0]
          ? args[0] instanceof Environment
            ? args[0]
            : new Environment(args[0])
          : new Environment({
              tls: true,
              host: "apps.solarnetwork.net",
              port: 443,
              nimPath: NimDefaultPath
            });
      if (!args) {
        args = [];
      }
      args[0] = env;
      super(...args);
    }

    /**
     * Get the base URL to the NIM v1 REST API.
     *
     * The returned URL uses the configured environment to resolve the `hostUrl` and the `nimPath`
     * context path.
     *
     * @returns {string} the base URL to NIM
     */
    baseUrl() {
      const nimPath = this.env(NimPathKey);
      const path = nimPath !== undefined ? nimPath : NimDefaultPath;
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
    get nimSessionKey() {
      return this.parameter(NimSessionKey);
    }

    set nimSessionKey(sessionKey) {
      this.parameter(NimSessionKey, sessionKey);
    }

    /**
     * Generate a URL for the "ping" health test URL.
     *
     * @returns {string} the URL
     */
    pingUrl() {
      return this.baseUrl() + "/ping";
    }

    /**
     * Generate a URL for authorizing a new NIM session.
     *
     * @returns {string} the URL
     */
    authorizeImageSessionUrl() {
      return this.baseUrl() + "/images/authorize";
    }

    /**
     * Generate a URL for listing the available base images.
     *
     * @returns {string} the URL
     */
    listBaseImagesUrl() {
      return this.baseUrl() + "/images/infos";
    }

    /**
     * Generate a URL for creating a custom image.
     *
     * @param {string}  imageId the ID of the base image to customize
     * @param {string} [sessionKey] the session key returned from a call to `/images/authorize`; if not provided the {@link module:net~NimUrlHelperMixin#nimSessionKey} value will be used
     * @returns {string} the URL
     */
    createImageUrl(imageId, sessionKey) {
      const key = sessionKey || this.nimSessionKey;
      return (
        this.baseUrl() +
        "/images/create/" +
        encodeURIComponent(imageId) +
        "/" +
        encodeURIComponent(key)
      );
    }

    /**
     * Generate a URL for getting a receipt for an image creation request.
     *
     * @param {string}  receiptId the ID of the image creation receipt returned from a call to `/images/create/{imageId}/{sessionKey}`
     * @param {string} [sessionKey] the session key returned from a call to `/images/authorize`; if not provided the {@link module:net~NimUrlHelperMixin#nimSessionKey} value will be used
     * @returns {string} the URL
     */
    createImageReceiptUrl(receiptId, sessionKey) {
      const key = sessionKey || this.nimSessionKey;
      return (
        this.baseUrl() +
        "/images/receipt/" +
        encodeURIComponent(receiptId) +
        "/" +
        encodeURIComponent(key)
      );
    }

    /**
     * Generate a URL for downloading a completed image file.
     *
     * @param {string}  receiptId the ID of the image creation receipt returned from a call to `/images/create/{imageId}/{sessionKey}`
     * @param {string} [sessionKey] the session key returned from a call to `/images/authorize`; if not provided the {@link module:net~NimUrlHelperMixin#nimSessionKey} value will be used
     * @returns {string} the URL
     */
    downloadImageUrl(receiptId, sessionKey) {
      const key = sessionKey || this.nimSessionKey;
      return (
        this.baseUrl() + "/images/" + encodeURIComponent(receiptId) + "/" + encodeURIComponent(key)
      );
    }
  };

/**
 * A concrete {@link UrlHelper} with the {@link module:net~NimUrlHelperMixin} and
 * {@link UserUrlHelperMixin} mixins.
 *
 * @mixes NimUrlHelperMixin
 * @mixes UserUrlHelperMixin
 * @extends UrlHelper
 */
class NimUrlHelper extends NimUrlHelperMixin(UserUrlHelperMixin(UrlHelper)) {}

export default NimUrlHelperMixin;
export { NimUrlHelper };
