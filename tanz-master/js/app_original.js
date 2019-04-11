//mfb tanzbar emulator





//initial variable declarations
var mode = "touch";
var activeInstrument = null;
var recording = false;
var tempo = 120;


// Instruments - Initial Value Delcarations
var instruments = {
  //voicing to be addressed in sequencer section
  //BASS DRUMS
  //SHARED PARAMETER: DISTORTION VIA THE DATA KNOB
  bd1: {attack:63,decay:63,pitch:63,tune:63,noise:63,filter:63,dist:63},
  bd2: {decay: 63,tune: 63,tone: 63,dist: 63,},
  //SNARE
  //pitch via the data knob
  sd: {tune: 63,dtune: 63,snappy: 63,sdecay: 63,tone: 63,decay: 63,pitch:63},
  rs: {tune: 63},
  cy: {decay: 63,tone: 63,tune: 63},
  //OH AND HH SHARE A SINGLE VOICE
  oh: {decay: 63,tune: 63},
  hh: {decay: 63,tune: 63},
  cl: {tune: 63,decay: 63},
  //CLAP
  //the only stereo sound
  cp: {decay: 63,filter: 63,attack: 63,trig: 63},
  //TOMS
  //SHARED PARAMETER: NOISE VIA THE DATA KNOB
  //shared/single voice
  ltc: {tune:63,decay:63,noise:63},
  mtc: {tune:63,decay:63,noise:63},
  htc: {tune:63,decay:63,noise:63},
  //COWEBELL AND MARACCA - PARAMETERS ONLY CONTROLLED VIA DATA KNOB
  cb: {tune:63},
  ma: {dec:63},
};

//----------------//
// KNOB LISTENERS //
//----------------//

//bd1-specific listeners
$('#knob1').on("change", function() {instruments.bd1.attack = $('#knob1').rotaryswitch()[0].value;});
$('#knob2').on("change", function() {instruments.bd1.decay = $('#knob2').rotaryswitch()[0].value;});
$('#knob11').on("change", function() {instruments.bd1.pitch = $('#knob11').rotaryswitch()[0].value;});
$('#knob12').on("change", function() {instruments.bd1.tune = $('#knob12').rotaryswitch()[0].value;});
$('#knob21').on("change", function() {instruments.bd1.noise = $('#knob21').rotaryswitch()[0].value;});
$('#knob22').on("change", function() {instruments.bd1.filter = $('#knob22').rotaryswitch()[0].value;});
//bd2-specific listeners
$('#knob3').on("change", function() {instruments.bd2.decay = $('#knob3').rotaryswitch()[0].value;});
$('#knob13').on("change", function() {instruments.bd2.tune = $('#knob13').rotaryswitch()[0].value;});
$('#knob23').on("change", function() {instruments.bd2.tone = $('#knob23').rotaryswitch()[0].value;});
//snare-specific listeners
$('#knob4').on("change", function() {instruments.sd.tune = $('#knob4').rotaryswitch()[0].value;});
$('#knob5').on("change", function() {instruments.sd.dtune = $('#knob5').rotaryswitch()[0].value;});
$('#knob14').on("change", function() {instruments.sd.snappy = $('#knob14').rotaryswitch()[0].value;});
$('#knob15').on("change", function() {instruments.sd.sdecay = $('#knob15').rotaryswitch()[0].value;});
$('#knob24').on("change", function() {instruments.sd.tone = $('#knob24').rotaryswitch()[0].value;});
$('#knob25').on("change", function() {instruments.sd.decay = $('#knob25').rotaryswitch()[0].value;});
//cy-specific listeners
$('#knob6').on("change", function() {instruments.cy.decay = $('#knob6').rotaryswitch()[0].value;});
$('#knob16').on("change", function() {instruments.cy.tone = $('#knob16').rotaryswitch()[0].value;});
//OH
$('#knob7').on("change", function() {instruments.oh.decay = $('#knob7').rotaryswitch()[0].value;});
//HH
$('#knob17').on("change", function() {instruments.hh.decay = $('#knob17').rotaryswitch()[0].value;});
//CL
$('#knob26').on("change", function() {instruments.cl.tune = $('#knob26').rotaryswitch()[0].value;});
$('#knob27').on("change", function() {instruments.cl.decay = $('#knob27').rotaryswitch()[0].value;});
//CP
$('#knob8').on("change", function() {instruments.cp.decay = $('#knob8').rotaryswitch()[0].value;});
$('#knob18').on("change", function() {instruments.cp.filter = $('#knob18').rotaryswitch()[0].value;});
$('#knob28').on("change", function() {instruments.cp.attack = $('#knob28').rotaryswitch()[0].value;});
//HTC
$('#knob9').on("change", function() {instruments.htc.tune = $('#knob9').rotaryswitch()[0].value;});
$('#knob10').on("change", function() {instruments.htc.decay = $('#knob10').rotaryswitch()[0].value;});
//MTC
$('#knob19').on("change", function() {instruments.mtc.tune = $('#knob19').rotaryswitch()[0].value;});
$('#knob20').on("change", function() {instruments.mtc.decay = $('#knob20').rotaryswitch()[0].value;});
//LTC
$('#knob29').on("change", function() {instruments.ltc.tune = $('#knob29').rotaryswitch()[0].value;});
$('#knob30').on("change", function() {instruments.ltc.decay = $('#knob30').rotaryswitch()[0].value;});

//KNOB 31 - Data Knob
$('#knob31').on("change", function() {
  if ((activeInstrument === "bd1") || (activeInstrument === "bd2")) {
    instruments.bd1.dist = $('#knob31').rotaryswitch()[0].value;
    instruments.bd2.dist = $('#knob31').rotaryswitch()[0].value;
  } else if (activeInstrument === "sd") {
    instruments.sd.pitch = $('#knob31').rotaryswitch()[0].value;
  } else if (activeInstrument === "rs") {
    instruments.rs.tune = $('#knob31').rotaryswitch()[0].value;
  } else if (activeInstrument === "cy") {
    instruments.cy.tune = $('#knob31').rotaryswitch()[0].value;
  } else if (activeInstrument === "oh"){
    instruments.oh.tune = $('#knob31').rotaryswitch()[0].value;
  } else if (activeInstrument === "hh") {
    instruments.hh.tune = $('#knob31').rotaryswitch()[0].value;
  } else if (activeInstrument === "cp") {
    instruments.cp.trig = $('#knob31').rotaryswitch()[0].value;
  } else if ((activeInstrument === "htc") || (activeInstrument === "mtc") || (activeInstrument === "ltc")) {
    instruments.htc.noise = $('#knob31').rotaryswitch()[0].value;
    instruments.mtc.noise = $('#knob31').rotaryswitch()[0].value;
    instruments.ltc.noise = $('#knob31').rotaryswitch()[0].value;
  } else if (activeInstrument === "cb") {
    instruments.cb.tune = $('#knob31').rotaryswitch()[0].value;
  } else if (activeInstrument === "ma") {
    instruments.ma.dec = $('#knob31').rotaryswitch()[0].value;
  }
});

//knob 32 -- tempo knob

//min 60
//default 120
//max 180


//-----//
// DSP //
//-----//

//load samples
var samples = [
  "/samples/bd1_maxattack_maxdecay_nonoise.mp3",
  "/samples/bd1_noise.mp3",
  "/samples/bd2_maxdecay_midtune.mp3",
  "/samples/sd_tone_maxdecay_midtune.mp3",
  "/samples/sd_noise_maxdecay.mp3",
  "/samples/rs_midtune.mp3",
  "/samples/cy_maxdecay_maxtone_midtune.mp3",
  "/samples/oh_midtune_maxdecay.mp3",
  "/samples/hh_midtune_maxdecay.mp3",
  "/samples/cl_midtune_middecay.mp3",
  "/samples/cp_maxattack_maxfilter_maxattack_midtrig.mp3",
  "/samples/ltc_long_mid.mp3",
  "/samples/mtc_long_mid.mp3",
  "/samples/htc_long_mid.mp3",
  "/samples/cb_mid.mp3",
  "samples/ma_long.mp3"
];


//web audio api
//create audio context
var audioCtx = new AudioContext();

//http://blog.chrislowis.co.uk/2013/06/17/synthesis-web-audio-api-envelopes.html
var EnvelopeGenerator = (function(context) {
  function EnvelopeGenerator() {
    this.attackTime = 0;
    this.releaseTime = 0;

    var that = this;
    $(document).bind('gateOn', function (_) {
      that.trigger();
    });
    $(document).bind('setAttack', function (_, value) {
      that.attackTime = value;
    });
    $(document).bind('setRelease', function (_, value) {
      that.releaseTime = value;
    });
  }

  EnvelopeGenerator.prototype.trigger = function() {
    now = context.currentTime;
    this.param.cancelScheduledValues(now);
    this.param.setValueAtTime(0, now);
    this.param.linearRampToValueAtTime(1, now + this.attackTime);
    this.param.linearRampToValueAtTime(0, now + this.attackTime + this.releaseTime);
  };

  EnvelopeGenerator.prototype.connect = function(param) {
    this.param = param;
  };

  return EnvelopeGenerator;
})(audioCtx);

var VCA = (function(context) {
  function VCA() {
    this.gain = context.createGain();
    this.gain.gain.value = 0;
    this.input = this.gain;
    this.output = this.gain;
    this.amplitude = this.gain.gain;
  }

  VCA.prototype.connect = function(node) {
    this.output.connect(node);
  };

  return VCA;
})(audioCtx);
//http://blog.chrislowis.co.uk/2013/06/17/synthesis-web-audio-api-envelopes.html

var bufferLoader = new BufferLoader(audioCtx,samples,finishedLoading);
bufferLoader.load();
var bassDrum1 = {}, bassDrum1Noise = {}, bassDrum2 = {}, snare = {}, snareNoise = {}, rimShot = {}, cymbal = {}, openHat = {}, hiHat = {}, clave = {}, clap = {}, lTom = {}, mTom = {}, hTom = {}, cowBell = {}, maraca = {};
function finishedLoading(bufferList) {
  bassDrum1.buffer = bufferList[0];
  bassDrum1Noise.buffer = bufferList[1];
  bassDrum2.buffer = bufferList[2];
  snare.buffer = bufferList[3];
  snareNoise.buffer = bufferList[4];
  rimShot.buffer = bufferList[5];
  cymbal.buffer = bufferList[6];
  openHat.buffer = bufferList[7];
  hiHat.buffer = bufferList[8];
  clave.buffer = bufferList[9];
  clap.buffer = bufferList[10];
  lTom.buffer = bufferList[11];
  mTom.buffer = bufferList[12];
  hTom.buffer = bufferList[13];
  cowBell.buffer = bufferList[14];
  maraca.buffer = bufferList[15];
}



//Playback and Effects
var dsp = {
  bd1: function(){
    var buffer1 = bassDrum1.buffer;
    var buffer2 = bassDrum1Noise.buffer;
    bassDrum1 = audioCtx.createBufferSource();
    bassDrum1Noise = audioCtx.createBufferSource();
    bassDrum1.buffer = buffer1;
    bassDrum1Noise.buffer = buffer2;

    //Tune
    bassDrum1.detune.value = (-600 + 1200*(instruments.bd1.tune/127));


    //var distortion = audioCtx.createWaveShaper();


    //noise
    var noiseGain = audioCtx.createGain();
    noiseGain.gain.value = (instruments.bd1.noise/127);
    bassDrum1Noise.connect(noiseGain);

    //filter
    var noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = (instruments.bd1.filter/127)*20000;
    noiseGain.connect(noiseFilter);


    //decay
    var vca = new VCA(audioCtx);
    var envelope = new EnvelopeGenerator(audioCtx);
    envelope.releaseTime = 1.5 * Math.pow(((instruments.bd1.decay)/127),2) + 0.15;
    envelope.connect(vca.amplitude);
    noiseFilter.connect(vca.input);
    bassDrum1.connect(vca.input);
    vca.connect(audioCtx.destination);
    envelope.trigger();



    bassDrum1.start(0);
    bassDrum1Noise.start(0);
  },

  bd2: function(){
    //decay, tune, tone, distortion
    //init sound
    var buffer = bassDrum2.buffer;
    bassDrum2 = audioCtx.createBufferSource();
    bassDrum2.buffer = buffer;
    //tune
    bassDrum2.detune.value = (-350 + 700*(instruments.bd2.tune/127));
    //decay
    var vca = new VCA(audioCtx);
    var envelope = new EnvelopeGenerator(audioCtx);
    envelope.releaseTime = 4*Math.pow(((instruments.bd2.decay)/127),2) + 0.10;
    envelope.connect(vca.amplitude);
    //filter from tone knob
    var biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.value = (200 + ((instruments.bd2.tone/127)*1800));
    biquadFilter.frequency.Q = 1;
    //var distortion = audioCtx.createWaveShaper();


    bassDrum2.connect(vca.input);
    envelope.trigger();
    vca.connect(biquadFilter);
    biquadFilter.connect(audioCtx.destination);
    bassDrum2.start(0);
  },

  sd: function(){
    var buffer1 = snare.buffer;
    var buffer2 = snareNoise.buffer;
    snare = audioCtx.createBufferSource();
    snareNoise = audioCtx.createBufferSource();
    snare.buffer = buffer1;
    snareNoise.buffer = buffer2;




    //Snappy
    var noiseGain = audioCtx.createGain();
    noiseGain.gain.value = (instruments.sd.snappy/127);
    //S. Decay
    var snappyVCA = new VCA(audioCtx);
    var sDecay = new EnvelopeGenerator(audioCtx);
    sDecay.releaseTime = 2.5 * Math.pow(((instruments.sd.sdecay)/127),2) + 0.15;
    sDecay.connect(snappyVCA.amplitude);
    //connect snappy
    snareNoise.connect(noiseGain);
    noiseGain.connect(snappyVCA.input);
    snappyVCA.connect(audioCtx.destination);

    //tone
    snare.detune.value = (-600 + 1200*(instruments.sd.tune/127));
    //get rid of sub bass
    var biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "highpass";
    biquadFilter.frequency.value = 150;
    //decay
    var vca = new VCA(audioCtx);
    var decay = new EnvelopeGenerator(audioCtx);
    decay.releaseTime = 1 * Math.pow(((instruments.sd.decay)/127),2);
    decay.connect(vca.amplitude);

    snare.connect(biquadFilter);
    biquadFilter.connect(vca.input);
    vca.connect(audioCtx.destination);

    decay.trigger();
    sDecay.trigger();
    snare.start(0);
    snareNoise.start(0);
  },

  rs: function(){
    var buffer = rimShot.buffer;
    rimShot = audioCtx.createBufferSource();
    rimShot.buffer = buffer;
    rimShot.detune.value = (-600 + 1200*(instruments.rs.tune/127));
    rimShot.connect(audioCtx.destination);
    rimShot.start(0);
  },

  cy: function(){
    var buffer = cymbal.buffer;
    cymbal = audioCtx.createBufferSource();
    cymbal.buffer = buffer;
    cymbal.detune.value = (-600 + 1200*(instruments.cy.tune/127));
    // decay
    var vca = new VCA(audioCtx);
    var envelope = new EnvelopeGenerator(audioCtx);
    envelope.releaseTime = 4.6*Math.pow(((instruments.cy.decay)/127),2) + 0.4;
    envelope.connect(vca.amplitude);
    cymbal.connect(vca.input);
    vca.connect(audioCtx.destination);
    envelope.trigger();
    cymbal.start(0);
  },

  oh: function(){ //done
    var buffer = openHat.buffer;
    openHat = audioCtx.createBufferSource();
    openHat.buffer = buffer;
    openHat.detune.value = (-600 + 1200*(instruments.oh.tune/127));
    //decay
    var vca = new VCA(audioCtx);
    var envelope = new EnvelopeGenerator(audioCtx);
    envelope.releaseTime = 4.6*Math.pow(((instruments.oh.decay)/127),2) + 0.4;
    envelope.connect(vca.amplitude);
    openHat.connect(vca.input);
    vca.connect(audioCtx.destination);
    envelope.trigger();
    openHat.start(0);
  },
  hh: function(){
    var buffer = hiHat.buffer;
    hiHat = audioCtx.createBufferSource();
    hiHat.buffer = buffer;
    hiHat.detune.value = (-600 + 1200*(instruments.hh.tune/127));
    var vca = new VCA(audioCtx);
    var envelope = new EnvelopeGenerator(audioCtx);
    envelope.releaseTime = 0.2*((instruments.hh.decay)/127)+0.07;
    envelope.connect(vca.amplitude);
    envelope.trigger();
    hiHat.connect(vca.input);
    vca.connect(audioCtx.destination);
    hiHat.start(0);
  },
  cl: function(){
    var buffer = clave.buffer;
    clave = audioCtx.createBufferSource();
    clave.buffer = buffer;
    clave.detune.value = (-200 + 400*(instruments.cl.tune/127));

    var vca = new VCA(audioCtx);
    var envelope = new EnvelopeGenerator(audioCtx);
    envelope.releaseTime = 0.1*((instruments.cl.decay)/127)+0.03;
    envelope.connect(vca.amplitude);
    envelope.trigger();
    clave.connect(vca.input);
    vca.connect(audioCtx.destination);
    envelope.trigger();
    clave.start(0);
  },
  cp: function(){
    var buffer = clap.buffer;
    clap = audioCtx.createBufferSource();
    clap.buffer = buffer;
    var vca = new VCA(audioCtx);
    var envelope = new EnvelopeGenerator(audioCtx);
    envelope.releaseTime = 2*Math.pow(((instruments.cp.decay)/127),2) + 0.1;
    envelope.connect(vca.amplitude);
    clap.connect(vca.input);
    envelope.trigger();
    var filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 500 + (instruments.cp.filter/127)*15000;
    vca.connect(filter);
    filter.connect(audioCtx.destination);
    clap.start(0);
  },
  ltc: function(){
    var buffer = lTom.buffer;
    lTom = audioCtx.createBufferSource();
    lTom.buffer = buffer;
    lTom.detune.value = (-300 + 600*(instruments.ltc.tune/127));
    var vca = new VCA(audioCtx);
    var envelope = new EnvelopeGenerator(audioCtx);
    envelope.releaseTime = 3*Math.pow(((instruments.ltc.decay)/127),2) + 0.10;
    envelope.connect(vca.amplitude);
    envelope.trigger();
    lTom.connect(vca.input);
    vca.connect(audioCtx.destination);
    lTom.start(0);
  },
  mtc: function(){
    var buffer = mTom.buffer;
    mTom = audioCtx.createBufferSource();
    mTom.buffer = buffer;
    mTom.detune.value = (-300 + 600*(instruments.mtc.tune/127));
    var vca = new VCA(audioCtx);
    var envelope = new EnvelopeGenerator(audioCtx);
    envelope.releaseTime = 3*Math.pow(((instruments.mtc.decay)/127),2) + 0.10;
    envelope.connect(vca.amplitude);
    envelope.trigger();
    mTom.connect(vca.input);
    vca.connect(audioCtx.destination);
    mTom.start(0);
  },
  htc: function(){
    var buffer = hTom.buffer;
    hTom = audioCtx.createBufferSource();
    hTom.buffer = buffer;
    hTom.detune.value = (-300 + 600*(instruments.htc.tune/127));
    var vca = new VCA(audioCtx);
    var envelope = new EnvelopeGenerator(audioCtx);
    envelope.releaseTime = 3*Math.pow(((instruments.htc.decay)/127),2) + 0.10;
    envelope.connect(vca.amplitude);
    envelope.trigger();
    hTom.connect(vca.input);
    vca.connect(audioCtx.destination);
    hTom.start(0);
  },
  cb: function(){ //done
    var buffer = cowBell.buffer;
    cowBell = audioCtx.createBufferSource();
    cowBell.buffer = buffer;
    cowBell.detune.value = (-600 + 1200*(instruments.cb.tune/127));
    cowBell.connect(audioCtx.destination);
    cowBell.start(0);
  },
  ma: function(){ //done
    var buffer = maraca.buffer;
    maraca = audioCtx.createBufferSource();
    maraca.buffer = buffer;
    //decay
    var vca = new VCA(audioCtx);
    var envelope = new EnvelopeGenerator(audioCtx);
    envelope.releaseTime = 0.12*((instruments.ma.dec)/127)+0.05;
    envelope.connect(vca.amplitude);
    envelope.trigger();
    maraca.connect(vca.input);
    vca.connect(audioCtx.destination);
    maraca.start(0);
  }
};

//play the instrument
function playInstrument(instrument) {
  dsp[instrument]();
}


//-----------------//
// BUTTON TRIGGERS //
//-----------------//

//non-dependent triggers
$('.instrument-button').on("click", function(e){
  activeInstrument = this.id;
  showSequence();
  lightUp();
});


//button triggers - dependent on mode, play or sequencer
//use this to change the function of instrument buttons

$('.instrument-button').on("click", function(e) {
  if (mode === "touch") {
    playInstrument(this.id);
  }
  // } else if (mode === "play") {
  //   //showSequence(this.id);
  // }
});


//-----------//
// SEQUENCER //
//-----------//

//borrowed timer function - https://www.sitepoint.com/creating-accurate-timers-in-javascript/
function doTimer(length, resolution, oninstance){
    var steps = (length / 100) * (resolution / 10) + 1,
        speed = length / steps,
        count = 0,
        start = new Date().getTime();
    function instance(){
        if((count++ == steps) && (mode === "play")){
            //oncomplete(steps, count);
        } else if (mode === "play"){
            steps = (length / 100) * (resolution / 10);
            speed = length / steps;
            oninstance(steps, count);
            var diff = (new Date().getTime() - start) - (count * speed);
            window.setTimeout(instance, (speed - diff));
        }
    }
    window.setTimeout(instance, speed);
}
// end of borrowed timer function



//for use in sequencer function
var sequencerSteps = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];


//sequencer instrument assignments
var sequencer = {
  "bd1": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "bd2": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "sd": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "rs": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "cy": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "oh": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "hh": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "cl": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "cp": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "ltc": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "mtc": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "htc": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "cb": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
  "ma": {"step-1":false,"step-2":false,"step-3":false,"step-4":false,"step-5":false,"step-6":false,"step-7":false,"step-8":false,"step-9":false,"step-10":false,"step-11":false,"step-12":false,"step-13":false,"step-14":false,"step-15":false,"step-16":false},
};


var stepLibrary = {
  "step-1":{"active":true,"seleted":false},
  "step-2":{"active":false,"seleted":false},
  "step-3":{"active":false,"seleted":false},
  "step-4":{"active":false,"seleted":false},
  "step-5":{"active":false,"seleted":false},
  "step-6":{"active":false,"seleted":false},
  "step-7":{"active":false,"seleted":false},
  "step-8":{"active":false,"seleted":false},
  "step-9":{"active":false,"seleted":false},
  "step-10":{"active":false,"seleted":false},
  "step-11":{"active":false,"seleted":false},
  "step-12":{"active":false,"seleted":false},
  "step-13":{"active":false,"seleted":false},
  "step-14":{"active":false,"seleted":false},
  "step-15":{"active":false,"seleted":false},
  "step-16":{"active":false,"seleted":false},
};

function getTempo() {
  return (tempo+0.1)/60*1000;
}


function play() {
  var currentStep = 0;
  activeStep = "step-1";
  doTimer(
    getTempo(),
    8,
    //$.when(
    function(){
      stepLibrary["step-" + sequencerSteps[currentStep]].active = false;
      if (currentStep !== 15){
        currentStep += 1;
        bindSounds(currentStep + 1);
        activeStep = "step-" + sequencerSteps[currentStep];
        // $('.sequencer-step').css("border-color","gray");
        // $('#'+activeStep).css("border-color","red");

      } else {
        currentStep = 0;
        bindSounds(currentStep + 1);
        activeStep = "step-" + sequencerSteps[currentStep];
        //lightUp();
        // $('.sequencer-step').css("border-color","gray");
        // $('#'+activeStep).css("border-color","red");
      }
      stepLibrary[activeStep].active = true;
      lightUp();
      //
    }
  //).then(lightUp())
    //this function does nothing. it's not supposed to. leave it.
  );
}


//function from button assignment section
function showSequence() {
  if(activeInstrument){
    for (var step in sequencerSteps) {
      if(sequencer[activeInstrument]["step-" + sequencerSteps[step]]) {
        //console.log("true");
        stepLibrary["step-" + sequencerSteps[step]].selected = true;
      } else {
        stepLibrary["step-" + sequencerSteps[step]].selected = false;
      }
    }
  }
}

//get lit up by step based on conditions
function lightUp(){
  var keys = Object.keys(stepLibrary);
  for (var step in keys){
    if((stepLibrary[keys[step]].selected === true) && (stepLibrary[keys[step]].active === true)){
      $("#"+keys[step]).css("border-color","yellow");
    }else if(stepLibrary[keys[step]].selected === true){
      $("#"+keys[step]).css("border-color","green");
    }else if(stepLibrary[keys[step]].active === true){
      $("#"+keys[step]).css("border-color","red");
    } else {
      $("#"+keys[step]).css("border-color","gray");
    }
  }
}

lightUp();


$('#play').on("click", function(e) {
  if (mode === "touch") {
    mode = "play";
    play();
    $('#play').css("border-color","red");
  } else if (mode === "play") {
    mode = "touch";
    $('#play').css("border-color","gray");
  }
});


// If a step is selected, set it to active for that instrument
$('.sequencer-step').on("click", function(e) {
  var stepNumber = this.id;
  if(activeInstrument) {
    sequencer[activeInstrument][stepNumber] = !sequencer[activeInstrument][stepNumber];
  }
  $.when(showSequence()).then(lightUp());
  // showSequence();
  // lightUp();
});


//if a sound is 'active' in the sequencer, play it
function bindSounds(step){
  Object.keys(sequencer).forEach(function(e){
    if(sequencer[e][activeStep] === true){
      playInstrument(e);
    }
  });
}

//------------------------//
// RECORDING AND CLYP API //
//------------------------//
var destination = audioCtx.createMediaStreamDestination();
var mediaRecorder = new MediaRecorder(destination.stream);
var chunks = [];
var audioLink;

// $('#rec').on("click", function(e) {
//   recording = !recording;
//   if (recording === true){
//     mediaRecorder.start();
//     $('#rec').css("border-color","red");
//   } else {
//     $('#rec').css('border-color','gray');
//     mediaRecorder.stop();
//     mediaRecorder.ondataavailable = function(evt) {
//        // push each chunk (blobs) in an array
//        chunks.push(evt.data);
//     };
//     mediaRecorder.onstop = function(evt) {
//        // Make blob out of our blobs, and open it.
//        var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
//        audioLink = URL.createObjectURL(blob);
//        console.log(audioLink);
//        //CLYP
//        var PROXY_URL = "https://accesscontrolalloworiginall.herokuapp.com/";
//        var CLYP_URL = "https://upload.clyp.it/upload";
//        $.post(
//          PROXY_URL + CLYP_URL,
//          {
//            audioFile: audioLink,
//            description: 'From Tanzbär Emulator',
//            enctype: "multipart/form-data"
//          }
//        );
//        //CLYP
//     };
//   }
// });
