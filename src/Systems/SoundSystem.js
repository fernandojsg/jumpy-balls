import { System } from "ecsy";
import * as THREE from "three";
import { Sound } from "../Components/components.js";
import PositionalAudioPolyphonic from "../vendor/PositionalAudioPolyphonic.js";

export class SoundSystem extends System {
  init() {
    this.listener = new THREE.AudioListener();
  }
  execute() {
    this.queries.sounds.added.forEach(entity => {
      const component = entity.getMutableComponent(Sound);
      const sound = new PositionalAudioPolyphonic(this.listener, 10);
      const audioLoader = new THREE.AudioLoader();
      audioLoader.load("/assets/" + component.url, buffer => {
        sound.setBuffer(buffer);
      });
      component.sound = sound;
    });
  }
}

SoundSystem.queries = {
  sounds: {
    components: [Sound],
    listen: {
      added: true,
      removed: true,
      changed: true // [Sound]
    }
  }
};