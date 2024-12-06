import { Glue } from './Glue';
export declare type GlueUniformValue = string | number | boolean | Float32List | Int32List;
export declare class GlueUniforms {
    private gl;
    private glue;
    private program;
    private uniforms;
    /**
     * Creates a new GlueUniforms instance.
     * This constructor should not be called from outside of the Glue class.
     * @param gl WebGL context.
     * @param glue Glue instance.
     */
    constructor(gl: WebGLRenderingContext, glue: Glue, program: WebGLProgram);
    /**
     * Get last uniform value.
     * NOTE: This will not reflect the current state of WebGL
     * if the value is changed outside of this class.
     * @param name Uniform name.
     * @returns The value.
     */
    get(name: string): GlueUniformValue | undefined;
    /**
     * Sets the uniform to this value.
     * @param name Uniform name.
     * @param value Value. String values are ONLY accepted for vec3/vec4 color uniforms in form of a hex string (#FFFFFF).
     */
    set(name: string, value: GlueUniformValue): void;
    /**
     * Sets all uniforms in the object where key is the uniform name and value is the value to be set.
     * @param object Object with values. String values are ONLY accepted for vec3/vec4 color uniforms in form of a hex string (#FFFFFF) or sampler2D uniforms in form of the name of a registered texture.
     */
    setAll(object: Record<string, GlueUniformValue>): void;
    private setOne;
}
