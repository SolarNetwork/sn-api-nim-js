/** @module domain */

/**
 * A grouping of image infos, to support a hierarchy of images.
 */
class SolarNodeImageGroup {
  /**
   * Constructor.
   *
   * @param {string} componentId the full group component ID
   * @param {string} componentName the last component from the component ID
   */
  constructor(componentId, componentName) {
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
  addItem(image) {
    this.items.push(image);
    return this;
  }

  /**
   * Add another group as a child of this group.
   *
   * @param {module:domain~SolarNodeImageGroup} group the group to add
   * @returns {module:domain~SolarNodeImageGroup} this object
   */
  addGroup(group) {
    this.groups.push(group);
    return this;
  }

  /**
   * Get this object as a standard JSON encoded string value.
   *
   * @return {string} the JSON encoded string
   */
  toJsonEncoding() {
    return JSON.stringify(this);
  }
}

export default SolarNodeImageGroup;
