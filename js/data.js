/*
 * Spa catalog & configuration.
 * Everything a spa would customise lives here: brand, hours, services,
 * specialists, add-ons, offers, memberships and rewards. Swap these values
 * (or load them from an API) to white-label the app for any spa.
 */
window.KRIYA_DATA = {
  spa: {
    name: 'Kriya',
    tagline: 'Wellness Spa & Thermal House',
    address: '214 Willow Lane, Suite 2',
    city: 'Your City',
    phone: '(555) 014-2290',
    email: 'hello@kriya.example',
    open: 9 * 60,          // minutes from midnight
    close: 20 * 60,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 2340,
    avgRevenuePerHalfHour: 48, // used by the Studio dashboard sample data
  },

  moods: [
    { id: 'calm',    label: 'Calm',    line: 'Quiet the mind',       icon: 'moon', art: ['#B9C7E8', '#7F8FBF', '#2E3A5C'] },
    { id: 'restore', label: 'Restore', line: 'Refill the tank',      icon: 'leaf', art: ['#CFE3C9', '#7FA98A', '#2F4A3A'] },
    { id: 'glow',    label: 'Glow',    line: 'Skin that feels new',  icon: 'sun',  art: ['#FFE1C2', '#F2A884', '#B65F45'] },
    { id: 'release', label: 'Release', line: 'Let the tension go',   icon: 'drop', art: ['#F3C9C9', '#C98A9A', '#5E3346'] },
  ],

  categories: ['Massage', 'Facial', 'Body', 'Thermal', 'Mind'],

  services: [
    {
      id: 'signature-flow', name: 'Kriya Signature Flow', category: 'Massage', duration: 90, price: 185,
      moods: ['calm', 'release'], popular: true,
      short: 'Our house ritual — long, flowing strokes with warm oils and a scalp finish.',
      description: 'A slow, full-body massage that blends Swedish flow, gentle stretching and acupressure. Finished with a warm scalp ritual and a cup of house tea in the quiet room.',
      benefits: ['Deep nervous-system reset', 'Eases muscle tension', 'Improves sleep quality'],
      pairs: ['aroma', 'scalp'], art: ['#E8D5C0', '#B98B6E', '#4A3328'],
    },
    {
      id: 'deep-release', name: 'Deep Tissue Release', category: 'Massage', duration: 60, price: 145,
      moods: ['release'], popular: true,
      short: 'Focused, firm pressure for stubborn knots and desk-bound shoulders.',
      description: 'Targeted deep work on the areas you carry stress — neck, shoulders, back and hips. Your specialist adjusts pressure to you throughout.',
      benefits: ['Releases chronic knots', 'Restores range of motion', 'Ideal for active bodies'],
      pairs: ['cbd', 'stones'], art: ['#F0C9B4', '#C7826A', '#5A2E2A'],
    },
    {
      id: 'hot-stone', name: 'Hot Stone Grounding', category: 'Massage', duration: 75, price: 165,
      moods: ['calm', 'restore'],
      short: 'Heated basalt stones melt tension while you sink into stillness.',
      description: 'Smooth heated basalt stones are placed along energy lines and used as an extension of the hands, warming muscles deeply for a profoundly grounding experience.',
      benefits: ['Deep muscle warmth', 'Calms anxiety', 'Improves circulation'],
      pairs: ['aroma', 'cbd'], art: ['#D9D2C5', '#8E8577', '#2F2B27'],
    },
    {
      id: 'prenatal', name: 'Prenatal Cocoon', category: 'Massage', duration: 60, price: 150,
      moods: ['calm'],
      short: 'Side-lying comfort and gentle care for every trimester.',
      description: 'Specialised bolstering and gentle techniques to relieve the lower back, hips and swollen ankles — designed for expecting mothers after the first trimester.',
      benefits: ['Relieves back & hip strain', 'Reduces swelling', 'Deeply nurturing'],
      pairs: ['scalp'], art: ['#F6DCD6', '#E3A9A0', '#8B5A5A'],
    },
    {
      id: 'glow-facial', name: 'Glow Ritual Facial', category: 'Facial', duration: 60, price: 155,
      moods: ['glow'], popular: true,
      short: 'Enzyme polish, lymphatic massage and a cooling botanical mask.',
      description: 'A customised facial that cleanses, polishes and drains. Sculpting facial massage lifts and depuffs, finished with a cooling botanical mask and SPF.',
      benefits: ['Instant radiance', 'Depuffs & sculpts', 'Customised to your skin'],
      pairs: ['led', 'eyes'], art: ['#FFE6CC', '#F4B48C', '#C0694A'],
    },
    {
      id: 'hydra-renewal', name: 'Hydra Renewal Facial', category: 'Facial', duration: 75, price: 175,
      moods: ['glow', 'restore'],
      short: 'Deep hydration infusion with hyaluronic layers and LED.',
      description: 'Layered hydration with hyaluronic serums, gentle extractions and LED light therapy for plump, calm, glass-like skin.',
      benefits: ['Intense hydration', 'Calms redness', 'Smooths fine lines'],
      pairs: ['eyes', 'scalp'], art: ['#D6ECF0', '#8CC3CE', '#2F6470'],
    },
    {
      id: 'salt-polish', name: 'Himalayan Salt Polish', category: 'Body', duration: 45, price: 110,
      moods: ['glow'],
      short: 'Mineral salt exfoliation and a rich body-butter wrap.',
      description: 'Warm oil and mineral-rich pink salt buff away dull skin, followed by a warm shower and a nourishing body-butter application.',
      benefits: ['Silky-smooth skin', 'Boosts circulation', 'Perfect pre-event'],
      pairs: ['aroma'], art: ['#FBE3E0', '#EBAAA4', '#9C5753'],
    },
    {
      id: 'clay-wrap', name: 'Detox Clay Wrap', category: 'Body', duration: 60, price: 130,
      moods: ['restore'],
      short: 'Mineral clay cocoon with a scalp massage while you rest.',
      description: 'A purifying mineral clay is applied head to toe and you are wrapped in warmth while your specialist performs a scalp and foot massage.',
      benefits: ['Draws out impurities', 'Softens skin', 'Deep rest'],
      pairs: ['scalp'], art: ['#DCDCC8', '#A3A585', '#4C503A'],
    },
    {
      id: 'thermal-circuit', name: 'Thermal Circuit', category: 'Thermal', duration: 120, price: 75,
      moods: ['restore', 'release'], popular: true,
      short: 'Sauna, steam, cold plunge and the relaxation lounge — at your pace.',
      description: 'Two hours in our thermal house: Finnish sauna, eucalyptus steam, cold plunge, warm mineral pool and a heated-lounger relaxation room. Robe, sandals and tea included.',
      benefits: ['Boosts immunity & mood', 'Muscle recovery', 'A true reset'],
      pairs: ['aroma'], art: ['#CFE0DD', '#7FA7A2', '#22413F'],
    },
    {
      id: 'sound-bath', name: 'Sound Bath Journey', category: 'Mind', duration: 45, price: 65,
      moods: ['calm'],
      short: 'Crystal bowls and gongs guide you into deep, restful stillness.',
      description: 'Lie back in a cocoon of blankets while crystal singing bowls, gongs and chimes wash over you — guiding the nervous system toward deep rest.',
      benefits: ['Reduces stress', 'Improves focus', 'Meditative rest'],
      pairs: [], art: ['#D8D3EE', '#9C92C8', '#3D3566'],
    },
    {
      id: 'breath-float', name: 'Breathwork & Float', category: 'Mind', duration: 60, price: 95,
      moods: ['calm', 'release'],
      short: 'Guided breathwork followed by a weightless float in warm water.',
      description: 'A short guided breathwork session to downshift, followed by 40 minutes floating weightless in body-temperature magnesium-rich water.',
      benefits: ['Weightless recovery', 'Mental clarity', 'Eases joint pain'],
      pairs: [], art: ['#D3E4F2', '#89AFD1', '#2D4B6B'],
    },
    {
      id: 'couples', name: 'Couples Sanctuary', category: 'Massage', duration: 90, price: 360,
      moods: ['calm', 'restore'],
      short: 'Side-by-side massage, private thermal time and champagne — for two.',
      description: 'Share a side-by-side Signature Flow in our couples suite, followed by private thermal time and a glass of something sparkling. Price is for two guests.',
      benefits: ['Shared experience', 'Private suite', 'Perfect gift'],
      pairs: ['aroma', 'stones'], art: ['#F2D4C8', '#D08C7A', '#6B3340'],
    },
  ],

  addOns: [
    { id: 'aroma',  name: 'Aromatherapy upgrade',    price: 15, duration: 0,  note: 'Custom essential-oil blend' },
    { id: 'cbd',    name: 'CBD recovery balm',       price: 25, duration: 0,  note: 'Full-spectrum, for sore muscles' },
    { id: 'scalp',  name: 'Scalp & hair ritual',     price: 20, duration: 15, note: 'Warm oil scalp massage' },
    { id: 'stones', name: 'Hot stone add-on',        price: 25, duration: 0,  note: 'Heated basalt on key areas' },
    { id: 'led',    name: 'LED light therapy',       price: 35, duration: 15, note: 'Red light for collagen' },
    { id: 'eyes',   name: 'Eye renewal mask',        price: 18, duration: 0,  note: 'Depuffs & brightens' },
  ],

  therapists: [
    { id: 'amara', name: 'Amara Okafor', role: 'Lead massage therapist', years: 12, rating: 4.97, skills: ['Massage', 'Body'],             days: [1, 2, 3, 4, 5],    art: ['#E8C4A8', '#B9785A'] },
    { id: 'leo',   name: 'Leo Mendes',   role: 'Sports & deep tissue',   years: 8,  rating: 4.94, skills: ['Massage'],                     days: [0, 2, 3, 4, 6],    art: ['#BFD3C1', '#5F8C6E'] },
    { id: 'sana',  name: 'Sana Iqbal',   role: 'Skin & facial specialist', years: 10, rating: 4.98, skills: ['Facial', 'Body'],           days: [1, 3, 4, 5, 6],    art: ['#F5D0C5', '#C8776A'] },
    { id: 'maya',  name: 'Maya Chen',    role: 'Holistic therapist',     years: 6,  rating: 4.92, skills: ['Massage', 'Facial', 'Mind'],  days: [0, 1, 2, 5, 6],    art: ['#D6D0EE', '#8A7FC0'] },
    { id: 'theo',  name: 'Theo Laurent', role: 'Thermal & sound guide',  years: 9,  rating: 4.95, skills: ['Thermal', 'Mind', 'Body'],    days: [0, 1, 2, 3, 4, 5, 6], art: ['#C7DEDB', '#4F8681'] },
  ],

  memberships: [
    {
      id: 'circle', name: 'Circle', price: 129, popular: true,
      perks: ['One 60-min ritual every month', '15% off every other booking', 'Priority booking — 14 days ahead', 'Double reward points'],
    },
    {
      id: 'circle-plus', name: 'Circle Plus', price: 219,
      perks: ['Two 60-min rituals every month', 'Unlimited Thermal Circuit', '15% off everything else', 'A guest pass every quarter', 'Double reward points'],
    },
  ],

  tiers: [
    { id: 'seed',     name: 'Seed',     min: 0,    perk: '1 point per $1 spent' },
    { id: 'bloom',    name: 'Bloom',    min: 600,  perk: 'Birthday ritual upgrade + 1.25× points' },
    { id: 'radiance', name: 'Radiance', min: 1500, perk: 'Free monthly add-on + 1.5× points' },
  ],

  rewards: [
    { id: 'r20', pts: 300,  credit: 20, label: '$20 ritual credit' },
    { id: 'r50', pts: 700,  credit: 50, label: '$50 ritual credit' },
    { id: 'r90', pts: 1200, credit: 90, label: '$90 ritual credit' },
  ],

  reviews: [
    { name: 'Priya S.',  text: 'The Signature Flow is the best massage I have ever had. Booking took thirty seconds and I already have my next one lined up.', service: 'Kriya Signature Flow' },
    { name: 'Daniel R.', text: 'Grabbed a last-minute opening after a brutal week. The thermal circuit fixed me. Genuinely obsessed.', service: 'Thermal Circuit' },
    { name: 'Hannah M.', text: 'Sana knows skin. My face has never looked like this. The reminders keep me on a monthly rhythm.', service: 'Glow Ritual Facial' },
    { name: 'Marcus T.', text: 'Bought the couples sanctuary as a gift card — easiest anniversary win of my life.', service: 'Couples Sanctuary' },
    { name: 'Elena V.',  text: 'Circle membership pays for itself. One ritual a month and 15% off everything else.', service: 'Circle membership' },
  ],
};
