import gsap from "gsap";

export function useGSAP() {
  
   const timeline = gsap.timeline();

  function animateFromTo(target, fromVars, toVars, position) {
    timeline.fromTo(target, fromVars, toVars, position);
  }

  function play() {
    timeline.play();
  }

  function pause() {
    timeline.pause();
  }

  function restart() {
    timeline.restart();
  }

  function setTimeScale(scale) {
    timeline.timeScale(scale);
  }

  return {
    animateFromTo,
    play,
    pause,
    restart,
    setTimeScale,
    timeline,
  };
}