
export default function ArticlesSection() {
  const articles = [
    {
      title: 'The Benefits of Melatonin for Sleep',
      url: 'https://www.healthline.com/nutrition/melatonin',
      description: 'Explore how melatonin regulates sleep cycles and improves sleep quality.',
    },
    {
      title: 'Ashwagandha: Nature’s Stress Reliever',
      url: 'https://www.forbes.com/health/supplements/ashwagandha-benefits/',
      description: 'Discover the science behind this adaptogen and its role in stress reduction.',
    },
    {
      title: 'Omega 3 for Heart and Brain Health',
      url: 'https://www.performancelab.com/blogs/omega-3/omega-3-and-melatonin',
      description: 'Learn why omega-3 is essential for cardiovascular and cognitive wellness.',
    },
  ];

  return (
    <section id="articles" className="my-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Aprende Más Sobre Nuestros Ingredientes</h2>
      <ul className="space-y-4">
        {articles.map((article, index) => (
          <li key={index}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {article.title}
            </a>
            <p className="text-gray-600">{article.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}