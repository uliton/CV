export function getPortfolioSections(projects: Project[]) {
  return [
    { title: 'Projects', items: projects.filter(project => project.category !== 'game') },
    { title: 'Games', items: projects.filter(project => project.category === 'game') },
  ].filter(section => section.items.length > 0)
}
