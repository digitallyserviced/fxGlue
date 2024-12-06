export interface GluePreprocessorResult {
    lineMap: Record<number, number>;
    source: string;
}
/**
 * Preprocesses the Glue-compatible GLSL shader source.
 * @param source Shader source.
 * @param vertex Flag whether the shader source belongs to a vertex shader.
 * @returns Result containing line map (for debugging) and a processed source.
 */
export declare function gluePreprocessShader(source: string, vertex?: boolean, customImports?: Record<string, string>): GluePreprocessorResult;
