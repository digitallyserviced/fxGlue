"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glue = void 0;
const GlueGroup_1 = require("./GlueGroup");
const GlueProgram_1 = require("./GlueProgram");
const GlueShaderSources_1 = require("./GlueShaderSources");
const GlueTexture_1 = require("./GlueTexture");
class Glue {
    /**
     * Create a new Glue instance around a given WebGL context.
     * @param gl WebGL context obtained by calling .getContext('webgl') or by using glueGetWebGLContext.
     */
    constructor(gl) {
        this.gl = gl;
        this._programs = {};
        this._textures = {};
        this._imports = {};
        this._width = 0;
        this._height = 0;
        this._disposed = false;
        this._groups = [];
        this._currentGroupIndex = 0;
        this.registerProgram('~default');
        this.registerProgram('~blend', GlueShaderSources_1.blendFragmentShader);
        this._groups.push(new GlueGroup_1.GlueGroup(gl, this));
    }
    /**
     * Sets the size of the output. Must be called before everything else.
     * @param width Width (px).
     * @param height Height (px).
     */
    setSize(width, height) {
        this.checkDisposed();
        for (const group of this._groups) {
            group.setSize(width, height);
        }
        this._width = width;
        this._height = height;
    }
    /**
     * Output width (px).
     */
    get width() {
        return this._width;
    }
    /**
     * Output height (px).
     */
    get height() {
        return this._height;
    }
    /**
     * Creates and registers a texture for later use.
     * Texture names must not start with "~".
     * @param name Texture name (must not be registered already).
     * @param source HTMLImageElement, HTMLVideoElement or HTMLCanvasElement with the texture. Must be loaded.
     * @returns A new GlueTexture instance.
     */
    registerTexture(name, source) {
        this.checkDisposed();
        if (this._textures[name]) {
            throw new Error('A program with this name already exists: ' + name);
        }
        const texture = new GlueTexture_1.GlueTexture(this.gl, this, source);
        this._textures[name] = texture;
        return texture;
    }
    /**
     * Removes a texture from registered textures and disposes it.
     * @param name Name of the registered texture.
     */
    deregisterTexture(name) {
        var _a;
        this.checkDisposed();
        (_a = this._textures[name]) === null || _a === void 0 ? void 0 : _a.dispose();
        delete this._textures[name];
    }
    /**
     * Checks if a registered texture with a given name is available.
     * @param name Name of the registered texture.
     * @returns Whether the texture is available or not.
     */
    hasTexture(name) {
        return !!this._textures[name];
    }
    /**
     * Retrieves a registered texture with a given name.
     * @param name Name of the registered texture.
     * @returns A GlueTexture instance or undefined if there is no texture with such name.
     */
    texture(name) {
        this.checkDisposed();
        return this._textures[name];
    }
    /**
     * Draws a HTMLImageElement, HTMLVideoElement or a HTMLCanvasElement without registering a new texture.
     * @param source HTMLImageElement, HTMLVideoElement or HTMLCanvasElement with the texture. Must be loaded.
     * @param options Settings for how the texture should be painted: X/Y offset, width/height and more.
     */
    draw(source, options) {
        const texture = new GlueTexture_1.GlueTexture(this.gl, this, source);
        texture.use();
        texture.draw(options);
        texture.dispose();
    }
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
    registerProgram(name, fragmentShader, vertexShader) {
        this.checkDisposed();
        if (this._programs[name]) {
            throw new Error('A program with this name already exists: ' + name);
        }
        const program = new GlueProgram_1.GlueProgram(this.gl, this, fragmentShader || GlueShaderSources_1.defaultFragmentShader, vertexShader || GlueShaderSources_1.defaultVertexShader, this._imports);
        this._programs[name] = program;
        return program;
    }
    /**
     * Removes a program from registered programs and disposes it.
     * @param name Name of the registered program.
     */
    deregisterProgram(name) {
        var _a;
        this.checkDisposed();
        (_a = this._programs[name]) === null || _a === void 0 ? void 0 : _a.dispose();
        delete this._programs[name];
    }
    /**
     * Checks if a registered program with a given name is available.
     * @param name Name of the registered program.
     * @returns Whether the program is available or not.
     */
    hasProgram(name) {
        return !!this._programs[name];
    }
    /**
     * Retrieves a registered program with a given name.
     * @param name Name of the registered program.
     * @returns A GlueProgram instance or undefined if there is no program with such name.
     */
    program(name) {
        this.checkDisposed();
        return this._programs[name];
    }
    /**
     * Applies a Glue-compatible GLSL shader without registering a new program.
     * NOTE: Glue uses a preprocessor for its GLSL programs.
     * Consult the documentation for more information.
     * @param fragmentShader Glue-compatible GLSL fragment shader code.
     * @param vertexShader Glue-compatible GLSL vertex shader code.
     * @param uniforms Uniform values (optional).
     */
    apply(fragmentShader, vertexShader, uniforms) {
        const program = new GlueProgram_1.GlueProgram(this.gl, this, fragmentShader || GlueShaderSources_1.defaultFragmentShader, vertexShader || GlueShaderSources_1.defaultVertexShader, this._imports);
        program.apply(uniforms);
        program.dispose();
    }
    /**
     * Renders the final image to the canvas. Must be called after everything else.
     * Other calls may still render to the canvas, there is no guarantee that
     * nothing will be rendered before this function is called.
     */
    render() {
        var _a;
        this.checkDisposed();
        while (this._currentGroupIndex > 0) {
            this.end();
        }
        this.currentGroup._markAsFinal();
        (_a = this.program('~default')) === null || _a === void 0 ? void 0 : _a.apply();
    }
    /**
     * Disposes of this Glue object, all of its associated textures, programs and framebuffers.
     * After this operation, the Glue object may not be utilized further. A new Glue instance
     * must be created for further use.
     */
    dispose() {
        if (this._disposed) {
            return;
        }
        for (const group of this._groups) {
            group.dispose();
        }
        for (const program of Object.values(this._programs)) {
            program.dispose();
        }
        for (const texture of Object.values(this._textures)) {
            texture.dispose();
        }
        this._groups = [];
        this._programs = {};
        this._textures = {};
        this._disposed = true;
    }
    /**
     * Registers a GLSL partial as an import to be used with the @use syntax.
     * Unlike other register functions, this will replace the currently registered import with the same name.
     * @param name Name of the partial.
     * @param source Source of the partial.
     */
    registerImport(name, source) {
        this.checkDisposed();
        this._imports[name] = source;
    }
    /**
     * Removes a GLSL partial from registered imports
     * @param name Name of the partial.
     */
    deregisterImport(name) {
        this.checkDisposed();
        delete this._imports[name];
    }
    /**
     * Creates a new drawing group and switches to it.
     */
    begin() {
        const newIndex = this._currentGroupIndex + 1;
        if (!this._groups[newIndex]) {
            this._groups[newIndex] = new GlueGroup_1.GlueGroup(this.gl, this);
            this._groups[newIndex].setSize(this._width, this._height);
        }
        this._currentGroupIndex = newIndex;
    }
    /**
     * Draws the current drawing group onto the higher group's framebuffer.
     * @param options Drawing options.
     */
    end(options = {}) {
        const group = this.currentGroup;
        group.use();
        this._currentGroupIndex--;
        group.draw(options);
    }
    /**
     * Internal function for custom GlueProgram development.
     * Do not use or expect this function to be available
     * in this form forever.
     */
    _switchFramebuffer() {
        this.checkDisposed();
        this.currentGroup._switchFramebuffer();
    }
    /**
     * Internal function for custom GlueProgram development.
     * Do not use or expect this function to be available
     * in this form forever.
     */
    _createTexture(target) {
        const gl = this.gl;
        const texture = gl.createTexture();
        if (!texture) {
            throw new Error('Unable to create texture.');
        }
        if (!target) {
            target = gl.TEXTURE0;
        }
        gl.activeTexture(target);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        return texture;
    }
    checkDisposed() {
        if (this._disposed) {
            throw new Error('This Glue object has been disposed.');
        }
    }
    get currentGroup() {
        return this._groups[this._currentGroupIndex];
    }
}
exports.Glue = Glue;
