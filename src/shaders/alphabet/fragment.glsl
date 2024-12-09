uniform vec3 baseColor;
uniform float ambientIntensity;
uniform vec3 lightPosition; // Light position passed from JavaScript
varying vec3 vNormal;
varying vec3 vLightDirection;

void main() {
  // Simple diffuse lighting model
  float diffuse = max(dot(vNormal, vLightDirection), 0.0);
  
  // Ambient lighting
  vec3 ambient = baseColor * ambientIntensity;
  
  // Final color is a combination of ambient and diffuse
  vec3 color = ambient + baseColor * diffuse;
  
  gl_FragColor = vec4(color, 1.0);
}