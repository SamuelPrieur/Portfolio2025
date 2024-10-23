import { useEffect, useState } from "react";
import { gsap } from "gsap";
import LocomotiveScroll from "locomotive-scroll";
import SplitType from "split-type";
import TagCloud from "TagCloud";

const App = () => {
  const texts = {
    en: {
      navAbout: "About.",
      navWork: "Work.",
      navContact: "Contact.",
      HomeText:
        "My name is Samuel Prieur. I am a <strong>web developer</strong> based in France. Currently in <strong>Canada</strong> for my senior year.",
      AboutTitle: "About.<strong class='SubTitle'>(02)</strong>",
      AboutText:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi recusandae deleniti optio doloremque dolores architecto.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi recusandae deleniti optio doloremque dolores architecto.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi recusandae deleniti optio doloremque dolores architecto.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi recusandae deleniti optio doloremque dolores architecto.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi recusandae deleniti optio doloremque dolores architecto.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi recusandae deleniti optio doloremque dolores architecto.",
      JourneyTitle: "Journey.<strong class='SubTitle'>(01)</strong>",
      SkillsTitle: "Skills.<strong class='SubTitle'>(01)</strong>",
      DesignTitle: "Design.",
      DesignText:
        "I create modern, intuitive interfaces with a focus on user experience. From visual design to layout, I make sure every project is both aesthetic and functional.",
      FrontEndTitle: "Front End.",
      FrontEndText:
        "I develop high-performance, responsive websites, paying close attention to smooth animations and transitions. My goal is to make every site fast and enjoyable to navigate, while staying true to the design.",
      BackEndTitle: "Back End.",
      BackEndText:
        "I implement solid solutions that efficiently handle data and ensure project stability. From server management to API integration, I make sure everything runs smoothly behind the scenes.",
      WorkTitle: "Work.<strong class='SubTitle'>(02)</strong>",
      ContactTitle: "Contact.<strong class='SubTitle'>(03)</strong>",
    },
    fr: {
      navAbout: "Bio.",
      navWork: "Projets.",
      navContact: "Contact.",
      HomeText:
        "Je m'appelle Samuel Prieur. Je suis un <strong>développeur web</strong> en France. Actuellement au <strong>Canada</strong> pour ma dernière année d'étude.",
      AboutTitle: "Bio.<strong class='SubTitle'>(02)</strong>",
      AboutText:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi recusandae deleniti optio doloremque dolores architecto.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi recusandae deleniti optio doloremque dolores architecto.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi recusandae deleniti optio doloremque dolores architecto.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi recusandae deleniti optio doloremque dolores architecto.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi recusandae deleniti optio doloremque dolores architecto.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi recusandae deleniti optio doloremque dolores architecto.",
      JourneyTitle: "Parcours.<strong class='SubTitle'>(01)</strong>",
      SkillsTitle: "Aptitudes.<strong class='SubTitle'>(01)</strong>",
      DesignTitle: "Design.",
      DesignText:
        "Je conçois des interfaces modernes et intuitives, en mettant l’accent sur l’expérience utilisateur. De la création visuelle à la mise en page, je m’assure que chaque projet est à la fois esthétique et fonctionnel.",
      FrontEndTitle: "Front End.",
      FrontEndText:
        "Je développe des sites performants et dynamiques, avec un souci du détail pour les animations et transitions fluides. Mon objectif est de rendre chaque site rapide et agréable à naviguer, tout en respectant le design.",
      BackEndTitle: "Back End.",
      BackEndText:
        "Je mets en place des solutions robustes qui gèrent efficacement les données et assurent la stabilité des projets. De la gestion de serveurs à l’intégration d’API, je veille à ce que tout fonctionne en douceur, en coulisses.",
      WorkTitle: "Projets.<strong class='SubTitle'>(02)</strong>",
      ContactTitle: "Contact.<strong class='SubTitle'>(03)</strong>",
    },
  };

  // Check if a language is stored in sessionStorage, or default to 'fr'
  const storedLang = sessionStorage.getItem("language");
  const defaultLanguage = storedLang ? storedLang : "fr";
  const [language, setLanguage] = useState(defaultLanguage);

  const toggleLanguage = () => {
    fadePageLang(() => {
      const newLang = language === "en" ? "fr" : "en";
      setLanguage(newLang);
      // Store the selected language in sessionStorage
      sessionStorage.setItem("language", newLang);
    });
  };

  const [currentTime, setCurrentTime] = useState("");
  const [activeDiv, setActiveDiv] = useState(null);

  const [tagCloudWords, setTagCloudWords] = useState([
    "HTML",
    "CSS",
    "SASS",
    "JavaScript",
    "React",
    "NextJs",
    "Tailwind",
    "ViteJs",
    "GSAP",
    "AnimeJs",
  ]);
  const [fade, setFade] = useState(false);

  // useEffect pour gérer l'heure
  useEffect(() => {
    const afficherHour = () => {
      const now = new Date();
      const options = {
        timeZone: "Europe/Paris",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const hourParis = now.toLocaleTimeString("en-US", options);
      setCurrentTime(hourParis);
    };

    afficherHour();
    const interval = setInterval(afficherHour, 1000);
    const container = ".tagcloud";
    const options = {
      radius: window.innerWidth * 0.2,
      maxSpeed: "fast",
      initSpeed: "normal",
      direction: 135,
      keep: false,
    };

    const tagCloudInstance = TagCloud(container, tagCloudWords, options);
    return () => {
      clearInterval(interval);
      tagCloudInstance.destroy();
    };
  }, [tagCloudWords]);

  // Fonction pour gérer les animations de fade
  const fadeContent = (fadeOutCallback) => {
    setFade(true); // Déclenche l'animation de fadeOut
    gsap.to(".fade-element", {
      opacity: 0,
      duration: 0.35,
      onComplete: () => {
        fadeOutCallback(); // Appelle la fonction de retour pour changer le contenu
        gsap.to(".fade-element", {
          opacity: 1,
          duration: 0.35,
          delay: 0.1,
          onComplete: () => setFade(false), // Réinitialise l'état de fade
        });
      },
    });
  };

  const fadePageLang = (fadeOutCallback) => {
    setFade(true); // Start fade-out

    // Animation de déplacement de la navigation
    gsap.to("nav", {
      x: -75, // Déplace sur l'axe X, ajuste cette valeur selon le besoin
      duration: 0.5, // Doit correspondre à la durée de l'animation de fade-out
      onComplete: () => {
        gsap.to("nav", {
          x: 0, // Ramène la nav à sa position initiale
          duration: 0.5,
          delay: 0.1, // Ajoute un léger délai avant de ramener la nav
        });
      },
    });
    gsap.to("main", {
      opacity: 0,
      duration: 0.5, // Adjust duration if needed
      onComplete: () => {
        fadeOutCallback(); // Trigger the language change
        gsap.to("main", {
          opacity: 1,
          duration: 0.5,
          delay: 0.1,
          onComplete: () => setFade(false), // End the fade-in
        });
      },
    });
  };

  // useEffect pour gérer Locomotive Scroll et les animations
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });

    window.addEventListener("load", () => {
      scroll.update();
    });

    const createSplitTextAnimationWords = (target) => {
      new SplitType(target); // Animation sur les mots
      const words = target.querySelectorAll(".word");
      gsap.to(words, {
        y: 0,
        stagger: 0.05,
        delay: 0,
        duration: 0.5,
      });
    };

    const createSplitTextAnimationHeading = (target) => {
      const split = new SplitType(target, { types: "words, chars", tagName: "span" });
      const words = target.querySelectorAll(".word");
      gsap.to(words, {
        y: 0,
        stagger: 0.05,
        delay: 0,
        duration: 0.25,
      });
    };

    const observeAndAnimate = (selector, animationFn) => {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animationFn(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });

      const elementsToAnimate = document.querySelectorAll(selector);
      elementsToAnimate.forEach((el) => observer.observe(el));
    };

    observeAndAnimate(".HomeText", createSplitTextAnimationWords);
    observeAndAnimate(".Heading", createSplitTextAnimationHeading);
    observeAndAnimate(".hidden", (el) => el.classList.add("show"));
    observeAndAnimate(".hiddenT", (el) => el.classList.add("showT"));
    observeAndAnimate(".hiddenL", (el) => el.classList.add("showL"));

    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Exclude external links
        if (link.getAttribute("href").startsWith("http")) {
          return;
        }
        e.preventDefault();
        const targetSection = document.querySelector(link.getAttribute("href"));
        fadeContent(() => {
          scroll.scrollTo(targetSection); // Change le contenu après le fadeOut
        });
      });
    });

    scroll.update();

    return () => {
      scroll.destroy();
      navLinks.forEach((link) => link.removeEventListener("click", () => {}));
    };
  }, []);

  const handleMouseEnter = (newWords, divId) => {
    // Vérifiez si la div survolée est déjà active
    if (activeDiv === divId) {
      return; // Ne rien faire si la div est déjà active
    }

    setActiveDiv(divId);
    fadeContent(() => setTagCloudWords(newWords)); // Appelle fadeContent seulement si la div change
  };

  return (
    <>
      <nav className="sidebar">
        <div className="social-links">
          <button id="f" className="hidden" onClick={toggleLanguage}>
            {language === "en" ? "fr" : "en"}
          </button>
          <a id="e" className="hidden" href="https://github.com/SamuelPrieur" target="_blank" rel="noopener noreferrer">
            git
          </a>
        </div>
        <hr className="nav-line" />
        <ul>
          <li>
            <a id="d" className="hidden" href="#About">
              {texts[language].navAbout}
            </a>
          </li>
          <li>
            <a id="c" className="hidden" href="#Work">
              {texts[language].navWork}
            </a>
          </li>
          <li>
            <a id="b" className="hidden" href="#Contact">
              Contact.
            </a>
          </li>
        </ul>
        <a id="a" href="#Home" className="name hidden">
          Sam.
        </a>
      </nav>
      <main data-scroll-container>
        <section data-scroll-section data-scroll-position="top" id="Home" className="Home ">
          <div className="text-and-image">
            <h1 data-scroll data-scroll-speed="1" className="HomeText" dangerouslySetInnerHTML={{ __html: texts[language].HomeText }}></h1>
            <div data-scroll data-scroll-speed="2" className="holder">
              <img className="portrait" id="portrait" src="img/portrait.jpg" alt="" />
            </div>
          </div>
        </section>
        <section data-scroll-section data-scroll-position="top" id="About" className="About">
          <hr className="horizontal-line hiddenL" />
          <h2 data-scroll data-scroll-speed="2" className="Title Heading" dangerouslySetInnerHTML={{ __html: texts[language].AboutTitle }}></h2>
          <div className="FlexContainer">
            <p data-scroll data-scroll-speed="2" className="AboutText">
              {texts[language].AboutText}
            </p>
            <div className="AboutImageContainer">
              <img data-scroll data-scroll-speed="3" className="AboutImage" src="img/groupPhoto.jpeg" alt="" />
              <img data-scroll data-scroll-speed="4" className="AboutSubImage" src="img/gigi.webp" alt="Gigi" />
            </div>
          </div>
        </section>

        <section data-scroll-section data-scroll-position="top" className="Journey ">
          <h2 data-scroll data-scroll-speed="2" className="Title Heading" dangerouslySetInnerHTML={{ __html: texts[language].JourneyTitle }}></h2>
        </section>

        <section data-scroll-section data-scroll-position="top" className="Skills ">
          <h2 data-scroll data-scroll-speed="2" className="Title Heading" dangerouslySetInnerHTML={{ __html: texts[language].SkillsTitle }}></h2>
          <div data-scroll data-scroll-speed="1" className="tagcloud fade-element"></div>
          <section className="SkillsContainer" data-scroll data-scroll-speed="2">
            <div
              className="hiddenT"
              id={`${activeDiv === "design" ? "active" : ""}`}
              onMouseEnter={() =>
                handleMouseEnter(["Figma", "Photoshop", "Illustrator", "UI/UX", "Premiere Pro", "Audition", "After Effect"], "design")
              }
            >
              <h2>01</h2>
              <hr />
              <h3>{texts[language].DesignTitle}</h3>
              <p>{texts[language].DesignText}</p>
            </div>

            <div
              className="hiddenT"
              id={`${activeDiv === "frontend" ? "active" : ""}`}
              onMouseEnter={() =>
                handleMouseEnter(["HTML", "CSS", "SASS", "JavaScript", "React", "NextJs", "Tailwind", "ViteJs", "GSAP", "AnimeJs"], "frontend")
              }
            >
              <h2>02</h2>
              <hr />
              <h3>{texts[language].FrontEndTitle}</h3>
              <p>{texts[language].FrontEndText}</p>
            </div>

            <div
              className="hiddenT"
              id={`${activeDiv === "backend" ? "active" : ""}`}
              onMouseEnter={() =>
                handleMouseEnter(["Git", "PHP", "SQL", "Python", "Wordpress", "Linux", "Node.js", "Express", "MongoDB", "Python"], "backend")
              }
            >
              <h2>03</h2>
              <hr />
              <h3>{texts[language].BackEndTitle}</h3>
              <p>{texts[language].BackEndText}</p>
            </div>
          </section>
        </section>

        <section data-scroll-section data-scroll-position="top" id="Work" className="Work ">
          <hr data-scroll data-scroll-speed="1" className="horizontal-line hiddenL" />
          <h2 data-scroll data-scroll-speed="2" className="Title Heading" dangerouslySetInnerHTML={{ __html: texts[language].WorkTitle }}></h2>
          <div className="grid-container">
            <a data-scroll data-scroll-speed="4" src="" className="left">
              <img className="Project" src="https://placehold.co/600x400.png" alt="" />
            </a>
            <div></div>
            <a data-scroll data-scroll-speed="6" src="" className="right">
              <img className="Project" src="https://placehold.co/600x400.png" alt="" />
            </a>
            <a data-scroll data-scroll-speed="8" src="" className="left">
              <img className="Project" src="https://placehold.co/600x400.png" alt="" />
            </a>
            <div></div>
            <a data-scroll data-scroll-speed="5" src="" className="right">
              <img className="Project" src="https://placehold.co/600x400.png" alt="" />
            </a>
          </div>
        </section>

        <section data-scroll-section data-scroll-position="top" className="Contact" id="Contact">
          <h2 data-scroll data-scroll-speed="2" className="Title Heading" dangerouslySetInnerHTML={{ __html: texts[language].ContactTitle }}></h2>
          <a href="mailto:sprieurpro@gmail.com">sprieurpro@gmail.com</a>
          <p>
            Less is More. <strong>-</strong> All Rights Reserved <strong>2025</strong>
          </p>
        </section>
      </main>
      <p className="DateHour">GMT 2 ({currentTime}, PARIS)</p>
    </>
  );
};

export default App;
