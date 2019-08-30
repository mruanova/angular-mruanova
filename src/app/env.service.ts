export class EnvService {
  constructor() {
    // The values that are defined here are the default values that can be overridden by env.js
  }

  // API url
  public apiUrl = '';

  // Whether or not to enable debug mode
  public debug = true;

  // map
  public center = null;
  public zoom = null;
  public token1 = '';
  public token2 = '';
  public token3 = '';
  public style = '';
}