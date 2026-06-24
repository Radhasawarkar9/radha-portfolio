import { useEffect, useState } from 'react';

/**
 * Typewriter effect that cycles through an array of phrases —
 * typing each one out, pausing, then deleting it before moving
 * on to the next phrase (loops forever).
 */
export default function useTypewriter(phrases, { typeSpeed = 75, deleteSpeed = 40, pause = 1600 } = {}) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const word = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        setText(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timeoutId = setTimeout(tick, pause);
          return;
        }
      } else {
        charIndex--;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      timeoutId = setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    };

    timeoutId = setTimeout(tick, typeSpeed);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}
