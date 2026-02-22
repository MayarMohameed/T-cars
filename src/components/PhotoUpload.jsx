// PhotoUpload.jsx
const MAX_PHOTOS = 5;

const PhotoSlot = ({ index, isMain, photos, photoError, onUpload, onRemove }) => {
  const photo = photos[index];
  const slotError = photoError && !photo;

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        border: photo
          ? "2px solid #93c5fd"
          : slotError
          ? "2px dashed #fca5a5"
          : "2px dashed #e5e7eb",
        minHeight: isMain ? 180 : 90,
        background: slotError ? "#fff5f5" : undefined,
      }}
    >
      {photo ? (
        <>
          <img
            src={photo.url}
            alt={photo.name}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <button
            onClick={() => onRemove(index)}
            style={{
              position: "absolute", top: 6, right: 6,
              width: 24, height: 24,
              background: "rgba(0,0,0,0.6)",
              borderRadius: "50%", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {isMain && (
            <div style={{
              position: "absolute", bottom: 8, left: 8,
              background: "#2563eb", color: "white",
              fontSize: 10, fontWeight: 700,
              padding: "2px 8px", borderRadius: 4,
            }}>
              MAIN
            </div>
          )}
        </>
      ) : (
        <label style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          width: "100%", minHeight: isMain ? 180 : 90,
          cursor: "pointer", padding: 16,
        }}>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={e => onUpload(e, index)}
          />
          {isMain ? (
            <>
              <div style={{
                width: 56, height: 56,
                background: slotError ? "#fee2e2" : "#dbeafe",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 12, position: "relative",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={slotError ? "#ef4444" : "#2563eb"} strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <div style={{
                  position: "absolute", bottom: -4, right: -4,
                  width: 20, height: 20,
                  background: slotError ? "#ef4444" : "#2563eb",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: slotError ? "#ef4444" : "#374151" }}>
                Main Image
              </p>
              <p style={{ fontSize: 11, color: slotError ? "#f87171" : "#9ca3af", textAlign: "center", marginTop: 4 }}>
                Click to upload the primary view of your car
              </p>
            </>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={slotError ? "#fca5a5" : "#9ca3af"} strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          )}
        </label>
      )}
    </div>
  );
};

export default function PhotoUpload({ photos, photoError, onUpload, onRemove }) {
  const uploadedCount = photos.filter(Boolean).length;

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border transition-colors ${photoError ? "border-red-300" : "border-gray-100"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${photoError ? "bg-red-100" : "bg-orange-100"}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={photoError ? "#ef4444" : "#f97316"} strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">Upload Car Photos</h2>
        </div>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${
          uploadedCount === MAX_PHOTOS
            ? "bg-green-100 text-green-700"
            : photoError
            ? "bg-red-100 text-red-600"
            : "bg-gray-100 text-gray-500"
        }`}>
          {uploadedCount} / {MAX_PHOTOS} Uploaded
        </span>
      </div>

      {/* Status notice */}
      {photoError ? (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
          </svg>
          <div>
            <p className="text-red-700 text-sm font-semibold">All 5 photos are required</p>
            <p className="text-red-500 text-xs mt-0.5">
              You've uploaded {uploadedCount} photo{uploadedCount !== 1 ? "s" : ""}. Please add {MAX_PHOTOS - uploadedCount} more to continue.
            </p>
          </div>
        </div>
      ) : uploadedCount > 0 && uploadedCount < MAX_PHOTOS ? (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" className="flex-shrink-0">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <path d="M12 9v4M12 17h.01" />
          </svg>
          <p className="text-amber-700 text-sm font-medium">
            {uploadedCount} of {MAX_PHOTOS} photos uploaded — {MAX_PHOTOS - uploadedCount} more needed.
          </p>
        </div>
      ) : uploadedCount === MAX_PHOTOS ? (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <p className="text-green-700 text-sm font-medium">All 5 photos uploaded. You're good to go!</p>
        </div>
      ) : (
        <p className="text-gray-400 text-xs mb-5">Upload exactly 5 photos. The first will be your main listing image.</p>
      )}

      {/* Grid: main slot (row-span-2) + 4 small slots */}
      <div className="grid grid-cols-3 gap-3" style={{ gridTemplateRows: "auto auto" }}>
        <div style={{ gridRow: "1 / 3" }}>
          <PhotoSlot index={0} isMain={true} photos={photos} photoError={photoError} onUpload={onUpload} onRemove={onRemove} />
        </div>
        {[1, 2, 3, 4].map(i => (
          <PhotoSlot key={i} index={i} isMain={false} photos={photos} photoError={photoError} onUpload={onUpload} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}
