function Cassino3D() {
  if (!window.WebGLRenderingContext) {
    return <p>Seu dispositivo não suporta Cassino 3D. Use a versão simplificada.</p>;
  }
  return <canvas id="cassino3d" />;
}

export default Cassino3D;
