
export default function InstagramFeed() {
  return (
    <section id="testimonials" className="my-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Mira lo que Nuestra Comunidad Dice
      </h2>
      <p className="text-center text-gray-600 mb-4">
        ¡Síguenos en Instagram para testimonios y actualizaciones en tiempo real!
      </p>
      <div className="bg-gray-100 p-6 rounded-lg text-center">
        <p className="text-gray-600">
          Placeholder para el feed de Instagram (https://www.instagram.com/parche54e/).
          Usa un widget como LightWidget o la API de Instagram Basic Display.
        </p>
        {/* Example placeholder for Instagram feed */}
        <iframe
          src="https://lightwidget.com/widgets/[your-widget-id].html"
          className="mx-auto"
          width="100%"
          height="600"
          frameBorder="0"
          title="Instagram Feed"
        ></iframe>
      </div>
    </section>
  );
}
