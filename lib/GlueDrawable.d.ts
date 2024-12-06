import { Glue } from './Glue';
import { GlueBlendMode } from './GlueShaderSources';
import { GlueSourceType } from './GlueUtils';
/**
 * Draw options for textures.
 */
export interface GlueTextureDrawOptions {
    /**
     * Horizontal offset in pixels.
     */
    x?: number;
    /**
     * Vertical offset in pixels.
     */
    y?: number;
    /**
     * Width in pixels.
     */
    width?: number;
    /**
     * Height in pixels.
     */
    height?: number;
    /**
     * Opacity from 0.0 to 1.0.
     */
    opacity?: number;
    /**
     * Angle, from 0.0 to 2*PI.
     */
    angle?: number;
    /**
     * Blend mode.
     */
    mode?: GlueBlendMode;
    /**
     * Mask.
     */
    mask?: string | GlueSourceType;
}
export declare class GlueDrawable {
    protected gl: WebGLRenderingContext;
    protected glue: Glue;
    protected _disposed: boolean;
    constructor(gl: WebGLRenderingContext, glue: Glue);
    get width(): number;
    get height(): number;
    get texture(): WebGLTexture;
    /**
     * Draws the texture onto the current framebuffer.
     * @param options Drawing options.
     */
    draw({ x, y, width, height, opacity, mode, mask, angle, }?: GlueTextureDrawOptions): void;
    /**
     * Selects and binds the current texture to TEXTURE1 or target.
     * @param target gl.TEXTURE1 to gl.TEXTURE32 (default: gl.TEXTURE1).
     */
    use(target?: number): void;
    dispose(): void;
    protected checkDisposed(): void;
}
