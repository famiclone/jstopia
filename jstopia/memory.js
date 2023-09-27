/** Class representing a memory */
export default class Memory {
    /**
     * @param {number} size 
     * @param {Uint8Array} data
     */
    constructor(size) {
        this.size = size;
        this.data = new Uint8Array(size);
    }

    /** Reset memory to 0 */
    reset() {
        this.data.fill(0);
    }
}
