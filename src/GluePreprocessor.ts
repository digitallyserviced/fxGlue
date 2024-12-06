import { imports } from "./imports";

const vertexShaderHeader = `
layout(location = 0) in vec2 pos;
#define position pos
`
  // #define shadertoy_out_color gl_FragColor
  // #define main mainImage(out vec4 gl_FragColor, in vec2 gl_FragCoord)
   
function shaderToyHeader() {
    return `
out vec4 shadertoy_out_color;

void mainImage( out vec4 fragColor, in vec2 fragCoord );
void st_assert( bool cond );
void st_assert( bool cond, int v );

void st_assert( bool cond, int v ) {
    if(!cond) {
        if(v==0) shadertoy_out_color.x = -1.0;
        else if(v==1) shadertoy_out_color.y = -1.0;
        else if(v==2) shadertoy_out_color.z = -1.0;
        else shadertoy_out_color.w = -1.0;
    }
}
void st_assert( bool cond ) {
    if(!cond) shadertoy_out_color.x = -1.0;
}



`;
}

const shaderToyMain = `

void /**/ main() {
    shadertoy_out_color = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 color = vec4(1e20);
    mainImage(color, gl_FragCoord.xy);
    if(shadertoy_out_color.x < 0.0) color = vec4(1.0, 0.0, 0.0, 1.0);
    if(shadertoy_out_color.y < 0.0) color = vec4(0.0, 1.0, 0.0, 1.0);
    if(shadertoy_out_color.z < 0.0) color = vec4(0.0, 0.0, 1.0, 1.0);
    if(shadertoy_out_color.w < 0.0) color = vec4(1.0, 1.0, 0.0, 1.0);
    shadertoy_out_color = vec4(color.xyz, 1.0);
}
`



const fragmentShaderCommonHeader = (includeMain = true) => `
${shaderToyHeader()}
#define texture2D texture
`

const getShaderHeader = (append:string, redefineFragColor = false,
                         includeMain = true 
                        ): string => `#version 300 es
#ifdef GL_ES
precision highp float;
precision highp int;
precision mediump sampler3D;
#endif


${append}

`.trimLeft();

// const updateLegacyFilterMain = (source) => {
//
//
// }
   
// const shaderPrefix = 'precision mediump float;\nprecision mediump int;\n';

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
export function gluePreprocessShader(
  source: string,
  vertex = false,
  customImports: Record<string, string> = {}
): GluePreprocessorResult {

  let processedShader = '';

  // Uniforms
  processedShader += 'uniform sampler2D iTexture;\n';
  processedShader += 'uniform sampler2D iMask;\n';
  processedShader += 'uniform bool iMaskEnabled;\n';
  processedShader += 'uniform vec2 iResolution;\n';

  const lines = source.split('\n');
  const lineMap: Record<number, number> = {};

  let currentInputLine = 0;
  let currentOutputLine = processedShader.split('\n').length;
  const included: string[] = [];

  const mainRegEex = /void\s*main\s*\(\s*\)\s*/;
  const mainImageRegEex = /void\s*mainImage\s*\(\s*/;
  let mainFound = false;
  let mainImageFound = false;

  for (const line of lines) {
    let trimmed = line.trim();
    if (trimmed.startsWith('@use ')) {
      trimmed = trimmed.replace('@use ', '');
      if (
        (customImports[trimmed] || imports[trimmed]) &&
        !included.includes(trimmed)
      ) {
        processedShader += (customImports[trimmed] || imports[trimmed]) + '\n';
        currentOutputLine = processedShader.split('\n').length;
        included.push(trimmed);
      }

      currentInputLine++;

      continue;
    }

    if (mainRegEex.test(line)) {
      mainFound = true;
    }
    if (mainImageRegEex.test(line)) {
      mainImageFound = true;
    }
    if (vertex) {
      processedShader += line + '\n';
      lineMap[currentOutputLine] = currentInputLine;
      currentInputLine++;
      currentOutputLine++;
      continue;
    }
    // if (mainFound && !mainImageFound) {
    //   processedShader += line.replace(mainRegEex,newFunction()) + '\n';
    //   currentOutputLine++;
    //   lineMap[currentOutputLine] = currentInputLine;
    //   currentInputLine++;
    //   continue;
    // }
    // if (mainFound && mainImageFound) {
    //   processedShader += line + '\n';
    //   currentOutputLine++;
    //   lineMap[currentOutputLine] = currentInputLine;
    //   currentInputLine++;
    //   continue;
    // }

    processedShader += line + '\n';

    lineMap[currentOutputLine] = currentInputLine;
    currentInputLine++;
    currentOutputLine++;
  }

  const includeMain = (!mainFound && mainImageFound) 

  let processedShaderHeader = getShaderHeader(fragmentShaderCommonHeader(includeMain), mainImageFound, mainFound);
  if (vertex) {
    processedShaderHeader = getShaderHeader(vertexShaderHeader, false, false);
  } else {
    if (!mainImageFound && mainFound) {
    processedShader = processedShader.replace(mainRegEex,newFunction());
    mainImageFound = true;
    mainFound = false;
    }
    if(mainFound && mainImageFound) {
      processedShader = processedShader.replace(mainRegEex,'void mainOld()');
      mainFound = false;
      processedShader = processedShader.replace(/^\s*mainImage\(/g,'//mainImage(');
    }
    if (!mainFound && mainImageFound) {
      processedShader = `${processedShader}\n${shaderToyMain}`;
      mainFound = true;
       }
  }

  processedShader = processedShaderHeader + processedShader;
  console.log('processedShader', processedShader);

  return {
    lineMap,
    source: processedShader,
  };
}
function newFunction(
  fnName = 'mainImage'
): string {
    return `\n\n#define gl_FragColor fragColor\n\nvoid ${fnName}(out vec4 fragColor, in vec2 fragCoord) `;

}

