/** @module domain */

/**
 * An immutable NIM image info object.
 */
class SolarNodeImageInfo {
  /**
   * Constructor.
   *
   * @param {string} id a unique identifier for this image
   * @param {string} sha256 hex-encoded SHA-256 digest of the image content
   * @param {number} contentLength the content length of the image content, in bytes
   * @param {string} uncompressedSha256 a hex-encoded SHA-256 digest of the image contents when uncompressed
   * @param {number} uncompressedContentLength the size of the image contents when uncompressed, in bytes
   */
  constructor(
    id,
    sha256,
    contentLength,
    uncompressedSha256,
    uncompressedContentLength
  ) {
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
  toJsonEncoding() {
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
  static fromJsonEncoding(json) {
    const args = [];
    if (json) {
      const obj = typeof json === "string" ? JSON.parse(json) : json;
      args.push(obj.id || "");
      args.push(obj.sha256 || "");
      args.push(obj.contentLength || 0);
      args.push(obj.uncompressedSha256 || "");
      args.push(obj.uncompressedContentLength || 0);
    }
    return new SolarNodeImageInfo(...args);
  }

  /**
   * Compare two `SolarNodeImageInfo` objects based on their IDs.
   *
   * The `id` values are compared in a case-insensitive manner, using a natural number ordering.
   *
   * @param {SolarNodeImageInfo} l the left-hand object to compare
   * @param {SolarNodeImageInfo} r the right-hand object to compare
   */
  static compareById(l, r) {
    const lId = l ? l.id : "";
    const rId = r ? r.id : "";
    return lId.localeCompare(rId, undefined, {
      sensitivity: "base",
      numeric: true
    });
  }
}

export default SolarNodeImageInfo;
