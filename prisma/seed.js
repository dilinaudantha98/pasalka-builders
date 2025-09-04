require('dotenv/config');
const { PrismaClient, ProjectCategory } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const servicesData = [
  {
    title: 'Architectural Design',
    icon: 'BuildingOffice2Icon',
    description: 'Innovative and sustainable architectural designs tailored to your vision.',
    details: ['Concept Development', '3D Modeling & Visualization', 'Construction Documents', 'Permit Assistance'],
  },
  {
    title: 'General Construction',
    icon: 'WrenchScrewdriverIcon',
    description: 'High-quality construction services from groundwork to finishing touches.',
    details: ['New Builds', 'Structural Engineering', 'Project Management', 'Quality Control'],
  },
  {
    title: 'Interior Decoration',
    icon: 'PaintBrushIcon',
    description: 'Creating beautiful and functional interior spaces that reflect your personality.',
    details: ['Space Planning', 'Material & Color Selection', 'Furniture Sourcing', 'Lighting Design'],
  },
  {
    title: 'Renovation & Remodeling',
    icon: 'HomeModernIcon',
    description: 'Transforming existing spaces to meet modern standards and styles.',
    details: ['Kitchen & Bath Remodeling', 'Home Additions', 'Historical Restoration', 'Energy Efficiency Upgrades'],
  },
];

const projectsData = [
    {
    title: 'Modern Lakeside Villa',
    category: ProjectCategory.RESIDENTIAL,
    client: 'Mr. & Mrs. Smith',
    location: 'Geneva, Switzerland',
    cost: '$2.5 Million',
    timeline: '18 Months',
    shortDescription: 'A stunning lakeside property with panoramic views and minimalist design.',
    description: 'This project involved the ground-up construction of a contemporary villa on the shores of Lake Geneva. Key features include floor-to-ceiling windows, an open-plan living space, and sustainable energy solutions. The design seamlessly integrates the interior with the surrounding natural beauty.',
    coverImage: 'https://picsum.photos/seed/p1/800/600',
    gallery: ['https://picsum.photos/seed/p1-g1/1200/800', 'https://picsum.photos/seed/p1-g2/1200/800', 'https://picsum.photos/seed/p1-g3/1200/800'],
  },
  {
    title: 'The Urban Eatery',
    category: ProjectCategory.HOSPITALITY,
    client: 'Gourmet Group Ltd.',
    location: 'New York, USA',
    cost: '$1.2 Million',
    timeline: '9 Months',
    shortDescription: 'A chic and rustic restaurant design in the heart of downtown.',
    description: 'We transformed a historic downtown building into a vibrant, modern restaurant. The project preserved original brickwork while introducing industrial-chic elements, custom lighting, and a state-of-the-art kitchen. The result is an inviting atmosphere that has become a local favorite.',
    coverImage: 'https://picsum.photos/seed/p2/800/600',
    gallery: ['https://picsum.photos/seed/p2-g1/1200/800', 'https://picsum.photos/seed/p2-g2/1200/800'],
  },
  {
    title: 'Innovatech Corporate HQ',
    category: ProjectCategory.COMMERCIAL,
    client: 'Innovatech Solutions',
    location: 'Silicon Valley, USA',
    cost: '$15 Million',
    timeline: '24 Months',
    shortDescription: 'A futuristic and collaborative workspace for a leading tech company.',
    description: 'This project was the design and construction of a new headquarters for a major tech firm. It features collaborative workspaces, smart building technology, green rooftops, and an emphasis on employee wellness. The architecture reflects the company\'s innovative spirit.',
    coverImage: 'https://picsum.photos/seed/p3/800/600',
    gallery: ['https://picsum.photos/seed/p3-g1/1200/800', 'https://picsum.photos/seed/p3-g2/1200/800', 'https://picsum.photos/seed/p3-g3/1200/800', 'https://picsum.photos/seed/p3-g4/1200/800'],
  },
  {
    title: 'Elysian Boutique Hotel',
    category: ProjectCategory.HOSPITALITY,
    client: 'Serenity Stays',
    location: 'Bali, Indonesia',
    cost: '$4 Million',
    timeline: '20 Months',
    shortDescription: 'A luxury boutique hotel blending modern design with traditional Balinese elements.',
    description: 'Nestled in the lush landscapes of Bali, the Elysian Boutique Hotel offers a tranquil retreat. Our team managed the entire project from architectural design to interior furnishing, focusing on local materials and craftsmanship to create an authentic yet luxurious guest experience.',
    coverImage: 'https://picsum.photos/seed/p4/800/600',
    gallery: ['https://picsum.photos/seed/p4-g1/1200/800', 'https://picsum.photos/seed/p4-g2/1200/800', 'https://picsum.photos/seed/p4-g3/1200/800'],
  },
];

async function main() {
  console.log('Start seeding ...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('password', 10);
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });
  console.log('Admin user created.');

  // Create services
  for (const s of servicesData) {
    await prisma.service.create({
      data: s,
    });
  }
  console.log('Services created.');

  // Create projects
  for (const p of projectsData) {
    await prisma.project.create({
      data: p,
    });
  }
  console.log('Projects created.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
