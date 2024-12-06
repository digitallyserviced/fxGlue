import { Glue } from './Glue';
export declare class GlueCanvas {
    readonly canvas: HTMLCanvasElement;
    readonly glue: Glue;
    readonly gl: WebGLRenderingContext;
    /**
     * Creates a new canvas and a new Glue instance.
     */
    constructor(options?: WebGLContextAttributes);
    /**
     * Sets the size of the output. Must be called before everything else.
     * @param width Width (px).
     * @param height Height (px).
     */
    setSize(width: number, height: number): void;
}
