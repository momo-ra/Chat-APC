import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useThemeMode } from '../../contexts/ThemeContext';

const MetaballsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight * 0.9;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const numMetaballs = 25;
    const metaballs: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = [];

    for (let i = 0; i < numMetaballs; i++) {
      const radius = Math.random() * 60 + 20;
      metaballs.push({
        x: Math.random() * (width - 2 * radius) + radius,
        y: Math.random() * (height - 2 * radius) + radius,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        r: radius * 0.75
      });
    }

    // Colors based on theme
    const primaryColor = isDark 
      ? 'vec3(0.0, 0.608, 0.894)'  // #009BE4 in RGB normalized
      : 'vec3(0.145, 0.388, 0.922)'; // #2563EB in RGB normalized

    const backgroundColor = isDark
      ? 'vec3(0.039, 0.055, 0.180)'  // #0a0e2e
      : 'vec3(0.98, 0.98, 0.99)';    // #F8FAFC - light background

    const vertexShaderSrc = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSrc = `
      precision highp float;
      const float WIDTH = ${width.toFixed(1)};
      const float HEIGHT = ${height.toFixed(1)};
      uniform vec3 metaballs[${numMetaballs}];

      void main(){
        float x = gl_FragCoord.x;
        float y = gl_FragCoord.y;
        float sum = 0.0;
        
        for (int i = 0; i < ${numMetaballs}; i++) {
          vec3 metaball = metaballs[i];
          float dx = metaball.x - x;
          float dy = metaball.y - y;
          float radius = metaball.z;
          sum += (radius * radius) / (dx * dx + dy * dy);
        }

        if (sum >= 0.99) {
          vec3 color = mix(
            ${primaryColor}, 
            ${backgroundColor}, 
            max(0.0, 1.0 - (sum - 0.99) * 80.0)
          );
          gl_FragColor = vec4(color, ${isDark ? '0.4' : '0.2'});
          return;
        }

        gl_FragColor = vec4(${backgroundColor}, 0.0);
      }
    `;

    function compileShader(source: string, type: number) {
      const shader = gl.createShader(type);
      if (!shader) throw 'Could not create shader';
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw 'Shader compile failed with: ' + gl.getShaderInfoLog(shader);
      }
      return shader;
    }

    const vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const vertexData = new Float32Array([
      -1.0,  1.0,
      -1.0, -1.0,
       1.0,  1.0,
       1.0, -1.0,
    ]);

    const vertexDataBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

    const positionHandle = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionHandle);
    gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, false, 2 * 4, 0);

    const metaballsHandle = gl.getUniformLocation(program, 'metaballs');

    let animationId: number;

    function loop() {
      for (let i = 0; i < numMetaballs; i++) {
        const metaball = metaballs[i];
        metaball.x += metaball.vx;
        metaball.y += metaball.vy;

        if (metaball.x < metaball.r || metaball.x > width - metaball.r) metaball.vx *= -1;
        if (metaball.y < metaball.r || metaball.y > height - metaball.r) metaball.vy *= -1;
      }

      const dataToSendToGPU = new Float32Array(3 * numMetaballs);
      for (let i = 0; i < numMetaballs; i++) {
        const baseIndex = 3 * i;
        const mb = metaballs[i];
        dataToSendToGPU[baseIndex + 0] = mb.x;
        dataToSendToGPU[baseIndex + 1] = mb.y;
        dataToSendToGPU[baseIndex + 2] = mb.r;
      }
      
      gl.uniform3fv(metaballsHandle, dataToSendToGPU);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(loop);
    }

    loop();

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.9;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [isDark]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: isDark ? 0.3 : 0.15,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </Box>
  );
};

export default MetaballsBackground;

