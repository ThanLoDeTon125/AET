/**
 * characters.js
 * Data for all playable characters shown in the UI.
 */

import { ASSETS } from './assets.js';

export const heroLanding = {
  id: 'aeterna-landing',
  name: 'AETERNA',
  eyebrow: 'Open-World Digital Heritage Platform',
  manifesto:
    'A living world where Southeast Asian heritage is reawakened through play, memory and machine-guided storytelling.',
  description:
    'AETERNA is not just a game. It is an open-world digital heritage platform in RPG form, built to awaken the history, landmarks and living culture of Southeast Asia through immersive play.',
  heroBadges: ['Evolutionary Narrative AI', '11 ASEAN Nations'],
  heroMetrics: [
    { value: '11', label: 'nations woven into one playable atlas' },
    { value: 'AI', label: 'adaptive narrative journeys for every player' },
    { value: 'O2O', label: 'real-world tourism and artisan impact' },
  ],
  bgImage: 'assets/media/images/backgrounds/bg.png',
  detailArt: 'assets/media/images/backgrounds/main.png',
  frameImage: ASSETS.frameNahida,
  detailSections: [
    {
      title: 'Vision',
      body:
        'Become the region\'s leading digital heritage ecosystem, where human-centered AI connects a great past with a shared digital future.',
    },
    {
      title: 'Mission',
      body:
        'Turn heritage data into emotional experiences, bridge Gen Z with history through gamification, and create real value for tourism and local craft economies.',
    },
  ],
};

export const characters = [
  {
    id: 'edutainment',
    serial: '01',
    name: 'Edutainment',
    primaryTag: 'Learn Through Play',
    secondaryTag: 'Living Library',
    buttonLabel: 'Project Intro',
    description:
      'Historical legends, folk games and iconic figures become RPG quests, collectible artifacts and interactive archives designed for Gen Z curiosity.',
    frameImage: ASSETS.cardChar5,
    bgImage: ASSETS.bgNahida,
    cardImage: ASSETS.cardChar5,
  },
  {
    id: 'neo-asean',
    serial: '02',
    name: 'Neo-ASEAN',
    primaryTag: 'Culture In Motion',
    secondaryTag: 'Festival Seasons',
    buttonLabel: 'Project Intro',
    description:
      'AETERNA restyles architecture, costume and music into a contemporary Neo-ASEAN fantasy language that feels culturally rooted and globally appealing.',
    frameImage: ASSETS.cardChar1,
    bgImage: ASSETS.cardChar1,
    cardImage: ASSETS.cardChar1,
  },
  {
    id: 'narrative-ai',
    serial: '03',
    name: 'Narrative AI',
    primaryTag: 'Adaptive Journeys',
    secondaryTag: 'Digital Twins',
    buttonLabel: 'Project Intro',
    description:
      'The Evolutionary Narrative AI personalizes every journey, while digital twins transform real heritage sites into precise 3D worlds anyone can explore.',
    frameImage: ASSETS.cardChar2,
    bgImage: ASSETS.cardChar2,
    cardImage: ASSETS.cardChar2,
  },
  {
    id: 'o2o-impact',
    serial: '04',
    name: 'O2O Impact',
    primaryTag: 'Game To Reality',
    secondaryTag: 'Tourism + SMEs',
    buttonLabel: 'Project Intro',
    description:
      'Rare in-game rewards connect to travel vouchers, heritage experiences and artisan products, turning virtual discovery into measurable real-world value.',
    frameImage: ASSETS.cardChar3,
    bgImage: ASSETS.cardChar3,
    cardImage: ASSETS.cardChar3,
  },
  {
    id: 'global-reach',
    serial: '05',
    name: 'Global Reach',
    primaryTag: 'Guilds Across ASEAN',
    secondaryTag: 'Sustainable Preservation',
    buttonLabel: 'Project Intro',
    description:
      'AETERNA links young communities, institutions and governments in a shared heritage network powered by cultural collaboration, data insight and sustainability missions.',
    frameImage: ASSETS.cardChar4,
    bgImage: ASSETS.cardChar4,
    cardImage: ASSETS.cardChar4,
  },
];

export function getCharacterById(id) {
  return characters.find((c) => c.id === id) ?? characters[0];
}
