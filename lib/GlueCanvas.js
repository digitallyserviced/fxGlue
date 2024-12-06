"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlueCanvas = void 0;
const Glue_1 = require("./Glue");
const GlueUtils_1 = require("./GlueUtils");
class GlueCanvas {
    /**
     * Creates a new canvas and a new Glue instance.
     */
    constructor(options) {
        this.canvas = document.createElement('canvas');
        this.gl = GlueUtils_1.glueGetWebGLContext(this.canvas, options);
        this.glue = new Glue_1.Glue(this.gl);
    }
    /**
     * Sets the size of the output. Must be called before everything else.
     * @param width Width (px).
     * @param height Height (px).
     */
    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.glue.setSize(width, height);
    }
}
exports.GlueCanvas = GlueCanvas;
