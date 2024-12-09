varying vec3 vNormal;
varying vec3 vLightDirection;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vLightDirection = normalize(vec3(0.0, 1.0, 0.0)); // Example light direction (can be a uniform)
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
