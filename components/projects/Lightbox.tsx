'use client';
import { useState } from 'react';
import YARLightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Image from 'next/image';

type Props = { images: string[]; alt: string };

export default function Lightbox({ images, alt }: Props) {
  const [index, setIndex] = useState(-1);
  const slides = images.map((src) => ({ src }));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            className="relative h-48 rounded-xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>
      <YARLightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </>
  );
}
