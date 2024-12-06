/**
 * Blend mode. Do not use the string values directly.
 */
export declare enum GlueBlendMode {
    NORMAL = 0,
    DISSOLVE = 1,
    DARKEN = 2,
    MULTIPLY = 3,
    COLOR_BURN = 4,
    LINEAR_BURN = 5,
    LIGHTEN = 6,
    SCREEN = 7,
    COLOR_DODGE = 8,
    LINEAR_DODGE = 9,
    OVERLAY = 10,
    SOFT_LIGHT = 11,
    HARD_LIGHT = 12,
    VIVID_LIGHT = 13,
    LINEAR_LIGHT = 14,
    PIN_LIGHT = 15,
    HARD_MIX = 16,
    DIFFERENCE = 17,
    EXCLUSION = 18,
    SUBTRACT = 19,
    DIVIDE = 20,
    HUE = 21,
    SATURATION = 22,
    COLOR = 23,
    LUMINOSITY = 24,
    LIGHTER_COLOR = 25,
    DARKER_COLOR = 26
}
export declare const defaultFragmentShader = "\nvoid mainImage( out vec4 fragColor, in vec2 fragCoord ){\n//  fragColor = vec4(0.0,0.0,1.0,1.0);\n  vec2 uv = fragCoord.xy / iResolution;\n  fragColor = texture(iTexture, uv);\n}\n";
export declare const defaultVertexShader = "\n  void main() { gl_Position = vec4(pos.xy,0.0,1.0); }\n";
export declare const blendFragmentShader: string;
