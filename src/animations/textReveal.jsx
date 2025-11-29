import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateTextReveal = (triggerElement, textElement) => {
  const chars = textElement.querySelectorAll('.char');

  gsap.fromTo(
    chars,
    {
      color: '#D1D5DB', // gray-300 for text
      filter: 'grayscale(1)', // emojis gray
    },
    {
      color: '#000000',
      filter: 'grayscale(0)', // emojis regain full color
      stagger: 0.03,
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    }
  );

  // Return cleanup function
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
};