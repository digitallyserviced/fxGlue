"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlueDrawable = void 0;
const GlueShaderSources_1 = require("./GlueShaderSources");
class GlueDrawable {
    constructor(gl, glue) {
        this.gl = gl;
        this.glue = glue;
        this._disposed = false;
    }
    get width() {
        throw new Error('Not implemented.');
    }
    get height() {
        throw new Error('Not implemented.');
    }
    get texture() {
        throw new Error('Not implemented.');
    }
    /**
     * Draws the texture onto the current framebuffer.
     * @param options Drawing options.
     */
    draw({ x = 0, y = 0, width, height, opacity = 1, mode = GlueShaderSources_1.GlueBlendMode.NORMAL, mask, angle = 0, } = {}) {
        this.use();
        let size = [this.width, this.height];
        if (width && height) {
            size = [width, height];
        }
        const blendProgram = this.glue.program('~blend');
        blendProgram === null || blendProgram === void 0 ? void 0 : blendProgram.apply({
            iImage: 1,
            iSize: size,
            iOffset: [x / this.width, y / this.height],
            iOpacity: opacity,
            iBlendMode: mode,
            iAngle: Math.PI * 2 - angle,
        }, mask);
    }
    /**
     * Selects and binds the current texture to TEXTURE1 or target.
     * @param target gl.TEXTURE1 to gl.TEXTURE32 (default: gl.TEXTURE1).
     */
    use(target) {
        this.checkDisposed();
        const gl = this.gl;
        gl.activeTexture(target || gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }
    dispose() {
        throw new Error('Not implemented.');
    }
    checkDisposed() {
        if (this._disposed) {
            throw new Error('This GlueDrawable object has been disposed.');
        }
    }
}
exports.GlueDrawable = GlueDrawable;
