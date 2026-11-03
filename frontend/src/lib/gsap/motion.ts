"use client";

import { getGsap, prefersReducedMotion } from "@/lib/gsap";

function formatCount(target: number, decimals: number, indian: boolean): string {
  return new Intl.NumberFormat(indian ? "en-IN" : "en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(target);
}

/** Headline word reveal, count-up, and section rise via GSAP + ScrollTrigger. */
export function runGsapMotion(root: ParentNode = document): () => void {
  const api = getGsap();
  if (!api || prefersReducedMotion()) return () => undefined;
  const { gsap, ScrollTrigger } = api;
  const ctx = gsap.context(() => {
    root.querySelectorAll<HTMLElement>(".eit-hl.is-static").forEach((hl) => {
      hl.classList.remove("is-static");
      const words = hl.querySelectorAll<HTMLElement>(".eit-hl__w, .eit-word");
      if (words.length) {
        gsap.set(words, { yPercent: 110, opacity: 0 });
        ScrollTrigger.create({
          trigger: hl,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(words, {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.06,
              ease: "power3.out",
            });
          },
        });
      } else {
        gsap.fromTo(
          hl,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: hl, start: "top 85%", once: true },
          },
        );
      }
    });

    root.querySelectorAll<HTMLElement>(".eit-count").forEach((el) => {
      const n = el.querySelector<HTMLElement>(".eit-count__n");
      const finalText = (el.querySelector(".eit-sr") || n)?.textContent || "";
      const m = /^(\D*?)(\d[\d,]*)(\.\d+)?(\D*)$/.exec(finalText);
      if (!n || !m) return;
      const target = parseFloat(m[2].replace(/,/g, "") + (m[3] || ""));
      const decimals = m[3] ? m[3].length - 1 : 0;
      const indian = /\d,\d\d,\d{3}/.test(m[2]);
      const prefix = m[1];
      const suffix = m[4];
      const state = { v: 0 };
      n.textContent = prefix + formatCount(0, decimals, indian) + suffix;
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(state, {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              n.textContent = prefix + formatCount(state.v, decimals, indian) + suffix;
            },
          });
        },
      });
    });

    root.querySelectorAll<HTMLElement>(".eit-rise").forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          delay: Math.min(i * 0.05, 0.4),
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      );
    });
  }, root as Element);

  return () => ctx.revert();
}
