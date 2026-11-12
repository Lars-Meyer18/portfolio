// Language-independent picture data. Content files reference these by id and
// add the translated alt text.
export interface Photo {
  kind: 'photo'
  src: string
  width: number
  height: number
  // Shows identifiable people: only published once everyone pictured agreed,
  // see flags.peoplePhotosApproved.
  people?: boolean
  // Illustrations on white are shown whole instead of cropped.
  fit?: 'contain'
  // object-position for the crop, e.g. 'center 40%'
  position?: string
}

// A typographic stand-in where no usable photo exists.
export interface Poster {
  kind: 'poster'
  title: string
  subtitle: string
}

export const media = {
  'p4-team': { kind: 'photo', src: '/images/projects/p4-team.jpg', width: 2400, height: 1800, people: true, position: 'center 35%' },
  'p4-showroom': { kind: 'photo', src: '/images/projects/p4-showroom.jpg', width: 2400, height: 1350 },
  'p4-work': { kind: 'photo', src: '/images/projects/p4-work.jpg', width: 2400, height: 1350, people: true },
  'p2-office': { kind: 'photo', src: '/images/projects/p2-office.jpg', width: 1350, height: 2400, position: 'center 42%' },
  'p2-team': { kind: 'photo', src: '/images/projects/p2-team.jpg', width: 2400, height: 1350, people: true },
  'p2-room': { kind: 'photo', src: '/images/projects/p2-room.jpg', width: 1350, height: 2400, people: true, position: 'center 55%' },
  'p1-design': { kind: 'photo', src: '/images/projects/p1-design.jpg', width: 1128, height: 2004, fit: 'contain' },
  'p1-wall': { kind: 'photo', src: '/images/projects/p1-wall.jpg', width: 1800, height: 2400, position: 'center 45%' },
  'velo-poster': { kind: 'poster', title: 'Urban. Swiss. Rapide.', subtitle: 'Made to move you' },
} satisfies Record<string, Photo | Poster>

export type MediaId = keyof typeof media
export type MediaAsset = Photo | Poster
