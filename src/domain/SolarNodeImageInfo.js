/** @module domain */

import SolarNodeImageGroup from "./SolarNodeImageGroup";

const LOCALE_COMPARE_OPTIONS = Object.freeze({
  sensitivity: "base",
  numeric: true
});

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
   * @returns {number} < `0` if `l` sorts before `r`, > `0` if `l` sorts after `r`, or `0` if `l` and `r` sort equally
   */
  static compareById(l, r) {
    const lId = l ? l.id : "";
    const rId = r ? r.id : "";
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
  static idComponentGroups(imageList) {
    const sortedImageList = Array.isArray(imageList) ? imageList.slice() : [];
    sortedImageList.sort(SolarNodeImageInfo.compareById);
    const rootGroups = [];
    let groupMap = {};

    /**
     * Get a cached group by ID.
     * @param {string} id the ID of the group to get
     * @returns {SolarNodeImageGroup} the group, or `undefined`
     */
    function getGroup(id) {
      for (let oneId in groupMap) {
        if (oneId.localeCompare(id, undefined, LOCALE_COMPARE_OPTIONS) === 0) {
          return groupMap[oneId];
        }
      }
      return undefined;
    }

    for (let i = 0, len = sortedImageList.length; i < len; i += 1) {
      let image = sortedImageList[i];
      let groupIdComponents = image.id.split("-").slice(0, -1);
      let groupComponentId = groupIdComponents.join("-").toLowerCase();
      let group = getGroup(groupComponentId);
      if (group === undefined) {
        for (let j = 0, len = groupIdComponents.length; j < len; j += 1) {
          let componentId = groupIdComponents
            .slice(0, j + 1)
            .join("-")
            .toLowerCase();
          let parentGroup = getGroup(componentId);
          if (!parentGroup) {
            parentGroup = new SolarNodeImageGroup(
              componentId,
              groupIdComponents[j]
            );
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
}

export default SolarNodeImageInfo;
