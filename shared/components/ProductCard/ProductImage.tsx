'use client';

import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

const FALLBACK_IMAGE = '/image/apple.svg';

export default function ProductImage({
  image,
  title,
}: {
  image: string | StaticImageData;
  title: string;
}) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = !image || imgError ? FALLBACK_IMAGE : image;

  return (
    <Image
      src={imageSrc}
      alt={title}
      sizes="(max-width: 768px) 45vw, 200px"
      fill
      className="object-contain"
      onError={() => setImgError(true)}
    />
  );
}