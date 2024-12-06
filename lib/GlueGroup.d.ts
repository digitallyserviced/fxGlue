import { Glue } from './Glue';
import { GlueDrawable } from './GlueDrawable';
export declare class GlueGroup extends GlueDrawable {
    private _renderTextures;
    private _renderFramebuffers;
    private _currentFramebuffer;
    private _final;
    /**
     * Create a new GlueGroup instance around a given WebGL context.
     * @param gl WebGL context obtained by calling .getContext('webgl') or by using glueGetWebGLContext.
     */
    constructor(gl: WebGLRenderingContext, glue: Glue);
    /**
     * Sets the size of the output. Must be called before everything else.
     * @param width Width (px).
     * @param height Height (px).
     */
    setSize(width: number, height: number): void;
    get width(): number;
    get height(): number;
    get texture(): WebGLTexture;
    /**
     * Disposes of this Glue object, all of its associated textures, programs and framebuffers.
     * After this operation, the Glue object may not be utilized further. A new Glue instance
     * must be created for further use.
     */
    dispose(): void;
    /**
     * Internal function for custom GlueProgram development.
     * Do not use or expect this function to be available
     * in this form forever.
     */
    _markAsFinal(): void;
    /**
     * Internal function for custom GlueProgram development.
     * Do not use or expect this function to be available
     * in this form forever.
     */
    _switchFramebuffer(): void;
    private addFramebuffer;
    private createFramebuffer;
}
