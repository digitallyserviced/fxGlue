import { Glue } from './Glue';
import { GlueUniforms, GlueUniformValue } from './GlueUniforms';
import { GlueSourceType } from './GlueUtils';
export declare class GlueProgramError extends Error {
    vertexShaderErrors: Record<number, string[]>;
    fragmentShaderErrors: Record<number, string[]>;
}
export declare class GlueProgram {
    private gl;
    private glue;
    readonly uniforms: GlueUniforms;
    private _vertexShader?;
    private _fragmentShader?;
    private _program;
    private _disposed;
    /**
     * Creates a new GlueProgram instance.
     * This constructor should not be called from outside of the Glue class.
     * @param gl WebGL context.
     * @param glue Glue instance.
     * @param fragmentShaderSource Glue-compatible GLSL fragment shader source.
     * @param vertexShaderSource Glue-compatible GLSL vertex shader source.
     * @throws When compilation fails a GlueProgramError (containing vertexShaderErrors and fragmentShaderErrors properties) will be thrown.
     */
    constructor(gl: WebGLRenderingContext, glue: Glue, fragmentShaderSource: string, vertexShaderSource: string, customImports?: Record<string, string>);
    /**
     * Applies the program to the current framebuffer.
     * @param uniforms Uniform values (optional).
     * @param mask Mask texture identifier or image.
     */
    apply(uniforms?: Record<string, GlueUniformValue>, mask?: string | GlueSourceType): void;
    /**
     * Disposes of this GlueProgram object.
     * After this operation, the GlueProgram object may not be utilized further.
     * A new GlueProgram instance must be created for further use.
     */
    dispose(): void;
    private parseErrors;
    private checkDisposed;
    private attachShader;
}
