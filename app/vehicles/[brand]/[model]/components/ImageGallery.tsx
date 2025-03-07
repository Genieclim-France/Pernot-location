import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  modelName: string;
}

export default function ImageGallery({ images, modelName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const mainImage = selectedImage || images[0];
  const thumbnails = images.filter((image) => image !== mainImage);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <section className="flex flex-col gap-3 max-w-6xl mt-4  lg:w-1/2 lg:mt-0">
      <button
        aria-label={`Zoomer sur ${modelName}`}
        className="relative w-full h-[200px] lg:h-[300px] xl:h-[400px] cursor-zoom-in"
        type="button"
        onClick={toggleZoom}
      >
        <Image
          fill
          priority
          alt={`${modelName} principal`}
          className="object-cover object-bottom"
          src={mainImage}
        />
      </button>

      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center cursor-zoom-out"
          role="button"
          tabIndex={0}
          onClick={toggleZoom}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") {
              toggleZoom();
            }
          }}
        >
          <div className="relative w-full h-full">
            <Image
              fill
              alt={`${modelName} principal`}
              className="object-contain"
              quality={100}
              src={mainImage}
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-3 w-full">
        {thumbnails.map((image) => (
          <button
            key={image}
            aria-label={`Voir ${modelName} en grand`}
            className="relative w-full h-[5rem] md:h-[7rem] cursor-pointer transition-transform hover:scale-105"
            type="button"
            onClick={() => handleImageClick(image)}
          >
            <Image
              fill
              alt={`${modelName} miniature`}
              className="object-cover w-full"
              src={image}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
