import React, { useEffect, useRef, useState } from 'react';

const GRID_W = 72;
const GRID_H = 36;
const SPRING = .08;
const DAMPING = .9;
const STEP = .1;

const vertexSource = `#version 300 es
in vec2 aPos; in vec2 aUv; in vec2 aDisp;
out vec2 vUv; out float vMag;
void main(){ gl_Position=vec4(aPos+aDisp,0.,1.); vUv=aUv; vMag=length(aDisp); }`;

const fragmentSource = `#version 300 es
precision highp float;
in vec2 vUv; in float vMag; out vec4 outColor;
uniform sampler2D uTex;
void main(){
  float shift=.005*clamp(vMag*8.,0.,1.);
  vec4 base=texture(uTex,vUv);
  float warm=texture(uTex,vUv+vec2(shift,0.)).a;
  float pale=texture(uTex,vUv-vec2(shift,0.)).a;
  vec3 color=base.rgb*base.a;
  color+=vec3(.95,.72,.22)*max(0.,warm-base.a);
  color+=vec3(.96,.95,.91)*max(0.,pale-base.a);
  outColor=vec4(color,max(base.a,max(warm,pale)));
}`;

function shader(gl, type, source) {
  const item = gl.createShader(type);
  gl.shaderSource(item, source);
  gl.compileShader(item);
  if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) return null;
  return item;
}

export function MeshHeroTitle({ reduceMotion = false }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lowPowerDevice = window.innerWidth < 1100
      || window.matchMedia('(pointer: coarse)').matches
      || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)
      || (navigator.deviceMemory && navigator.deviceMemory < 4);
    if (reduceMotion || lowPowerDevice || document.hidden) return undefined;
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: true });
    if (!wrapper || !gl) return undefined;

    const vs = shader(gl, gl.VERTEX_SHADER, vertexSource);
    const fs = shader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!vs || !fs) return undefined;
    const program = gl.createProgram();
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;

    const count = (GRID_W + 1) * (GRID_H + 1);
    const positions = new Float32Array(count * 2);
    const uvs = new Float32Array(count * 2);
    const displacement = new Float32Array(count * 2);
    const velocity = new Float32Array(count * 2);
    for (let y = 0; y <= GRID_H; y += 1) for (let x = 0; x <= GRID_W; x += 1) {
      const i = y * (GRID_W + 1) + x;
      const u = x / GRID_W; const v = y / GRID_H;
      positions[i * 2] = u * 2 - 1; positions[i * 2 + 1] = 1 - v * 2;
      uvs[i * 2] = u; uvs[i * 2 + 1] = v;
    }
    const indices = new Uint32Array(GRID_W * GRID_H * 6);
    let p = 0;
    for (let y = 0; y < GRID_H; y += 1) for (let x = 0; x < GRID_W; x += 1) {
      const a = y * (GRID_W + 1) + x; const b = a + 1; const c = a + GRID_W + 1; const d = c + 1;
      indices[p++] = a; indices[p++] = c; indices[p++] = b; indices[p++] = b; indices[p++] = c; indices[p++] = d;
    }

    const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
    const bind = (data, attribute, usage) => {
      const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, data, usage);
      const location = gl.getAttribLocation(program, attribute); gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
      return buffer;
    };
    const posBuffer = bind(positions, 'aPos', gl.STATIC_DRAW);
    const uvBuffer = bind(uvs, 'aUv', gl.STATIC_DRAW);
    const dispBuffer = bind(displacement, 'aDisp', gl.DYNAMIC_DRAW);
    const indexBuffer = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    const texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let cancelled = false;
    const rebuild = async () => {
      const rect = wrapper.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(2, Math.round(rect.width * dpr)); canvas.height = Math.max(2, Math.round(rect.height * dpr)); gl.viewport(0, 0, canvas.width, canvas.height);
      try { await document.fonts.load(`300 ${Math.round(72 * dpr)}px Montserrat`); await document.fonts.ready; } catch { /* font fallback is safe */ }
      if (cancelled) return;
      const source = document.createElement('canvas'); source.width = canvas.width; source.height = canvas.height;
      const ctx = source.getContext('2d'); const size = Math.min(canvas.width * .105, 72 * dpr);
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.font = `300 ${size}px Montserrat, sans-serif`;
      if ('letterSpacing' in ctx) ctx.letterSpacing = `${size * .16}px`;
      const x = canvas.width * .035; const gap = canvas.height / 3;
      ctx.fillStyle = '#f6f2eb'; ctx.fillText('PLAY', x, gap * .5);
      ctx.fillText('BEYOND', x, gap * 1.5);
      ctx.fillStyle = '#f3d67a'; ctx.fillText('THE GAME', x, gap * 2.5);
      gl.bindTexture(gl.TEXTURE_2D, texture); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source); setReady(true);
    };
    const observer = new ResizeObserver(rebuild); observer.observe(wrapper); rebuild();

    const cursor = { x: 99, y: 99, px: 99, py: 99, vx: 0, vy: 0, inside: false };
    const move = (event) => {
      const rect = canvas.getBoundingClientRect(); const x = ((event.clientX - rect.left) / rect.width) * 2 - 1; const y = 1 - ((event.clientY - rect.top) / rect.height) * 2;
      if (!cursor.inside) { cursor.px = x; cursor.py = y; cursor.inside = true; } cursor.x = x; cursor.y = y;
    };
    const leave = () => { cursor.inside = false; cursor.x = 99; cursor.y = 99; cursor.vx = 0; cursor.vy = 0; };
    wrapper.addEventListener('pointermove', move); wrapper.addEventListener('pointerleave', leave);

    let frame = 0;
    const draw = () => {
      cursor.vx = cursor.x - cursor.px; cursor.vy = cursor.y - cursor.py;
      if (Math.hypot(cursor.vx, cursor.vy) > .3) { cursor.vx = 0; cursor.vy = 0; }
      cursor.px = cursor.x; cursor.py = cursor.y;
      for (let i = 0; i < count; i += 1) {
        const j = i * 2; const dx = displacement[j]; const dy = displacement[j + 1];
        const distance = Math.hypot(cursor.x - (positions[j] + dx), cursor.y - (positions[j + 1] + dy));
        const influence = Math.max(0, 1 / (1 + distance / .055) - .1);
        let vx = (velocity[j] + cursor.vx * 1.8 * influence - dx * SPRING) * DAMPING;
        let vy = (velocity[j + 1] + cursor.vy * 1.8 * influence - dy * SPRING) * DAMPING;
        velocity[j] = vx; velocity[j + 1] = vy; displacement[j] = Math.max(-1, Math.min(1, dx + vx * STEP)); displacement[j + 1] = Math.max(-1, Math.min(1, dy + vy * STEP));
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, dispBuffer); gl.bufferSubData(gl.ARRAY_BUFFER, 0, displacement);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texture); gl.uniform1i(gl.getUniformLocation(program, 'uTex'), 0);
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.bindVertexArray(vao); gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_INT, 0);
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelled = true; cancelAnimationFrame(frame); observer.disconnect(); wrapper.removeEventListener('pointermove', move); wrapper.removeEventListener('pointerleave', leave);
      [posBuffer, uvBuffer, dispBuffer, indexBuffer].forEach((buffer) => gl.deleteBuffer(buffer)); gl.deleteTexture(texture); gl.deleteVertexArray(vao); gl.deleteProgram(program); gl.deleteShader(vs); gl.deleteShader(fs);
    };
  }, [reduceMotion]);

  return (
    <h1 className={`hero__mesh-title ${ready ? 'is-ready' : ''}`} ref={wrapperRef}>
      <span className="hero__mesh-fallback">Play<br />beyond<br /><em>the game</em></span>
      <canvas ref={canvasRef} aria-hidden="true" />
    </h1>
  );
}
