export const CONSTRAINTS = {
  audio: true
};

class Recorder {

  mDevices;
  chunks;
  mRecorder;


  async init() {
    if (navigator.mediaDevices) {
      this.mDevices = navigator.mediaDevices.getUserMedia(CONSTRAINTS);
      let stream = await this.mDevices;
      this.mRecorder = new MediaRecorder(stream);
      visualize(stream);
      this.initListeners();
    }
  }


  record() {
    if (this.mRecorder) {
      this.mRecorder.start();
      console.log(this.mRecorder.state);
      console.log("recorder started");
    }
  }


  stopRecord() {
    if (this.mRecorder) {
      this.mRecorder.stop();
      console.log(this.mRecorder.state);
    }
  }

  initListeners() {

    let self = this;

    this.mRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      // var clipName = prompt('Enter a name for your sound clip');

      // var clipContainer = document.createElement('article');
      // var clipLabel = document.createElement('p');
      // var audio = document.createElement('audio');
      // var deleteButton = document.createElement('button');

      // clipContainer.classList.add('clip');
      // audio.setAttribute('controls', '');
      // deleteButton.innerHTML = "Delete";
      // clipLabel.innerHTML = clipName;

      // clipContainer.appendChild(audio);
      // clipContainer.appendChild(clipLabel);
      // clipContainer.appendChild(deleteButton);
      // soundClips.appendChild(clipContainer);

      // audio.controls = true;
      var blob = new Blob(self.chunks, { 'type' : 'audio/ogg; codecs=opus' });
      self.chunks = [];
      var audioURL = URL.createObjectURL(blob);
      console.log("recorder stopped", audioURL);
    }

    this.mRecorder.ondataavailable = function(e) {
      self.chunks.push(e.data);
    }
  }

  play() {}
  stopPlay() {}
}

export default new Recorder()