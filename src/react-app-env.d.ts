/// <reference types="react-scripts" />

interface Mock {
  name: string,
  nav: Nav,
  position: string,
  about: string[],
  skills: Skill[],
  education: string[],
  self_education: string[],
  sport: string[],
  experience: Work[],
  portfolio: Project[],
  contacts: Contact[],
};

interface Nav {
  main: string,
  work: string,
  contacts: string,
}

interface Skill {
  id: number,
  title: string,
  body: string[],
};

interface Work {
  id: number,
  title: string,
  body?: string,
  results?: WorkRes,
  response?: WorkRes,
  technologies?: WorkRes,
};

interface WorkRes {
  title: string,
  content: string[],
};

interface Contact {
  id: number,
  title: string,
  link: string,
};

interface Project {
  id: number,
  title: string,
  link: string,
  technologies: string[],
};