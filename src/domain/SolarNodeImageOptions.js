/** @module domain */

/**
 * A NIM options object.
 */
class SolarNodeImageOptions {
  /**
   * Constructor.
   *
   * @param {object} environment environment parameters to pass to the customization process
   * @param {object} parameters parameters to pass to the customization process
   * @param {boolean} verbose `true` to output verbose information during the customization process
   */
  constructor(environment, parameters, verbose) {
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
  toJsonEncoding() {
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
  static fromJsonEncoding(json) {
    const args = [];
    if (json) {
      const obj = typeof json === "string" ? JSON.parse(json) : json;
      args.push(obj.environment || undefined);
      args.push(obj.parameters || undefined);
      args.push(obj.verbose || undefined);
    }
    return new SolarNodeImageOptions(...args);
  }
}

export default SolarNodeImageOptions;
