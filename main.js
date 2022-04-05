import "./style.css";

const inputsLabel = [...document.querySelectorAll(".input")];

// checkbox
const checkboxLabel = document.querySelector(".checkbox-container");
const checkboxText = checkboxLabel.querySelector(".checkbox-container p");
const checkboxContainer = checkboxLabel.querySelector(
  ".checkbox-container span",
);
const checkboxPath = checkboxContainer.querySelector(
  ".checkbox-container span svg path",
);
// console.log({ checkboxContainer, checkboxLabel, checkboxPath, checkboxText });

const lineElastic =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";
const lineStrait =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";

const danger = "#F75047";
const success = "#777FF6";

const tl = gsap.timeline();
inputsLabel.forEach((label) => {
  const input = label.querySelector("input");
  const p = label.querySelector("p");
  const line = label.querySelector(".line-svg path");

  input.addEventListener("focus", (e) => {
    if (!e.target.value) {
      tl.fromTo(
        line,
        { attr: { d: lineStrait } },
        {
          duration: 0.4,
          attr: {
            d: lineElastic,
          },
          ease: "powe4.out",
        },
      )
        .to(line, {
          duration: 1,
          attr: { d: lineStrait },
          ease: "elastic.out(6,.4)",
        })
        .to(
          p,
          { y: -23, scale: 0.4, duration: 1, ease: "elastic.out(1, 0.4)" },
          "-=0.86",
        );
    }
  });
  input.addEventListener("blur", (e) => {
    if (!e.target.value) {
      tl.to(p, { y: 0, scale: 0.9, duration: 1, ease: "power2.out" });
    }
  });
  input.addEventListener("keyup", (e) => {
    if (input.type == "text") {
      ColorizeInput(line, p, e.target.value.length < 5);
    }
    if (input.type == "email") {
      ColorizeInput(line, p, !e.target.value.includes("@"));
    }
    if (input.type == "tel") {
      ColorizeInput(line, p, isNaN(e.target.value));
    }
  });
});

function colorize(line, p, color) {
  if (color == "#F75047") {
    gsap.to([p, line], {
      color,
      stroke: color,
      x: 1,
      duration: 1,
      ease: "elastic.out(4,.3)",
    });
  } else {
    gsap.to([p, line], {
      x: 0,
      ease: "power#.out",
      color,
      stroke: color,
    });
  }
}
function ColorizeInput(line, p, validation) {
  if (validation) {
    colorize(line, p, "#F75047");
  } else {
    colorize(line, p, "#777FF6");
  }
}

const PathLength = checkboxPath.getTotalLength();

gsap.set(checkboxPath, {
  opacity: 0,
  strokeDashoffset: PathLength,
  strokeDasharray: PathLength,
  transformOrigin: " center",
});
const tl1 = gsap.timeline();
checkboxLabel.addEventListener("click", (e) => {
  if (e.target.type == "checkbox") {
    if (e.target.checked) {
      tl1.to(checkboxContainer, { top: 0, ease: "power2.out" }).fromTo(
        checkboxPath,
        { opacity: 0, rotate: "10deg", strokeDashoffset: PathLength },
        {
          duration: 2,
          opacity: 1,
          strokeDashoffset: 0,
          rotate: "-10deg",
          ease: "elastic.out(1,.5)",
        },
        "+=.2",
      );
      colorize(checkboxText, checkboxText, success);
    } else {
      tl1
        .fromTo(
          checkboxPath,
          {
            duration: 0.3,
            opacity: 1,
            strokeDashoffset: 0,
            rotate: "-10deg",
            ease: "elastic.out(1,.5)",
          },
          { opacity: 0, rotate: "10deg", strokeDashoffset: PathLength },
        )
        .to(checkboxContainer, { top: "100%", ease: "power2.out" });
      colorize(checkboxText, checkboxText, danger);
    }
  }
});

////character animation

const character = document.querySelector("#character");

gsap.set(character, { opacity: 0, bottom: "-5rem" });

const tlCharacter = gsap.timeline();
tlCharacter
  .fromTo(character, { opacity: 0, x: "-2rem" }, { opacity: 1, x: 0, delay: 1 })
  .to("#eye", {
    y: -1,
    yoyo: true,
    repeat: -1,
    reeatDelay: 0.5,
    scale: 0.9,
    stagger: 0.3,
  })
  .to(
    "#eyebrow",
    {
      y: -1,
      yoyo: true,
      repeat: -1,
      reeatDelay: 0.5,
      scale: 0.9,
      stagger: 0.3,
    },
    "-=.8",
  )
  .to("#hand", {
    x: -13,
    yoyo: true,
    repeat: -1,
    repeatDelay: 1.5,
    rotate: "-10deg",
    duration: 2,
  });

///form submition

const form = document.querySelector("form");
const sections = document.querySelectorAll("section");
const tl3 = gsap.timeline({ defauls: { duration: 1.4, ease: "power3,out" } });
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const {
    email: { value: emailValue },
    name: { value: nameValue },
    tel: { value: telValue },
    agree: { checked: agreeValue },
  } = e.target;

  tl3.to(sections, { opacity: 0, y: 60 });
  tl3.to(form, { scale: 0.8, ease: "back.out(3)", duration: 1.4 });
  tl3.fromTo(
    ".text-end",
    { opacity: 0, y: 30 },
    { scale: 1, opacity: 1, y: -110, duration: 1.4 },
  );
});
