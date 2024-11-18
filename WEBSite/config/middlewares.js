module.exports = [
    {
      name: 'strapi::errors',
    },
    {
      name: 'strapi::security',
    },
    {
      name: 'strapi::cors',
      config: {
        enabled: true,
        origin: ['http://localhost:5173'],  // Ganti dengan URL frontend Anda
      },
    },
    {
      name: 'strapi::logger',
    },
    {
      name: 'strapi::query',
    },
    {
      name: 'strapi::body',
    },
    {
      name: 'strapi::session',
    },
    {
      name: 'strapi::favicon',
    },
    {
      name: 'strapi::public',
    },
  ];
  
  module.exports = [
    {
      name: 'strapi::cors',
      config: {
        enabled: true,
        origin: ['http://localhost:5173'],  // Tambahkan URL frontend React Anda
      },
    },
    // Pengaturan middleware lainnya bisa dibiarkan tetap sama
  ];
  