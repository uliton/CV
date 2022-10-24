/// <reference types="react-scripts" />

interface Skill {
  id: number,
  title?: string,
  body: string[],
}

interface Skills {
  section: string,
  content: Skill[],
}

interface Contact {
  id: number,
  title: string,
  body: string,
};

interface Contacts {
  section: string,
  section_text: string,
  content: Contact[],
};

interface EducationPart {
  id: number,
  body: string,
}

interface Education {
  section: string,
  content: EducationPart[],
};

interface PortfolioPart {
  id: number,
  title: string,
  link: string,
  technologies: string[], 
}

interface Portfolio {
  section: string,
  content: PortfolioPart[],
}

interface IntroduceInfo {
  id: number,
  name: string,
  position: string,
  text: string[],
}

interface Introduce {
  section: string,
  content: IntroduceInfo[],
}

interface SelfEducationPart {
  id: number,
  body: string,
}

interface SelfEducation {
  section: string,
  content: SelfEducationPart[],
}

interface Results {
  title: string,
  content: string[],
}

interface Response {
  title: string,
  content: string[],
}

interface ExperiencePartBody {
  results: Results,
  response: Response,
  technologies?: string,
}

interface ExperiencePart {
  id: number,
  title: string,
  subtitle?: string,
  body: string | ExperiencePartBody,
}

interface Experience {
  section: string,
  content: ExperiencePart[],
}

interface SportPart {
  id: number,
  body: string,
}

interface Sport {
  section: string,
  content: SportPart[],
}
