// ListingPreview.jsx

export default function ListingPreview({ form, photos, onEdit }) {
  const uploadedCount = photos.filter(Boolean).length;

  return (
    <div className="sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
          Listing Preview
        </span>
        <button
          onClick={onEdit}
          className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:underline"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit Details
        </button>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        {/* Main photo */}
        <div className="relative">
          {photos[0] ? (
            <img src={photos[0].url} alt="main" className="w-full h-44 object-cover" />
          ) : (
            <div className="bg-gradient-to-br from-gray-300 to-gray-400 h-44 flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            FEATURED
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-1 px-3 py-2 overflow-hidden">
          {photos.slice(1, 4).map((p, i) => (
            <div key={i} className="w-16 h-10 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
              {p && <img src={p.url} alt="" className="w-full h-full object-cover" />}
            </div>
          ))}
          {uploadedCount > 4 && (
            <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center text-xs font-semibold text-gray-500 flex-shrink-0">
              +{uploadedCount - 4}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="px-4 pb-4">
          <h3 className="font-black text-gray-900 text-lg leading-tight">
            {form.year && form.brand && form.model
              ? `${form.year} ${form.brand} ${form.model}`
              : "Your Car Listing"}
          </h3>
          <p className="text-gray-500 text-sm">{form.condition} • {form.color}</p>
          <p className="text-blue-600 font-black text-2xl mt-2">
            {form.price ? `$${parseFloat(form.price).toLocaleString()}` : "—"}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {[
              { label: "MILEAGE", value: form.mileage ? `${parseInt(form.mileage).toLocaleString()} KM` : "—" },
              { label: "FUEL",    value: form.fuelType },
              { label: "TRANS.",  value: form.transmission === "Automatic" ? "Auto" : "Manual" },
              { label: "OWNERS", value: form.previousOwners },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-400 font-semibold">{label}</p>
                <p className="text-sm font-bold text-gray-800 mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {/* Verified badge */}
          <div className="flex items-center gap-2 mt-3 bg-green-50 rounded-lg px-3 py-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <span className="text-green-700 text-sm font-semibold">Verified Listing Info</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-2 px-2">
        This preview is based on your entries. Prices include VAT where applicable.
      </p>
    </div>
  );
}
