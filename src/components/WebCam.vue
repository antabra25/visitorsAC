<template>
  <div class="webcam">
    <video id="video" ref="video" height="320" width="320" autoplay></video>
    <div class="controls flex flex-row gap-x-2.5 justify-center mt-4">
      <small-button @click="capture">Capturar</small-button>
      <small-button @click="resume">Reiniciar</small-button>
    </div>
    <canvas id="canvas" ref="canvas" height="320" width="320"></canvas>
  </div>

</template>

<script>

import SmallButton from "./SmallButton.vue";

export default {
  name: "WebCam",
  emits: ["uploadPhoto"],
  components: {
    SmallButton
  },
  data() {
    return {};
  }
  , methods: {

    mediaSetup() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: true
          })
          .then((stream) => {
            this.$refs.video.srcObject = stream;
            this.$refs.video.play();
          });
      }
    },
    capture() {
      this.pause();
      let ctx = this.$refs.canvas.getContext("2d");
      ctx.drawImage(this.$refs.video, 0, 0, 240, 320);
      const image = this.$refs.canvas.toDataURL();
      this.$emit("uploadPhoto", image);

    },
    pause() {
      this.$refs.video.pause();
    },
    resume() {
      this.$refs.video.play();
    }

  },
  mounted() {
    this.mediaSetup();
  }
};
</script>

<style scoped>

 /**
width: { min: 240, ideal: 1280, max: 1920 },
height: { min: 320, ideal: 720, max: 1080 }
**/

#canvas {
  display: none;
}

.webcam {
  position: absolute;
  top: 225px;
  left: 1080px;

}
</style>