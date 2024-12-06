"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlueGroup = void 0;
const GlueDrawable_1 = require("./GlueDrawable");
class GlueGroup extends GlueDrawable_1.GlueDrawable {
    /**
     * Create a new GlueGroup instance around a given WebGL context.
     * @param gl WebGL context obtained by calling .getContext('webgl') or by using glueGetWebGLContext.
     */
    constructor(gl, glue) {
        super(gl, glue);
        this._renderTextures = [];
        this._renderFramebuffers = [];
        this._currentFramebuffer = 0;
        this._final = false;
        // Create two framebuffers to be swapped during rendering.
        this.addFramebuffer();
        this.addFramebuffer();
    }
    /**
     * Sets the size of the output. Must be called before everything else.
     * @param width Width (px).
     * @param height Height (px).
     */
    setSize(width, height) {
        this.checkDisposed();
        const gl = this.gl;
        gl.activeTexture(gl.TEXTURE0);
        for (const texture of this._renderTextures) {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        }
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }
    get width() {
        return this.glue.width;
    }
    get height() {
        return this.glue.height;
    }
    get texture() {
        return this._renderTextures[this._currentFramebuffer];
    }
    /**
     * Disposes of this Glue object, all of its associated textures, programs and framebuffers.
     * After this operation, the Glue object may not be utilized further. A new Glue instance
     * must be created for further use.
     */
    dispose() {
        if (this._disposed) {
            return;
        }
        for (const texture of this._renderTextures) {
            this.gl.deleteTexture(texture);
        }
        for (const framebuffer of this._renderFramebuffers) {
            this.gl.deleteFramebuffer(framebuffer);
        }
        this._renderFramebuffers = [];
        this._renderTextures = [];
        this._disposed = true;
    }
    /**
     * Internal function for custom GlueProgram development.
     * Do not use or expect this function to be available
     * in this form forever.
     */
    _markAsFinal() {
        this._final = true;
    }
    /**
     * Internal function for custom GlueProgram development.
     * Do not use or expect this function to be available
     * in this form forever.
     */
    _switchFramebuffer() {
        this.checkDisposed();
        const gl = this.gl;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        this._currentFramebuffer = this._currentFramebuffer === 0 ? 1 : 0;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._final ? null : this._renderFramebuffers[this._currentFramebuffer]);
        this._final = false;
    }
    addFramebuffer() {
        const [texture, framebuffer] = this.createFramebuffer(1, 1);
        this._renderTextures.push(texture);
        this._renderFramebuffers.push(framebuffer);
    }
    createFramebuffer(width, height) {
        const gl = this.gl;
        const texture = this.glue._createTexture();
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        const framebuffer = gl.createFramebuffer();
        if (!framebuffer) {
            throw new Error('Unable to create a framebuffer.');
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        return [texture, framebuffer];
    }
}
exports.GlueGroup = GlueGroup;
