uniform vec3 baseColor;
uniform float ambientIntensity;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Ambient lighting contribution
  vec3 ambientLight = vec3(1.0) * ambientIntensity;

  // Simple directional lighting using light position
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // example light direction
  float diff = max(dot(vNormal, lightDir), 0.0);
  
  // Final color
  vec3 color = baseColor * diff + ambientLight;
  
  gl_FragColor = vec4(color, 1.0);
}
