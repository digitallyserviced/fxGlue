export declare type GlueSourceType = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
/**
 * Check if WebGL is available in the current browser.
 * @returns Whether WebGL is available or not.
 */
export declare function glueIsWebGLAvailable(): boolean;
/**
 * Get a WebGL context from a given canvas.
 * @returns The WebGL context.
 */
export declare function glueGetWebGLContext(canvas: HTMLCanvasElement, options?: WebGLContextAttributes): WebGLRenderingContext;
/**
 * Check if the source is loaded.
 * @param source The source image or video.
 * @returns Whether the source is loaded or not.
 */
export declare function glueIsSourceLoaded(source: GlueSourceType): boolean;
/**
 * Get source dimensions
 * @param source The source image or video.
 * @returns An array with dimensions in the format of [width, height] (both numbers, px).
 */
export declare function glueGetSourceDimensions(source: GlueSourceType): [number, number];
