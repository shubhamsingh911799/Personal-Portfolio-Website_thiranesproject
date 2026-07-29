const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed projects (helper route to populate DB initially)
router.post('/seed', async (req, res) => {
  try {
    const seedData = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with cart and checkout.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105153ce9a?auto=format&fit=crop&q=80&w=800',
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        title: 'Task Management App',
        description: 'A beautiful Kanban-style task management application.',
        technologies: ['React', 'CSS', 'Firebase'],
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        title: 'AI Image Generator',
        description: 'Generate stunning images using OpenAI APIs.',
        technologies: ['Next.js', 'OpenAI API', 'React'],
        imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800',
        liveUrl: '#',
        githubUrl: '#'
      }
    ];
    await Project.deleteMany({});
    const created = await Project.insertMany(seedData);
    res.json({ message: 'Seeded successfully', data: created });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
