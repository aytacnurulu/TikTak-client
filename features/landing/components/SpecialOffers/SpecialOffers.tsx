const SpecialOffers = () => {
  const images = ["/image/card3.png", "/image/card4.png"];

  return (
    <section>
      <h2 className="text-2xl font-bold text-[#195233] mb-1">
        Xüsusi təkliflər!
      </h2>
      <p className="text-[#195233] mb-4">
        BRAVO-da hər gün üçün super təklifləri qaçırmayın!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((src) => (
          <div
            key={src}
            className="relative overflow-hidden rounded-[10px] min-h-[320px]"
          >
            <img
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
