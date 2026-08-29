'use client';

import { useEffect, useRef, useState } from 'react';

const pillars = [
  { number: '01', title: 'Recorridos que acercan', text: 'Espacios virtuales en 3D que recrean el contexto real donde un oficio cobra vida.', icon: 'fa-solid fa-vr-cardboard' },
  { number: '02', title: 'Voces que enseñan', text: 'Entrevistas y relatos que honran a quienes mantienen vivas nuestras tradiciones.', icon: 'fa-solid fa-microphone-lines' },
  { number: '03', title: 'Aprender sin barreras', text: 'Contenidos audiovisuales y opciones de escucha que hacen el conocimiento más cercano.', icon: 'fa-solid fa-headphones' },
];

const questionPanels = [
  {
    title: 'Descubrir y aprender',
    description: 'Preguntas para iniciar una ruta de exploración.',
    questions: [
      {
        question: '¿Qué oficios tradicionales están en riesgo de desaparecer y cómo puedo aprenderlos?',
        answer: 'No existe una lista única de oficios “en riesgo”: debe identificarse junto a cada comunidad y maestro. La plataforma documenta expresiones como alfarería, talla en madera, piedra o jícaras, y tejidos de fibras. Para aprenderlas, explora el recorrido 3D, escucha la entrevista y sigue el contenido audiovisual del oficio elegido.',
      },
      {
        question: 'Muestrame técnicas de un oficio que pueda empezar a practicar hoy',
        answer: 'Puedes iniciar con un trenzado básico de tres tiras de papel: únelas por un extremo, pasa la tira derecha sobre la del centro, luego la izquierda sobre la nueva tira central y repite hasta el final. Es un ejercicio de coordinación previo al trabajo con fibras naturales; la técnica propia de cada comunidad debe aprenderse con sus portadores.',
      },
      {
        question: '¿Cuáles son los materiales y herramientas ancestrales mas usados en la artesanía?',
        answer: 'Entre los materiales presentes en la artesanía nicaragüense están el barro cocido, la madera, la piedra, las jícaras, las semillas y fibras como tule, cabuya o palma. Las herramientas dependen del oficio: manos y moldes para modelar, piedras de pulir, cuchillos o gubias para tallar, y bastidores o agujas para tejer. Su uso exacto cambia según el territorio y el maestro artesano.',
      },
    ],
  },
  {
    title: 'Paso a paso',
    description: 'Una guía para acercarte a las prácticas y sus detalles.',
    questions: [
      {
        question: '¿Cuál es el proceso o técnica específica de la plataforma?',
        answer: 'Cátedras del Tiempo propone una ruta de aprendizaje: eliges un saber, recorres su contexto en 3D, escuchas el relato de quienes lo practican y consultas su contenido audiovisual. La plataforma no sustituye la enseñanza con el maestro; organiza y acerca ese conocimiento para que puedas explorarlo con respeto.',
      },
      {
        question: '¿Qué trucos de taller utilizaban las personas que realizaban estos oficios?',
        answer: 'Los trucos cambian con cada oficio y territorio, por eso deben explicarlos sus portadores. En general, el trabajo de taller se apoya en observar la humedad y consistencia de los materiales, preparar las herramientas antes de empezar y repetir los movimientos con paciencia. En cada recorrido podrás reconocer esos detalles en la voz de quienes conservan el saber.',
      },
    ],
  },
  {
    title: 'Preguntas con personalidad',
    description: 'Una conversación sobre el valor de conservar la memoria.',
    questions: [
      {
        question: 'Viktor, ¿Por qué es vital preservar el legado y la experiencia de nuestros mayores?',
        answer: 'Porque una técnica no es solo un objeto terminado: contiene historia, vocabulario, materiales, decisiones y la experiencia de quien la practica. Cátedras del Tiempo busca evitar que ese conocimiento quede disperso o dependa únicamente de la transmisión oral, para que nuevas generaciones puedan acceder a él, reconocer a sus portadores y continuar aprendiendo.',
      },
    ],
  },
];

const questions = questionPanels.flatMap((panel) => panel.questions);

const categories = [
  { title: 'Artesanías', description: 'Manos, materiales y técnicas que dan forma a nuestra identidad.', image: '/categorias/artesanias.jpeg' },
  { title: 'Gastronomía', description: 'Recetas, sabores y memorias que reúnen a las comunidades.', image: '/categorias/gastronomia.jpeg' },
  { title: 'Agricultura', description: 'Conocimientos nacidos del vínculo cotidiano con la tierra.', image: '/categorias/agricultura.jpeg' },
  { title: 'Pesca', description: 'Prácticas, herramientas y relatos ligados al agua.', image: '/categorias/pesca.jpeg' },
  { title: 'Medicina tradicional', description: 'Saberes de cuidado transmitidos de generación en generación.', image: '/categorias/medicina-tradicional.jpeg' },
  { title: 'Música', description: 'Ritmos, instrumentos y expresiones que conservan memoria.', image: '/categorias/musica.jpeg' },
  { title: 'Construcción', description: 'Oficios y técnicas que dan forma a los espacios que habitamos.', image: '/categorias/construccion.jpeg' },
];

const navLinks = [
  { href: '#proposito', label: 'El proyecto' },
  { href: '#experiencias', label: 'Experiencias' },
  { href: '#categorias', label: 'Categorías' },
  { href: '#viktor', label: 'Viktor' },
  { href: '#contacto', label: 'Contacto' },
];

const revealSelector = '.hero__copy, .intro__grid > *, .categories .section-heading, .category-card, .experiences .section-heading, .experience-card, .heritage__seal, .heritage__copy, .viktor__portrait, .viktor__content, .territory__content, .contact__box, .footer__brand, .footer__navigation, .footer__bottom';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(questions[0]);
  const [activePanel, setActivePanel] = useState(0);
  const [isViktorTyping, setIsViktorTyping] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const typingTimer = useRef<number | null>(null);
  const closeMenu = () => setIsMenuOpen(false);
  const selectQuestion = (item: (typeof questions)[number]) => {
    if (typingTimer.current !== null) window.clearTimeout(typingTimer.current);
    setActiveQuestion(item);
    setIsViktorTyping(true);
    typingTimer.current = window.setTimeout(() => {
      setIsViktorTyping(false);
      typingTimer.current = null;
    }, 2000);
  };
  const selectPanel = (panelIndex: number) => {
    setActivePanel(panelIndex);
    selectQuestion(questionPanels[panelIndex].questions[0]);
  };
  const currentPanel = questionPanels[activePanel];

  useEffect(() => () => {
    if (typingTimer.current !== null) window.clearTimeout(typingTimer.current);
  }, []);

  useEffect(() => {
    const updateHeader = () => setIsHeaderScrolled(window.scrollY > 16);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    revealItems.forEach((item) => item.classList.add('reveal-on-scroll'));
    document.documentElement.classList.add('reveal-enabled');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('reveal-on-scroll--visible'));
      return () => document.documentElement.classList.remove('reveal-enabled');
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-on-scroll--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px' });

    revealItems.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('reveal-enabled');
    };
  }, []);

  return (
    <main>
      <div className="topbar">
        <div className="shell topbar__inner">
          <div className="topbar__contact">
            <a href="mailto:alondralev66@gmail.com">alondralev66@gmail.com</a>
            <span aria-hidden="true">•</span>
            <a href="tel:+50582612722">+505 8261-2722</a>
            <span aria-hidden="true">•</span>
            <span>Nicaragua</span>
          </div>
          <div className="social-links" aria-label="Redes sociales">
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" aria-hidden="true" /></a><a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" aria-hidden="true" /></a><a href="#" aria-label="TikTok"><i className="fa-brands fa-tiktok" aria-hidden="true" /></a>
          </div>
        </div>
      </div>

      <header className={`site-header ${isHeaderScrolled ? 'site-header--scrolled' : ''}`}>
        <div className="shell nav-wrap">
          <a className="brand" href="#inicio" aria-label="Cátedras del Tiempo, inicio"><img src={isHeaderScrolled ? '/logo-horizontal-white.png' : '/logo-horizontal.png'} alt="Cátedras del Tiempo" /></a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
          <a className="button button--small desktop-cta" href="#viktor">Conoce a Viktor</a>
          <button className="menu-button" type="button" onClick={() => setIsMenuOpen(true)} aria-label="Abrir menú" aria-expanded={isMenuOpen}><span /><span /><span /></button>
        </div>
      </header>

      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!isMenuOpen}>
        <button className="menu-backdrop" type="button" aria-label="Cerrar menú" onClick={closeMenu} tabIndex={isMenuOpen ? 0 : -1} />
        <aside className="menu-panel" aria-label="Menú móvil">
          <button className="menu-close" type="button" onClick={closeMenu} aria-label="Cerrar menú">×</button>
          <img className="menu-logo" src="/logo-vertical.png" alt="" />
          <nav>{navLinks.map((link) => <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>)}</nav>
          <a className="button" href="#viktor" onClick={closeMenu}>Hablar con Viktor</a>
          <a className="button button--outline" href="mailto:alondralev66@gmail.com" onClick={closeMenu}>Escríbenos</a>
          <div className="mobile-social social-links" aria-label="Redes sociales"><a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" aria-hidden="true" /></a><a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" aria-hidden="true" /></a><a href="#" aria-label="TikTok"><i className="fa-brands fa-tiktok" aria-hidden="true" /></a></div>
        </aside>
      </div>

      <section className="hero" id="inicio">
        <div className="hero__halo hero__halo--one" /><div className="hero__halo hero__halo--two" />
        <div className="shell hero__content">
          <div className="hero__copy"><p className="eyebrow">MEMORIA VIVA DE NICARAGUA</p><h1>El legado de nuestros mayores merece seguir vivo.</h1><p className="hero__lead">Preservamos saberes, oficios y tradiciones nicaragüenses para convertir la experiencia de ayer en el aprendizaje del mañana.</p><div className="hero__actions"><a className="button" href="#experiencias">Explora la experiencia</a><a className="text-link" href="#proposito">Conoce nuestro propósito <span aria-hidden="true">→</span></a></div><div className="hero__facts"><span><i className="fa-solid fa-book-open" aria-hidden="true" /><b>Saberes</b> que cuentan nuestra historia</span><span><i className="fa-solid fa-microphone-lines" aria-hidden="true" /><b>Voces</b> de quienes guardan la tradición</span><span><i className="fa-solid fa-flag" aria-hidden="true" /><b>Un país</b> conectado con su legado</span></div></div>
        </div>
      </section>

      <section className="intro section" id="proposito">
        <div className="shell intro__grid">
          <p className="eyebrow">NUESTRA RAZÓN DE SER</p>
          <div className="intro__copy"><h2>Un archivo que se siente, se escucha y se comparte.</h2><p>Las técnicas, historias y oficios tradicionales no deberían perderse entre el silencio y el paso del tiempo. Cátedras del Tiempo los resguarda en una experiencia digital accesible, cercana e interactiva.</p></div>
          <figure className="intro__visual"><div className="intro__image-wrap"><img src="/intro-tablet.jpg" alt="Tableta con contenidos digitales junto a una biblioteca" /></div></figure>
        </div>
      </section>

      <section className="categories section" id="categorias">
        <div className="shell"><div className="section-heading"><div><p className="eyebrow">EXPLORA POR TEMAS</p><h2>Saberes que siguen dando vida a Nicaragua.</h2></div><p>Recorre las expresiones culturales y los oficios que conectan a las comunidades con su memoria.</p></div><div className="category-grid">{categories.map((category, index) => <a className="category-card" href="#viktor" key={category.title}><img src={category.image} alt={`Representación de ${category.title}`} /><span className="category-card__number">0{index + 1}</span><div className="category-card__overlay"><h3>{category.title}<i className="fa-solid fa-arrow-right" aria-hidden="true" /></h3><p>{category.description}</p></div></a>)}</div></div>
      </section>

      <section className="experiences section" id="experiencias">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow">UNA EXPERIENCIA PARA EXPLORAR</p><h2>Descubre el conocimiento en su propio contexto.</h2></div><p>Más que un catálogo, esta es una puerta de entrada a las prácticas, herramientas y memorias que forman parte de nuestra identidad.</p></div>
          <div className="experience-grid">
            {pillars.map((pillar) => <article className="experience-card" key={pillar.number}><span>{pillar.number}</span><div className="card-mark" aria-hidden="true"><i className={pillar.icon} /></div><h3>{pillar.title}</h3><p>{pillar.text}</p><a href="#viktor">Descubrir más <b aria-hidden="true">→</b></a></article>)}
          </div>
        </div>
      </section>

      <section className="heritage section">
        <div className="shell heritage__grid">
          <div className="heritage__seal"><img src="/logo-vertical-white.png" alt="Emblema de Cátedras del Tiempo" /></div>
          <div className="heritage__copy"><p className="eyebrow">DE GENERACIÓN EN GENERACIÓN</p><h2>La tradición no es pasado: es una guía para lo que viene.</h2><p>Cada oficio conserva una forma de mirar el mundo. Al documentar sus técnicas, historias y matices, ayudamos a que nuevas manos puedan conocerlas, practicarlas y llevarlas hacia el futuro.</p><a className="text-link text-link--dark" href="#contacto">Súmate a esta memoria viva <span aria-hidden="true">→</span></a></div>
        </div>
      </section>

      <section className="viktor section" id="viktor">
        <div className="shell viktor__grid">
          <div className="viktor__portrait"><div className="portrait-ray portrait-ray--a" /><div className="portrait-ray portrait-ray--b" /><img src="/viktor.png" alt="Viktor, asistente virtual de Cátedras del Tiempo" /></div>
          <div className="viktor__content"><p className="eyebrow">CONOCE A VIKTOR</p><h2>Tu guía para conversar con el legado.</h2><p>Viktor es la asistente virtual que te acompaña a explorar los saberes de Nicaragua. Pregúntale, escucha y abre nuevas rutas de aprendizaje.</p>
            <div className="chat-demo" aria-live="polite"><div className="chat-demo__title"><span className="online-dot" /> Viktor · asistente virtual</div><p className="chat-demo__hello">Hola, ¿qué te gustaría descubrir hoy?</p><p className="chat-demo__question">{activeQuestion.question}</p>{isViktorTyping ? <p className="chat-demo__typing" role="status"><span>Viktor está escribiendo</span><i /><i /><i /></p> : <p className="chat-demo__reply">{activeQuestion.answer}</p>}</div>
            <div className="question-list">
              <div className="question-list__heading"><p>Prueba una pregunta</p><span>{String(activePanel + 1).padStart(2, '0')} / {String(questionPanels.length).padStart(2, '0')}</span></div>
              <div className="question-panels" role="tablist" aria-label="Temas de preguntas">
                {questionPanels.map((panel, index) => <button type="button" role="tab" aria-selected={activePanel === index} aria-controls={`question-panel-${index}`} id={`question-tab-${index}`} className={activePanel === index ? 'question-panel-tab--active' : ''} onClick={() => selectPanel(index)} key={panel.title}><b>{String(index + 1).padStart(2, '0')}</b>{panel.title}</button>)}
              </div>
              <div className="question-list__panel" role="tabpanel" id={`question-panel-${activePanel}`} aria-labelledby={`question-tab-${activePanel}`}>
                <p className="question-list__title">{currentPanel.title}</p><p className="question-list__description">{currentPanel.description}</p>
                {currentPanel.questions.map((item) => <button type="button" onClick={() => selectQuestion(item)} key={item.question} aria-pressed={activeQuestion.question === item.question}>{item.question}</button>)}
              </div>
              <div className="question-panel-controls"><button type="button" onClick={() => selectPanel(activePanel - 1)} disabled={activePanel === 0}><i className="fa-solid fa-arrow-left" aria-hidden="true" /> Panel anterior</button><button type="button" onClick={() => selectPanel(activePanel + 1)} disabled={activePanel === questionPanels.length - 1}>Siguiente panel <i className="fa-solid fa-arrow-right" aria-hidden="true" /></button></div>
            </div>
          </div>
        </div>
      </section>

      <section className="territory section">
        <div className="shell territory__content"><p className="eyebrow">UN LEGADO QUE NOS UNE</p><h2>Una plataforma que crece junto a Nicaragua.</h2><p>Nos desarrollamos y expandimos a nivel nacional para acercar las voces, los oficios y las experiencias de nuestras comunidades a cada nueva generación.</p><div className="territory__line"><span>Comunidades</span><i /><span>Regiones</span><i /><span>Futuro compartido</span></div></div>
      </section>

      <section className="contact section" id="contacto">
        <div className="shell contact__box"><div><p className="eyebrow">HAGAMOS QUE EL LEGADO PERDURE</p><h2>¿Tienes una historia o saber que merece ser compartido?</h2></div><div className="contact__actions"><a className="button" href="mailto:alondralev66@gmail.com">Conversemos</a><a href="tel:+50582612722">+505 8261-2722</a></div></div>
      </section>

      <footer>
        <div className="shell footer__inner">
          <div className="footer__brand">
            <img src="/logo-horizontal-white.png" alt="Cátedras del Tiempo" />
            <p>Guardando el legado y la experiencia de nuestros mayores.</p>
            <div className="social-links" aria-label="Redes sociales"><a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" aria-hidden="true" /></a><a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" aria-hidden="true" /></a><a href="#" aria-label="TikTok"><i className="fa-brands fa-tiktok" aria-hidden="true" /></a></div>
          </div>
          <div className="footer__navigation">
            <nav className="footer-column" aria-label="Enlaces rápidos"><h3>Enlaces rápidos</h3><a href="#inicio"><i className="fa-solid fa-house" aria-hidden="true" /> Inicio</a><a href="#proposito"><i className="fa-solid fa-book-open" aria-hidden="true" /> El proyecto</a><a href="#categorias"><i className="fa-solid fa-shapes" aria-hidden="true" /> Categorías</a><a href="#experiencias"><i className="fa-solid fa-compass" aria-hidden="true" /> Experiencias</a><a href="#viktor"><i className="fa-solid fa-comments" aria-hidden="true" /> Conoce a Viktor</a><a href="#contacto"><i className="fa-solid fa-envelope" aria-hidden="true" /> Contacto</a></nav>
            <div className="footer-column"><h3>Servicios</h3><a href="#experiencias"><i className="fa-solid fa-cube" aria-hidden="true" /> Recorridos virtuales 3D</a><a href="#experiencias"><i className="fa-solid fa-microphone-lines" aria-hidden="true" /> Entrevistas y relatos</a><a href="#experiencias"><i className="fa-solid fa-graduation-cap" aria-hidden="true" /> Contenidos educativos</a><a href="#viktor"><i className="fa-solid fa-robot" aria-hidden="true" /> Asistente virtual</a></div>
            <address className="footer-column footer__contact"><h3>Contacto</h3><a href="mailto:alondralev66@gmail.com"><i className="fa-solid fa-envelope" aria-hidden="true" /> alondralev66@gmail.com</a><a href="tel:+50582612722"><i className="fa-solid fa-phone" aria-hidden="true" /> +505 8261-2722</a><p><i className="fa-solid fa-location-dot" aria-hidden="true" /> Nicaragua<br /><span>Cobertura nacional</span></p></address>
          </div>
        </div>
        <div className="shell footer__bottom">© {new Date().getFullYear()} Cátedras del Tiempo. Todos los derechos reservados.</div>
      </footer>
      <a className="whatsapp-float" href="https://wa.me/50582612722" target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp"><i className="fa-brands fa-whatsapp" aria-hidden="true" /><span>Escríbenos por WhatsApp</span></a>
    </main>
  );
}
