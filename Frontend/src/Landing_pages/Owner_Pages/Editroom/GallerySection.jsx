export default function GallerySection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Gallery</h2>

      <div className="grid grid-cols-12 gap-4 h-[400px]">
        <div className="col-span-8 rounded-xl overflow-hidden">
          <img
            src="https://source.unsplash.com/800x600/?luxury-room"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <img
            src="https://source.unsplash.com/400x300/?bathroom"
            className="h-1/2 object-cover rounded-xl"
          />
          <img
            src="https://source.unsplash.com/400x300/?bedroom"
            className="h-1/2 object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}