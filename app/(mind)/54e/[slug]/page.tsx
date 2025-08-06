'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Star, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Nav from '../_components/nav';

// Define types
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: string;
  image: string;
  color: 'purple' | 'blue' | 'orange' | 'teal';
  benefits: string[];
  ingredients: string[];
  contraindications: string[];
  mercadolibre: string;
  rating: number;
  reviews: number;
  featuredReview: string;
}

// Extended product data with detailed information
const productDetails = {
  "parche-de-energia": {
    canUse: [
      "Personas con agendas intensas o trabajos físicos/mentales exigentes.",
      "Estudiantes y profesionales que buscan mantener foco y vitalidad.",
      "Deportistas, entrenadores o personas en etapas de recuperación física.",
      "Cualquier persona que quiera energía limpia y sostenida sin consumir estimulantes orales."
    ],
    detailedIngredients: [
      { name: "Cafeína natural", description: "energizante y estimulante del sistema nervioso" },
      { name: "Beta-alanina", description: "apoya resistencia muscular" },
      { name: "L-Citrulina", description: "mejora el flujo sanguíneo y oxigenación" },
      { name: "Ginseng rojo", description: "tonificante y adaptógeno" },
      { name: "Vitaminas del complejo B", description: "B1, B2, B3, B5, B6, B9, B12, B7 - esenciales para metabolismo celular y producción de energía" }
    ],
    usage: [
      "Aplicar sobre la piel limpia, seca y sin vello (recomendado: parte interna del brazo, espalda alta, abdomen o muslo).",
      "Retira con cuidado el parche de su soporte y aplícalo en la piel.",
      "Usar un (1) parche al día por un máximo de 12 horas.",
      "No aplicar cremas o lociones en la zona antes del uso.",
      "Cambiar la zona de aplicación en cada uso para cuidar la piel.",
      "No te duches con el parche puesto, ya que pierden resistencia al agua.",
      "No reutilizar el parche.",
      "Una vez abiertos, úsalos lo antes posible."
    ],
    motivational: "Con el parche ENERGÍA de 54e, vives tu día con intensidad, sin sacrificar tu bienestar. Tecnología limpia, ingredientes funcionales y filosofía de vida en un solo paso. Porque tu cuerpo merece fuerza, pero también respeto."
  },
  "parche-de-sueno": {
    canUse: [
      "Personas con insomnio o dificultades para conciliar el sueño.",
      "Personas con trastornos del ritmo circadiano o jet lag.",
      "Trabajadores nocturnos o con horarios irregulares.",
      "Cualquiera que desee mejorar la calidad de su descanso de forma natural."
    ],
    detailedIngredients: [
      { name: "Melatonina", description: "regulador natural del sueño" },
      { name: "Magnesio", description: "relajante muscular y nervioso" },
      { name: "Lúpulo", description: "promueve el descanso y reduce ansiedad" },
      { name: "Raíz de valeriana", description: "sedante natural" },
      { name: "GABA", description: "neurotransmisor calmante" },
      { name: "5-HTP", description: "precursor de la serotonina y melatonina" },
      { name: "L-teanina", description: "reduce la actividad mental acelerada" },
      { name: "Extracto de lavanda", description: "relajante natural" }
    ],
    usage: [
      "Aplicar sobre la piel limpia, seca y sin vello (recomendado: parte interna del brazo, omóplato, zona lumbar o abdomen).",
      "Retirá con cuidado el parche de su soporte y aplicalo en la piel.",
      "Usá un (1) parche cada noche, idealmente 1 hora antes de dormir.",
      "No aplicar cremas o lociones en la zona antes del uso.",
      "Cambiar la zona de aplicación en cada uso para cuidar la piel.",
      "No ducharse con el parche puesto.",
      "No reutilizar el parche.",
      "Una vez abierto, usalo lo antes posible."
    ],
    motivational: "Con el Parche SUEÑO de 54e, te regalAs noches reparadoras, profundas y sin interrupciones. Tu cuerpo sabe cómo dormir. Dormí bien. Saná mejor. Viví LIVe."
  },
  "parche-de-antiestres": {
    canUse: [
      "Personas expuestas a altos niveles de estrés emocional o laboral.",
      "Estudiantes o profesionales con sobrecarga cognitiva.",
      "Personas con ansiedad leve o moderada.",
      "Quienes desean mantener calma y enfoque mental en su día a día.",
      "Personas que sufren agotamiento emocional, tensión muscular por nervios o pensamientos acelerados."
    ],
    detailedIngredients: [
      { name: "Ashwagandha", description: "adaptógeno que equilibra el cortisol y mejora la respuesta al estrés" },
      { name: "Rhodiola rosea", description: "aumenta la resistencia mental y física al estrés" },
      { name: "L-teanina", description: "reduce la hiperactividad neuronal sin sedación" },
      { name: "GABA", description: "calma el sistema nervioso y ayuda al equilibrio emocional" },
      { name: "Extracto de pasionaria", description: "ansiolítico natural y relajante suave" },
      { name: "Raíz de jengibre", description: "antioxidante y estabilizador del sistema nervioso" },
      { name: "Vitamina B6", description: "clave para la síntesis de serotonina y GABA" },
      { name: "Extracto de corteza de sauce blanco", description: "analgésico natural, antiinflamatorio leve" }
    ],
    usage: [
      "Aplicar sobre la piel limpia, seca y sin vello (recomendado: parte interna del brazo, omóplato, zona lumbar o abdomen).",
      "Retirá con cuidado el parche de su soporte y aplicalo en la piel.",
      "Usá un (1) parche al día, preferiblemente durante situaciones de estrés o por la mañana.",
      "No aplicar cremas o lociones en la zona antes del uso.",
      "Cambiar la zona de aplicación en cada uso para cuidar la piel.",
      "No ducharse con el parche puesto.",
      "No reutilizar el parche.",
      "Una vez abierto, usalo lo antes posible."
    ],
    motivational: "Con el Parche ANTIESTRÉS de 54e, accedes a una experiencia de calma interna desde la piel, con tecnología limpia y componentes botánicos de alta eficacia. Porque la serenidad también se entrena. Respira. Fluye. Vive simple. Vive LIVe."
  },
  "parche-de-omega-3": {
    canUse: [
      "Personas que buscan mejorar su salud cardiovascular.",
      "Personas que desean mejorar su memoria, concentración o claridad mental.",
      "Adultos con historial de colesterol o triglicéridos elevados.",
      "Personas con dietas bajas en ácidos grasos esenciales.",
      "Quienes no toleran suplementos orales de omega 3 por su sabor o efecto digestivo.",
      "Personas con inflamación crónica, fatiga o deterioro cognitivo leve."
    ],
    detailedIngredients: [
      { name: "Ácidos grasos omega-3 totales (EPA y DHA)", description: "contribuyen a la salud cerebral, visual y cardiovascular" },
      { name: "Aceite de kril antártico", description: "con excelente biodisponibilidad de omega 3 y antioxidantes naturales" },
      { name: "Aceite de semilla de grosella negra", description: "fuente de ácido gamma-linolénico (GLA), antiinflamatorio" },
      { name: "Ácido alfa-linolénico (ALA)", description: "precursor vegetal de EPA y DHA" },
      { name: "Fosfatidilcolina y fosfatidilserina", description: "nutrientes fundamentales para el funcionamiento cerebral y neuronal" },
      { name: "Coenzima Q10 (CoQ-10)", description: "antioxidante esencial para la salud cardíaca y energética" },
      { name: "Astaxantina natural estandarizada", description: "potente antioxidante protector de células, piel y visión" }
    ],
    usage: [
      "Aplicar sobre la piel limpia, seca y sin vello (recomendado: parte interna del brazo, omóplato, zona lumbar o abdomen).",
      "Retirá con cuidado el parche de su soporte y aplicalo en la piel.",
      "Usá un (1) parche diario, preferiblemente por la noche.",
      "No aplicar cremas o lociones en la zona antes del uso.",
      "Cambiar la zona de aplicación en cada uso para cuidar la piel.",
      "No ducharse con el parche puesto.",
      "No reutilizar el parche.",
      "Una vez abierto, usalo lo antes posible."
    ],
    motivational: "El Parche OMEGA 3 de 54e te conecta con lo esencial: nutrición celular sin complicaciones. Pensado para quienes saben que el bienestar empieza desde adentro y se siente en todo el cuerpo. Piensa mejor. Siénte mejor. Vive simple. Vive LIVe."
  },
  "parche-de-concentracion": {
    canUse: [
      "Estudiantes que se preparan para exámenes, tesis o actividades académicas intensas.",
      "Profesionales que requieren enfoque sostenido, memoria activa y toma de decisiones rápidas.",
      "Personas con trabajos multitarea o de alta exigencia mental.",
      "Atletas que necesitan claridad mental y reacción precisa.",
      "Quienes deseen mantener el foco y reducir distracciones digitales o mentales."
    ],
    detailedIngredients: [
      { name: "Vitaminas del complejo B", description: "B1, B2, B3, B5, B6, B7, B9, B12 - esenciales para la salud neurológica, producción de energía y síntesis de neurotransmisores" },
      { name: "Vitamina C", description: "antioxidante cerebral y refuerzo inmunológico" },
      { name: "Vitamina D3", description: "relacionada con la salud cognitiva y el estado de ánimo" },
      { name: "Vitamina A", description: "promueve la función neurosensorial y visual" },
      { name: "Cromo", description: "contribuye a la estabilidad energética y la regulación de la glucosa" },
      { name: "Citrato de zinc", description: "clave en la actividad neuronal y memoria a corto plazo" }
    ],
    usage: [
      "Aplicar sobre la piel limpia, seca y sin vello (recomendado: parte interna del brazo, omóplato, zona lumbar o abdomen).",
      "Retirá con cuidado el parche de su soporte y aplicalo en la piel.",
      "Usá un (1) parche al día, preferiblemente por la mañana antes de actividades que requieran concentración.",
      "No aplicar cremas o lociones en la zona antes del uso.",
      "Cambiar la zona de aplicación en cada uso para cuidar la piel.",
      "No ducharse con el parche puesto.",
      "No reutilizar el parche.",
      "Una vez abierto, usalo lo antes posible."
    ],
    motivational: "El Parche CONCENTRACIÓN de 54e te permite mantener el enfoque sin perder la calma, con ingredientes neuroactivos que trabajan con tu biología natural para lograr tu mejor versión cognitiva. Enfócate. Rinde. Vive simple. Vive LIVe."
  }
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data: Product[]) => {
        const found = data.find((p) => p.slug === params.slug);
        if (found) {
          setProduct(found);
        } else {
          notFound();
        }
      })
      .catch(() => notFound())
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-600">Cargando producto...</p>
      </div>
    );
  }

  if (!product) return notFound();

  const details = productDetails[product.slug as keyof typeof productDetails];

  // Helper: Star Rating
  const StarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= product.rating) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
      } else if (i - 0.5 <= product.rating) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-200 text-yellow-200" />);
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <>
     <Nav />
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-purple-600 transition">Home</Link>
          {' / '}
          <Link href="/54e" className="hover:text-purple-600 transition">54e</Link>
          {' / '}
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/54e"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a 54e
          </Link>
        </div>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{product.price}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <StarRating />
              <span className="text-gray-500 text-sm">({product.reviews} reseñas)</span>
            </div>

            {/* Short Description */}
            <p className="text-lg text-purple-600 font-medium mb-4">{product.shortDescription}</p>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

            {/* Buttons */}
            <div className="space-y-3">
              <a
                href={product.mercadolibre}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full text-center bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                Comprar en Mercado Libre
              </a>
            </div>
          </div>
        </div>

        {/* Can Use Section */}
        {details && details.canUse && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pueden usarlo</h2>
            <ul className="space-y-3">
              {details.canUse.map((person, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>{person}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Beneficios</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✅</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Usage Instructions */}
        {details && details.usage && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Modo de empleo</h2>
            <ul className="space-y-3">
              {details.usage.map((instruction, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
              <p className="text-amber-800 text-sm font-medium">
                ⚠️ Aunque algunos usuarios sienten el efecto en minutos, se recomienda un uso diario durante al menos 7 días para obtener resultados sostenidos.
              </p>
            </div>
          </div>
        )}

        {/* Detailed Ingredients */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Hecho con</h2>
          {details && details.detailedIngredients ? (
            <div className="space-y-4">
              {details.detailedIngredients.map((ingredient, i) => (
                <div key={i} className="border-l-4 border-purple-200 pl-4">
                  <h3 className="font-semibold text-gray-800">{ingredient.name}</h3>
                  <p className="text-gray-600 text-sm">{ingredient.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              {product.ingredients.join(', ')}.
            </p>
          )}
        </div>

        {/* Certifications Badge */}
        <div className="flex flex-wrap gap-3 mb-12 text-sm">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">💠 Libre de gluten</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">💠 Hipoalergénico</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">💠 Sin parabenos</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">💠 Sin OMG</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">💠 Material médico 3M</span>
        </div>

        {/* Contraindications */}
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl mb-12">
          <h3 className="text-lg font-semibold text-red-800 mb-3">⚠️ Contraindicaciones</h3>
          <ul className="text-red-700 space-y-1">
            {product.contraindications.map((item, i) => (
              <li key={i} className="text-sm">• {item}</li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-red-200">
            <p className="text-xs text-red-600">
              Toda la información presentada aquí no pretende ser un sustituto o información alternativa de los profesionales de la salud. Este producto no está destinado a diagnosticar, tratar, curar o prevenir ninguna enfermedad o condición de salud.
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t pt-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Reseñas de clientes</h2>

          {/* Featured Review */}
          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <div className="flex items-center gap-2 mb-3">
              <StarRating />
            </div>
            <p className="text-gray-700 italic">&quot;{product.featuredReview}&quot;</p>
            <p className="text-sm text-gray-500 mt-3">— Un cliente satisfecho de 54e</p>
          </div>

          {/* Call to Action: Add Review */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-100 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Usaste este parche?</h3>
            <p className="text-gray-600 mb-4">
              Compartí tu experiencia, foto o video y ayudá a otros a tomar la mejor decisión.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition">
              Publicar reseña
            </button>
          </div>
        </div>

        {/* Motivational Closing Message */}
        {details && details.motivational && (
          <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-100">
            <div className="text-lg text-gray-700 leading-relaxed italic mb-4">
              <span className="text-2xl">🌿</span>
              <p className="mt-2">{details.motivational}</p>
            </div>
            <p className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Vive mejor. Vive simple. Vive LIVe.
            </p>
          </div>
        )}
      </div>
    </section>
    </>
  );
}