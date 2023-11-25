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
  portfollio: Project[],
  contacts: Contacts,
};

interface Nav {
  main: string,
  work: string,
  contacts: string,
}

interface Skill {
  id: number,
  title?: string,
  body: string[],
};

interface Work {
  id: number,
  title: string,
  body?: string,
  results?: WorkRes,
  response?: WorkRes,
  technologies?: string,
};

interface WorkRes {
  title: string,
  content: string[],
};

interface Contacts {
  text: string,
  contact_list: Contact[],
};

interface Contact {
  id: number,
  title: string,
  body: string,
};

interface Project {
  id: number,
  title: string,
  link: string,
  technologies: string[],
};