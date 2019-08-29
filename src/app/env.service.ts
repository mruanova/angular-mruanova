export class EnvService {
  constructor() {
    // The values that are defined here are the default values that can be overridden by env.js
  }

  // API url
  public apiUrl = '';

  // Whether or not to enable debug mode
  public debug = true;

  // access token
  public mapbox = '';
}