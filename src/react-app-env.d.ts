/// <reference types="react-scripts" />

interface Contact {
  id: number,
  title: string,
  body: string,
};

interface Contacts {
  id: number,
  section: string,
  section_text: string,
  content: Contact[],
};
