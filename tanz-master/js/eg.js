//http://blog.chrislowis.co.uk/2013/06/17/synthesis-web-audio-api-envelopes.html

var EnvelopeGenerator = (function(context) {
  function EnvelopeGenerator() {
    this.attackTime = 0.1;
    this.releaseTime = 0.1;

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
})(context);
