import LotGames from './assets/LotGames.png'
import LotHub from './assets/LotHub.png'
import lotmov from './assets/lotmov.jpg'
import portfolio from './assets/portfolio.jpg'
import pulse24 from './assets/pulse24.png'
import echo360news from './assets/echo360news.jpg'

const projects = [
  {
    id: 1,
    title: "LotGames",
    year: 2025,
    tech: ['React','Tailwind Css'],
    Description: "LotGames is a game discovery platform inspired by RAWG. It provides users with an intuitive interface to explore, search, and discover video games, game creators, and gaming stores. The website pulls data from the RAWG API to offer real-time information about games, creators, trending content, and much more.",
    poster: LotGames,
    code:"https://github.com/VINOTHKUMARM1127/LotGames",
    app:"https://lotgames.netlify.app/",
  },
  {
    id: 2,
    title: "LotHub",
    year: 2024,
    tech: ['React','Css'],
    Description: "Lothub is a movie discovery platform inspired by IMDb. It provides users with an intuitive interface to explore, search, and discover movies, TV shows, and actors. The website pulls data from The Movie Database (TMDb) API to give real-time information on movies, actors, trending content, and much more.",
    poster: LotHub,
    code: "https://github.com/VINOTHKUMARM1127/LotHub", 
    app:"https://lothub.netlify.app/",
  },
  {
    id: 3,
    title: "Devfolio",
    year: 2024,
    tech: ['React','Tailwind Css'],
    Description: "Devfolio is a modern and fully responsive developer portfolio website built with React and styled using Tailwind CSS. It showcases personal information, skills, projects, and contact details in a clean and organized layout. Designed with a minimalist aesthetic and smooth animations, Devfolio helps developers present their work and professional profile effectively to potential clients or employers.",
    poster: portfolio,
    code:"https://github.com/VINOTHKUMARM1127/Portfolio",
    app:"https://portfolio-vinothkumar.netlify.app/",
  },
  {
    id: 4,
    title: "Pulse24",
    year: 2024,
    tech: ['React','Css'],
    Description: "Pulse24 is a dynamic news web application that fetches real-time news articles from the NewsAPI. Designed with React, CSS, it delivers up-to-date headlines across various categories like technology, business, entertainment, health, and more. The user interface is clean and responsive, ensuring a seamless reading experience across all devices. Pulse24 is ideal for users who want to stay informed with the latest news delivered through a sleek, minimal UI.",
    poster: pulse24,
    code:"https://github.com/VINOTHKUMARM1127/Pulse24-News-App",
    app:"https://pulse24.netlify.app/",
  },
  {
    id: 5,
    title: "Echo360News",
    year: 2024,
    tech: ['HTML','Css'],
    Description: "Echo360News is a responsive and visually appealing static news website designed using pure HTML and CSS. It features a clean layout that mimics modern news platforms, offering a seamless reading experience. The site showcases curated news categories with a focus on readability and design, making it ideal for users looking for a simple yet effective news portal UI.",
    poster: echo360news,
    code:"https://github.com/VINOTHKUMARM1127/Echo-360-News",
    app:"https://echo360news.netlify.app/",
  },
  {
    id: 6,
    title: "LotMov",
    year: 2024,
    tech: ['HTML','Css'],
    Description: "Lotmov is a responsive web application designed for discovering and exploring movies. Built using HTML & CSS, this platform Provide HollyWood Movie Collection",
    poster: lotmov,
    code:"https://github.com/VINOTHKUMARM1127/Lotmov-web",
    app:"https://lotgames.netlify.app/",
  },
];


const edu = [
    {
      id: 1,
      name: "PPG College of Arts & Science",
      year: '2022-Present',
      study: 'Bachelor of Science- Computer Science',
      Description: "As a Computer Science  graduate, I possess strong problem-solving and precision skills. Combining this foundation with my passion for technology, I'm venturing into IT. My college experience has equipped me to bridge the worlds of engineering and IT, applying efficiency and innovation to both realms, making me a versatile professional.",
    },
    {
      id: 2,
      name: "KVK Goverment Boys Higher Secondary School",
      year: '2021-2022',
      study: 'HSC- XII(std) (Computer Science)',
      Description: "I've embraced a dynamic academic journey. My studies have fostered critical thinking and a thirst for knowledge. Through my dedication and adaptability, I've honed essential skills that transcend disciplines, preparing me for future challenges and opportunities.",
    },
    {
      id: 3,
      name: "KVK Goverment Boys Higher Secondary School",
      year: '2019-2020',
      study: 'SSLC - Xth(std)',
      Description: "I embarked on my educational journey with enthusiasm. This pivotal year instilled a strong foundation in essential subjects and time management. It was a crucial step toward my academic and personal development, preparing me for the road ahead",
    },
  ];

  export  {projects, edu} ;