import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateTextReveal = (triggerElement, textElement) => {
  const chars = textElement.querySelectorAll('.char');
  
  gsap.fromTo(
    chars,
    {
      color: '#D1D5DB', // gray-300
    },
    {
      color: '#000000',
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