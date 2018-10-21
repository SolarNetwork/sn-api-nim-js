/** @module domain */

import SolarNodeImageInfo from "./SolarNodeImageInfo";

/**
 * An immutable NIM receipt object.
 */
class SolarNodeImageReceipt {
  /**
   * Constructor.
   *
   * @param {string} id a unique ID for this work task
   * @param {string} baseImageId the ID of the image that served as the starting point for this customized image
   * @param {Date} createdDate the date the task was created
   * @param {boolean} started flag indicating if the task has started executing
   * @param {number} percentComplete the amount of work that has been completed, as a fractional percentage between `0` and `1`
   * @param {string} message a status message
   * @param {Date} [startedDate] the date the customization task started executing
   * @param {Date} [completedDate] the date the customization task completed executing
   * @param {SolarNodeImageInfo} [imageInfo] information about the final image, once ready
   * @param {string} [downloadUrl] a URL for a direct download of the finished image
   *
   */
  constructor(
    id,
    baseImageId,
    createdDate,
    started,
    percentComplete,
    message,
    startedDate,
    completedDate,
    imageInfo,
    downloadUrl
  ) {
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
  toJsonEncoding() {
    return JSON.stringify(this);
  }

  /**
   * Parse a JSON string into a {@link module:domain~SolarNodeImageReceipt} instance.
   *
   * The JSON must be encoded the same way {@link module:domain~SolarNodeImageReceipt#toJsonEncoding} does.
   *
   * @param {string|Object} json the JSON to parse, or a parsed JSON object
   * @returns {module:domain~SolarNodeImageReceipt} the session instance
   */
  static fromJsonEncoding(json) {
    const args = [];
    if (json) {
      const obj = typeof json === "string" ? JSON.parse(json) : json;
      args.push(obj.id || "");
      args.push(obj.baseImageId || "");
      args.push(obj.createdDate ? new Date(obj.createdDate) : null);
      args.push(!!obj.started);
      args.push(obj.percentComplete || 0);
      args.push(obj.message || "");
      args.push(obj.startedDate ? new Date(obj.startedDate) : null);
      args.push(obj.completedDate ? new Date(obj.completedDate) : null);
      args.push(
        obj.imageInfo
          ? SolarNodeImageInfo.fromJsonEncoding(JSON.stringify(obj.imageInfo))
          : undefined
      );
      args.push(obj.downloadUrl || "");
    }
    return new SolarNodeImageReceipt(...args);
  }
}

export default SolarNodeImageReceipt;
