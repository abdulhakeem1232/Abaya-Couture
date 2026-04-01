"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }) {
  const [mainImage, setMainImage] = useState(images?.[0] || '/next.svg');

  return (
    <div className="space-y-4">
      <div className="relative h-[600px] md:h-[750px] w-full bg-[#fcfbf9] rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <Image src={mainImage} alt={name} fill priority className="object-contain transition-opacity duration-300 p-2" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      {images?.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div 
              key={index} 
              onClick={() => setMainImage(img)}
              className={`relative aspect-square rounded-2xl overflow-hidden border cursor-pointer transition ${mainImage === img ? 'border-primary shadow-md opacity-100' : 'border-gray-100 hover:border-primary/50 opacity-70 hover:opacity-100'}`}
            >
              <Image src={img} alt={`${name} - ${index + 1}`} fill className="object-contain p-1" sizes="100px" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
