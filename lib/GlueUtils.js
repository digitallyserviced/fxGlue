"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.glueGetSourceDimensions = exports.glueIsSourceLoaded = exports.glueGetWebGLContext = exports.glueIsWebGLAvailable = void 0;
/**
 * Check if WebGL is available in the current browser.
 * @returns Whether WebGL is available or not.
 */
function glueIsWebGLAvailable() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext &&
            (canvas.getContext('webgl2') || canvas.getContext('experimental-webgl2')));
    }
    catch (e) {
        return false;
    }
}
exports.glueIsWebGLAvailable = glueIsWebGLAvailable;
/**
 * Get a WebGL context from a given canvas.
 * @returns The WebGL context.
 */
function glueGetWebGLContext(canvas, options) {
    if (options) {
        options.premultipliedAlpha = false;
    }
    else {
        options = {
            premultipliedAlpha: false,
        };
    }
    var opts = { alpha: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        antialias: false,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance" }; // "low_power", "high_performance", "default"
    const context = canvas.getContext('webgl2', opts) ||
        canvas.getContext('experimental-webgl2', opts);
    if (!context) {
        throw new Error('WebGL is not available.');
    }
    return context;
}
exports.glueGetWebGLContext = glueGetWebGLContext;
/**
 * Check if the source is loaded.
 * @param source The source image or video.
 * @returns Whether the source is loaded or not.
 */
function glueIsSourceLoaded(source) {
    if (!source) {
        return false;
    }
    if (source instanceof HTMLImageElement) {
        return source.complete && source.naturalHeight > 0;
    }
    else if (source instanceof HTMLVideoElement) {
        return source.readyState > 2;
    }
    return true;
}
exports.glueIsSourceLoaded = glueIsSourceLoaded;
/**
 * Get source dimensions
 * @param source The source image or video.
 * @returns An array with dimensions in the format of [width, height] (both numbers, px).
 */
function glueGetSourceDimensions(source) {
    if (source instanceof HTMLImageElement) {
        return [source.naturalWidth, source.naturalHeight];
    }
    else if (source instanceof HTMLVideoElement) {
        return [source.videoWidth, source.videoHeight];
    }
    else if (source instanceof HTMLCanvasElement) {
        return [source.width, source.height];
    }
    throw new Error('Unable to get source dimensions.');
}
exports.glueGetSourceDimensions = glueGetSourceDimensions;
