"use client";

import { useEffect } from "react";

const GOALS = ["school fees?", "a hospital bill?", "a new shop?", "a church project?", "your first album?", "a wedding?"];

export function useFooterMotion(footerRef) {
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const word = footer.querySelector(".f-word");
    const mark = footer.querySelector(".f-mark");
    const logo = footer.querySelector(".fbig-text");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let visible = false;
    let index = 0;
    let interval;
    let transition;
    let frame;
    const frames = new Set();

    const animate = callback => {
      const id = requestAnimationFrame(() => {
        frames.delete(id);
        if (!disposed) callback();
      });
      frames.add(id);
      return id;
    };

    function stopRotation() {
      clearInterval(interval);
      clearTimeout(transition);
      frames.forEach(cancelAnimationFrame);
      frames.clear();
      frame = undefined;
      word?.classList.remove("out", "in");
    }

    function startRotation() {
      stopRotation();
      if (reduced.matches || !word) return;
      interval = setInterval(() => {
        if (!visible || document.hidden) return;
        word.classList.add("out");
        transition = setTimeout(() => {
          if (disposed) return;
          index = (index + 1) % GOALS.length;
          word.textContent = GOALS[index];
          word.classList.remove("out");
          word.classList.add("in");
          animate(() => animate(() => word.classList.remove("in")));
        }, 450);
      }, 2400);
    }

    function positionWordmark() {
      if (!mark || !logo) return;
      const bounds = mark.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - bounds.top) / (bounds.height || 1)));
      logo.style.setProperty("--fy", reduced.matches ? "0%" : `${40 - 40 * progress}%`);
    }

    function sizeWordmark() {
      if (disposed || !logo) return;
      const parent = logo.parentElement;
      const style = getComputedStyle(parent);
      const width = parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const first = logo.querySelector(".fb-f");
      const last = logo.querySelector(".fb-u");
      if (!first || !last || width <= 0) return;
      logo.style.setProperty("--fbs", "100px");
      const textWidth = last.getBoundingClientRect().right - first.getBoundingClientRect().left;
      if (textWidth > 0) logo.style.setProperty("--fbs", `${100 * width / textWidth * .995}px`);
      positionWordmark();
    }

    function onScroll() {
      if (frame !== undefined) return;
      frame = animate(() => { frame = undefined; positionWordmark(); });
    }

    function onMotionChange() {
      startRotation();
      positionWordmark();
    }

    const visibility = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; });
    visibility.observe(footer);
    const resize = new ResizeObserver(sizeWordmark);
    resize.observe(footer);
    window.addEventListener("scroll", onScroll, { passive: true });
    reduced.addEventListener("change", onMotionChange);
    document.fonts?.ready.then(sizeWordmark);
    sizeWordmark();
    startRotation();

    return () => {
      disposed = true;
      stopRotation();
      visibility.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      reduced.removeEventListener("change", onMotionChange);
    };
  }, [footerRef]);
}
