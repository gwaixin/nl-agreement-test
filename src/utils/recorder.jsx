export const CONSTRAINTS = {
  audio: true
};

export const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise(resolve => {
      reader.onloadend = () => {
          resolve(reader.result);
      };
  });
};

class Recorder {

  chunks = [];
  mRecorder;
  mRecorded;
  playerId;


  init() {
    return new Promise(async (resolve, reject) => {
      if (navigator.mediaDevices) {
        // this.playerId = playerId;

        let stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
        this.mRecorder = new MediaRecorder(stream);
        resolve();
      } else {
        reject('Navigator mediaDevices does not exist')
      }
    })
  }


  record() {
    if (this.mRecorder) {
      this.mRecorder.start();
      console.log(this.mRecorder.state);
      console.log("recorder started");
    }
  }


  stopRecord() {
    if (this.mRecorder && this.mRecorder.state !== 'inactive') {
      this.mRecorder.stop();
      console.log(this.mRecorder.state);
    }
  }


  setPlayerId(playerId) {
    this.playerId = playerId;
  }

  setOnRecord(callback) {
    this.mRecorded = callback
  }

  initListeners() {

    let self = this;
    this.mRecorder.onstop = async (e) => {

      var blob = new Blob(self.chunks, { 'type' : 'audio/ogg; codecs=opus' });
      self.chunks = [];
      var audioURL = URL.createObjectURL(blob);

      let base64 = await blobToBase64(blob);
      document.getElementById(this.playerId).src = audioURL;
      console.log("recorder stopped", audioURL);

      if (self.mRecorded) {
        self.mRecorded(base64);
      }
    }

    this.mRecorder.ondataavailable = function(e) {

      if (!self.chunks) {
        return;
      }

      self.chunks.push(e.data);
    }
  }

  play() {}
  stopPlay() {}
}

export default new Recorder()