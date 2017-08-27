export interface SimConfig {
  interval: number;
  state: any;
  effects: Array<any>;
  controls: Array<{type, valueToTrack, label}>;
}
