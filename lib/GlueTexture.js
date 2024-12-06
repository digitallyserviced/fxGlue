"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlueTexture = void 0;
const GlueDrawable_1 = require("./GlueDrawable");
const GlueUtils_1 = require("./GlueUtils");
class GlueTexture extends GlueDrawable_1.GlueDrawable {
    /**
     * Creates a new GlueTexture instance.
     * This constructor should not be called from outside of the Glue class.
     * @param gl WebGL context.
     * @param glue Glue instance.
     * @param _source HTMLImageElement, HTMLVideoElement or HTMLCanvasElement containing the source. Must be loaded.
     */
    constructor(gl, glue, _source) {
        super(gl, glue);
        this._source = _source;
        if (!GlueUtils_1.glueIsSourceLoaded(_source)) {
            throw new Error('Source is not loaded.');
        }
        const target = gl.TEXTURE1;
        const texture = glue._createTexture(target);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, _source);
        this._texture = texture;
        const [width, height] = GlueUtils_1.glueGetSourceDimensions(_source);
        this._width = width;
        this._height = height;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get texture() {
        return this._texture;
    }
    /**
     * Updates the current texture.
     * This is useful in case of video textures, where
     * this action will set the texture to the current playback frame.
     */
    update(source) {
        this.checkDisposed();
        if (source) {
            if (!GlueUtils_1.glueIsSourceLoaded(source)) {
                throw new Error('Source is not loaded.');
            }
            const [width, height] = GlueUtils_1.glueGetSourceDimensions(source);
            this._width = width;
            this._height = height;
            this._source = source;
        }
        const gl = this.gl;
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._source);
    }
    /**
     * Disposes of this GlueTexture object.
     * After this operation, the GlueTexture object may not be utilized further.
     * A new GlueTexture instance must be created for further use.
     */
    dispose() {
        this.gl.deleteTexture(this._texture);
        this._disposed = true;
    }
}
exports.GlueTexture = GlueTexture;
