// Web Audio API ambient synthesizer & sound effects

class RomanticAudioService {
  private ctx: AudioContext | null = null;
  private isPlayingBgm = false;
  private bgmInterval: number | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a dreamy chime note
  public playTone(freq: number, duration = 1.2, type: OscillatorType = 'sine', volume = 0.25) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Smooth envelope
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Sparkle chime on gift open / interactions
  public playSparkle() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.8, 'triangle', 0.2);
      }, idx * 75);
    });
  }

  // Birthday celebration melody snippet
  public playBirthdayMelody() {
    // Happy Birthday notes: G4 G4 A4 G4 C5 B4 | G4 G4 A4 G4 D5 C5
    const melody: Array<{ f: number; d: number; pause: number }> = [
      { f: 392.00, d: 0.3, pause: 0 },
      { f: 392.00, d: 0.3, pause: 350 },
      { f: 440.00, d: 0.6, pause: 700 },
      { f: 392.00, d: 0.6, pause: 1350 },
      { f: 523.25, d: 0.6, pause: 2000 },
      { f: 493.88, d: 1.0, pause: 2650 },
      
      { f: 392.00, d: 0.3, pause: 3700 },
      { f: 392.00, d: 0.3, pause: 4050 },
      { f: 440.00, d: 0.6, pause: 4400 },
      { f: 392.00, d: 0.6, pause: 5050 },
      { f: 587.33, d: 0.6, pause: 5700 },
      { f: 523.25, d: 1.2, pause: 6350 },
    ];

    melody.forEach(item => {
      setTimeout(() => {
        this.playTone(item.f, item.d * 1.5, 'sine', 0.28);
      }, item.pause);
    });
  }

  // Romantic music box ambient loop
  public startRomanticBgm(onStateChange?: (playing: boolean) => void) {
    if (this.isPlayingBgm) return;
    this.initContext();
    this.isPlayingBgm = true;
    onStateChange?.(true);

    // Warm peaceful chord progression (Cmaj7 - Am7 - Fmaj7 - G)
    const chords: number[][] = [
      [261.63, 329.63, 392.00, 493.88], // C E G B
      [220.00, 261.63, 329.63, 392.00], // A C E G
      [174.61, 220.00, 261.63, 329.63], // F A C E
      [196.00, 246.94, 293.66, 392.00], // G B D G
    ];

    let chordIndex = 0;

    const playChordStep = () => {
      if (!this.isPlayingBgm) return;
      const currentChord = chords[chordIndex];
      // Arpeggiate
      currentChord.forEach((freq, i) => {
        setTimeout(() => {
          if (this.isPlayingBgm) {
            this.playTone(freq * 1.0, 2.2, 'sine', 0.12);
            // Add subtle higher octave chime occasionally
            if (i === 2) {
              setTimeout(() => {
                if (this.isPlayingBgm) this.playTone(freq * 2, 1.5, 'triangle', 0.08);
              }, 400);
            }
          }
        }, i * 500);
      });

      chordIndex = (chordIndex + 1) % chords.length;
    };

    playChordStep();
    this.bgmInterval = window.setInterval(playChordStep, 3200);
  }

  public stopRomanticBgm(onStateChange?: (playing: boolean) => void) {
    this.isPlayingBgm = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    onStateChange?.(false);
  }

  public toggleRomanticBgm(onStateChange?: (playing: boolean) => void): boolean {
    if (this.isPlayingBgm) {
      this.stopRomanticBgm(onStateChange);
      return false;
    } else {
      this.startRomanticBgm(onStateChange);
      return true;
    }
  }

  public isBgmActive(): boolean {
    return this.isPlayingBgm;
  }
}

export const romanticAudio = new RomanticAudioService();
