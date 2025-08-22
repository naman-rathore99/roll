"use client";
import React, { useRef } from "react";

const TextReveal = () => {
  const refs = useRef([]);
  const container = useRef(null);

  // Reset refs to avoid duplicates on every render
  refs.current = [];

  const phrase = "Hello world from TextReveal!";

  const splitWords = (phrase) => {
    return phrase.split(" ").map((word, i) => {
      return (
        <p
          key={`${word}_${i}`}
          style={{
            margin: 0,
            display: "flex",
            gap: "2px",
            flexWrap: "nowrap",
          }}
        >
          {splitLetters(word)}
        </p>
      );
    });
  };

  const splitLetters = (word) => {
    return word.split("").map((letter, i) => (
      <span
        key={`${letter}_${i}`}
        ref={(el) => {
          if (el) refs.current.push(el);
        }}
        style={{
          display: "inline-block",
          transition: "transform 0.3s ease",
        }}
      >
        {letter}
      </span>
    ));
  };

  return (
    <div
      ref={container}
      style={{
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {splitWords(phrase)}
      </div>
    </div>
  );
};

export default TextReveal;
