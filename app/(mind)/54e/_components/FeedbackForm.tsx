
import { useState } from 'react';

interface FeedbackFormProps {
  productId: number;
}

/**
 * FeedbackForm component allows users to submit feedback for a product.
 * It includes fields for comment, rating, and media upload.
 */

export default function FeedbackForm({ productId }: FeedbackFormProps) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [media, setMedia] = useState<string | null>(null);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Placeholder for form submission logic (e.g., API call to backend)
    console.log('Feedback submitted:', { productId, comment, rating, media });
    alert('¡Gracias por tu comentario! Está en revisión.');
    setComment('');
    setRating(0);
    setMedia(null);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.size <= 10 * 1024 * 1024) { // Max 10MB
        setMedia(URL.createObjectURL(file));
      } else {
        alert('El archivo debe ser menor a 10MB.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="comment" className="block text-gray-700">Comentario/Testimonio</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Cuéntanos cómo te ayudó este parche..."
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Calificación</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="media" className="block text-gray-700">Subir Foto/Video (máx. 10MB)</label>
        <input
          id="media"
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaUpload}
          className="w-full p-2 border rounded"
        />
        {media && (
          <img src={media} alt="Preview" className="mt-2 max-w-xs rounded" />
        )}
      </div>

      <p className="text-sm text-gray-500">
        Al enviar, aceptas nuestros <a href="#terms" className="text-blue-600 hover:underline">Términos y Condiciones</a> y{' '}
        <a href="#privacy" className="text-blue-600 hover:underline">Política de Privacidad</a>.
      </p>

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Enviar Comentario
      </button>
    </form>
  );
}
