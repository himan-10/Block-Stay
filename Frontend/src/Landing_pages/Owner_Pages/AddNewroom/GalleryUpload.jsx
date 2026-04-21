export default function GalleryUpload() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gallery</h2>

      <div className="grid grid-cols-3 gap-4 h-60">
        <div className="col-span-2 bg-slate-800 flex items-center justify-center rounded">
          Upload Image
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-800 flex-1 rounded"></div>
          <div className="bg-slate-800 flex-1 rounded"></div>
        </div>
      </div>
    </div>
  );
}