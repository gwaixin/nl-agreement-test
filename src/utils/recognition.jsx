class Recognition {

  recognition;
  speechRecognitionList;
  listening = false;

  constructor() {

    if (!window.SpeechRecognition || !window.SpeechGrammarList) {
      return;
    }

    this.recognition = new window.SpeechRecognition();
    this.speechRecognitionList = new window.SpeechGrammarList();
  }


  init() {

    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.initListeners();
  }

  initListeners() {
    let self = this;

    self.recognition.onspeechend = function() {
      self.recognition.stop();
    }

    self.recognition.onnomatch = function(event) {
      console.log("I didn't recognise that Message.");
    }

    self.recognition.onerror = function(event) {
      console.log('Error occurred in recognition: ' + event.error);
    }
  }

  initResult(cb) {

    this.recognition.onresult = (event) => {
      var message = [];
      // console.log("[Recognition] on result ", event.results);
      for (let i = 0; i < event.results.length; i++) {
        let result = event.results[i];
        if (result[0]?.transcript) {
          message.push(result[0]?.transcript)
        }
      }

      message = message.join(" ");
      console.log("[Recognition] message result ", message);

      cb({ message});
    }
  }

  onAddRecognitionList = (str, lang) => {

    if (this.speechRecognitionList[0]) {
      return;
    }

    this.speechRecognitionList.addFromString('#JSGF V1.0; grammar agreements; public <agreement> = ' + str, 1);
    this.recognition.grammars = this.speechRecognitionList;
    this.recognition.lang = lang === 'en' ? 'en-US' : 'fn-Fn';

    console.log(this.speechRecognitionList[0].src);
    console.log(this.speechRecognitionList[0].weight);
  }

  onStart() {
    // alert("testing this!");
    this.recognition.start();
  }

  onEnd() {
    this.recognition.abort();
  }

}

export default new Recognition()