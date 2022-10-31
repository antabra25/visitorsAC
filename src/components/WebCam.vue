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
      // Get access to the camera!
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: true
          })
          .then((stream) => {// Create a video element
            this.$refs.video.srcObject = stream; // set the source of the video element to the stream
            this.$refs.video.play();
          });
      }
    },
    capture() {
      this.pause(); // stop the video
      let ctx = this.$refs.canvas.getContext("2d"); // get the context of the canvas
      ctx.drawImage(this.$refs.video, 0, 0, 320, 320);//320, 320
      const image = this.$refs.canvas.toDataURL(); // "image/png"
      this.$emit("uploadPhoto", image); // emit the image to the parent component

    },
    displayPhoto() {
      let ctx = this.$refs.canvas.getContext("2d"); // get the context of the canvas
      let img = new Image();
      img.src = this.photo;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 320, 320);
      };
    },
    pause() { // stop the video
      this.$refs.video.pause();
    },
    resume() { // play the video
      this.$refs.video.play();
    }

  },
  watch: {
    photo() {
      this.displayPhoto();
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