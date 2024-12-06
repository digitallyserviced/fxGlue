import { GlueTextureDrawOptions } from './GlueDrawable';
import { GlueProgram } from './GlueProgram';
import { GlueTexture } from './GlueTexture';
import { GlueUniformValue } from './GlueUniforms';
import { GlueSourceType } from './GlueUtils';
export declare class Glue {
    private gl;
    private _programs;
    private _textures;
    private _imports;
    private _width;
    private _height;
    private _disposed;
    private _groups;
    private _currentGroupIndex;
    /**
     * Create a new Glue instance around a given WebGL context.
     * @param gl WebGL context obtained by calling .getContext('webgl') or by using glueGetWebGLContext.
     */
    constructor(gl: WebGLRenderingContext);
    /**
     * Sets the size of the output. Must be called before everything else.
     * @param width Width (px).
     * @param height Height (px).
     */
    setSize(width: number, height: number): void;
    /**
     * Output width (px).
     */
    get width(): number;
    /**
     * Output height (px).
     */
    get height(): number;
    /**
     * Creates and registers a texture for later use.
     * Texture names must not start with "~".
     * @param name Texture name (must not be registered already).
     * @param source HTMLImageElement, HTMLVideoElement or HTMLCanvasElement with the texture. Must be loaded.
     * @returns A new GlueTexture instance.
     */
    registerTexture(name: string, source: GlueSourceType): GlueTexture;
    /**
     * Removes a texture from registered textures and disposes it.
     * @param name Name of the registered texture.
     */
    deregisterTexture(name: string): void;
    /**
     * Checks if a registered texture with a given name is available.
     * @param name Name of the registered texture.
     * @returns Whether the texture is available or not.
     */
    hasTexture(name: string): boolean;
    /**
     * Retrieves a registered texture with a given name.
     * @param name Name of the registered texture.
     * @returns A GlueTexture instance or undefined if there is no texture with such name.
     */
    texture(name: string): GlueTexture | undefined;
    /**
     * Draws a HTMLImageElement, HTMLVideoElement or a HTMLCanvasElement without registering a new texture.
     * @param source HTMLImageElement, HTMLVideoElement or HTMLCanvasElement with the texture. Must be loaded.
     * @param options Settings for how the texture should be painted: X/Y offset, width/height and more.
     */
    draw(source: GlueSourceType, options?: GlueTextureDrawOptions): void;
    /**
     * Creates and registers a WeBGL program for a later use.
     * NOTE: Glue uses a preprocessor for its GLSL programs.
     * Consult the documentation for more information.
     * Program names must not start with "~".
     * @param name Program name (must not be registered already).
     * @param fragmentShader Glue-compatible GLSL fragment shader code.
     * @param vertexShader Glue-compatible GLSL vertex shader code.
     * @returns A new GlueProgram instance.
     */
    registerProgram(name: string, fragmentShader?: string, vertexShader?: string): GlueProgram;
    /**
     * Removes a program from registered programs and disposes it.
     * @param name Name of the registered program.
     */
    deregisterProgram(name: string): void;
    /**
     * Checks if a registered program with a given name is available.
     * @param name Name of the registered program.
     * @returns Whether the program is available or not.
     */
    hasProgram(name: string): boolean;
    /**
     * Retrieves a registered program with a given name.
     * @param name Name of the registered program.
     * @returns A GlueProgram instance or undefined if there is no program with such name.
     */
    program(name: string): GlueProgram | undefined;
    /**
     * Applies a Glue-compatible GLSL shader without registering a new program.
     * NOTE: Glue uses a preprocessor for its GLSL programs.
     * Consult the documentation for more information.
     * @param fragmentShader Glue-compatible GLSL fragment shader code.
     * @param vertexShader Glue-compatible GLSL vertex shader code.
     * @param uniforms Uniform values (optional).
     */
    apply(fragmentShader?: string, vertexShader?: string, uniforms?: Record<string, GlueUniformValue>): void;
    /**
     * Renders the final image to the canvas. Must be called after everything else.
     * Other calls may still render to the canvas, there is no guarantee that
     * nothing will be rendered before this function is called.
     */
    render(): void;
    /**
     * Disposes of this Glue object, all of its associated textures, programs and framebuffers.
     * After this operation, the Glue object may not be utilized further. A new Glue instance
     * must be created for further use.
     */
    dispose(): void;
    /**
     * Registers a GLSL partial as an import to be used with the @use syntax.
     * Unlike other register functions, this will replace the currently registered import with the same name.
     * @param name Name of the partial.
     * @param source Source of the partial.
     */
    registerImport(name: string, source: string): void;
    /**
     * Removes a GLSL partial from registered imports
     * @param name Name of the partial.
     */
    deregisterImport(name: string): void;
    /**
     * Creates a new drawing group and switches to it.
     */
    begin(): void;
    /**
     * Draws the current drawing group onto the higher group's framebuffer.
     * @param options Drawing options.
     */
    end(options?: GlueTextureDrawOptions): void;
    /**
     * Internal function for custom GlueProgram development.
     * Do not use or expect this function to be available
     * in this form forever.
     */
    _switchFramebuffer(): void;
    /**
     * Internal function for custom GlueProgram development.
     * Do not use or expect this function to be available
     * in this form forever.
     */
    _createTexture(target?: number): WebGLTexture;
    private checkDisposed;
    private get currentGroup();
}
