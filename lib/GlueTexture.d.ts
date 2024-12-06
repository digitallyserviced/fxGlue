import { Glue } from './Glue';
import { GlueDrawable } from './GlueDrawable';
import { GlueSourceType } from './GlueUtils';
export declare class GlueTexture extends GlueDrawable {
    private _source;
    private _width;
    private _height;
    private _texture;
    /**
     * Creates a new GlueTexture instance.
     * This constructor should not be called from outside of the Glue class.
     * @param gl WebGL context.
     * @param glue Glue instance.
     * @param _source HTMLImageElement, HTMLVideoElement or HTMLCanvasElement containing the source. Must be loaded.
     */
    constructor(gl: WebGLRenderingContext, glue: Glue, _source: GlueSourceType);
    get width(): number;
    get height(): number;
    get texture(): WebGLTexture;
    /**
     * Updates the current texture.
     * This is useful in case of video textures, where
     * this action will set the texture to the current playback frame.
     */
    update(source?: GlueSourceType): void;
    /**
     * Disposes of this GlueTexture object.
     * After this operation, the GlueTexture object may not be utilized further.
     * A new GlueTexture instance must be created for further use.
     */
    dispose(): void;
}
