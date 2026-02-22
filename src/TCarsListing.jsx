import { useState } from "react";

const BRANDS = ["Porsche", "BMW", "Mercedes", "Audi", "Toyota", "Ford", "Tesla", "Ferrari"];
const MODELS = {
  Porsche: ["911", "Cayenne", "Macan", "Panamera"],
  BMW: ["M3", "M5", "X5", "3 Series", "5 Series"],
  Mercedes: ["C-Class", "E-Class", "GLE", "AMG GT"],
  Audi: ["A4", "A6", "Q5", "Q7", "RS6"],
  Toyota: ["Camry", "Corolla", "RAV4", "Land Cruiser"],
  Ford: ["Mustang", "F-150", "Explorer", "Bronco"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
  Ferrari: ["488", "F8", "Roma", "SF90"],
};
const CITIES = ["Cairo", "Riyadh", "Dubai", "Casablanca", "Alexandria", "Jeddah", "Abu Dhabi", "Doha"];
const YEARS = Array.from({ length: 30 }, (_, i) => (2024 - i).toString());
const COLORS = ["Black", "White", "Silver", "Blue", "Red", "Grey", "Green", "Yellow", "Orange", "Brown"];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"];
const MAX_PHOTOS = 5;

export default function TCarsListing() {
  const [step, setStep] = useState(1);

  // Step 1 terms checkbox
  const [agreed, setAgreed] = useState(false);
  // Step 2 declaration checkbox
  const [agreed2, setAgreed2] = useState(false);
  // Success message state
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    brand: "", model: "", year: "", city: "",
    condition: "New", price: "", description: "",
    transmission: "Automatic", fuelType: "Petrol",
    mileage: "", color: "Black",
    previousOwners: "1st Owner", insurance: true, regDate: "",
  });
  const [errors, setErrors] = useState({});
  // Exactly MAX_PHOTOS (5) slots
  const [photos, setPhotos] = useState(Array(MAX_PHOTOS).fill(undefined));
  const [photoError, setPhotoError] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const uploadedCount = photos.filter(Boolean).length;

  // ── Photo helpers ──────────────────────────────────────────────
  const handlePhotoUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotos(prev => { const next = [...prev]; next[index] = { url, name: file.name }; return next; });
    setPhotoError(false);
    e.target.value = "";
  };

  const removePhoto = (index) => {
    setPhotos(prev => { const next = [...prev]; next[index] = undefined; return next; });
  };

  // ── Step 1 validation ──────────────────────────────────────────
  const validateStep1 = () => {
    const e = {};
    if (!form.brand) e.brand = "Please select a brand";
    if (!form.model) e.model = "Please select a model";
    if (!form.year) e.year = "Please select a valid manufacturing year";
    if (!form.city) e.city = "Please select a city";
    if (!form.price || parseFloat(form.price) <= 0) e.price = "Please enter a valid price";
    setErrors(e);
    const hasPhotoError = uploadedCount < MAX_PHOTOS;
    setPhotoError(hasPhotoError);
    return Object.keys(e).length === 0 && !hasPhotoError && agreed;
  };

  const handleContinue = () => {
    if (validateStep1()) setStep(2);
  };

  // ── Step 2: Publish button enabled only when all fields + checkbox ──
  const step2Complete =
    form.mileage &&
    form.regDate &&
    agreed2;

  // ── Shared class helpers ───────────────────────────────────────
  const inputCls = (field) =>
    `w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
      errors[field] ? "border-red-400 bg-red-50" : "border-blue-500 bg-white"
    }`;

  const selectCls = (field) =>
    `w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none bg-white ${
      errors[field] ? "border-red-400 bg-red-50" : "border-blue-500"
    }`;

  // ── Photo Slot ─────────────────────────────────────────────────
  const PhotoSlot = ({ index, isMain }) => {
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
            : "2px dashed #3b82f6",
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
              onClick={() => removePhoto(index)}
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
              }}>MAIN</div>
            )}
          </>
        ) : (
          <label style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            width: "100%", minHeight: isMain ? 180 : 90,
            cursor: "pointer", padding: 16,
          }}>
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handlePhotoUpload(e, index)} />
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
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                  </svg>
                  <div style={{
                    position: "absolute", bottom: -4, right: -4,
                    width: 20, height: 20,
                    background: slotError ? "#ef4444" : "#2563eb",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </div>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: slotError ? "#ef4444" : "#374151" }}>Main Image</p>
                <p style={{ fontSize: 11, color: slotError ? "#f87171" : "#9ca3af", textAlign: "center", marginTop: 4 }}>
                  Click to upload the primary view of your car
                </p>
              </>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={slotError ? "#fca5a5" : "#9ca3af"} strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            )}
          </label>
        )}
      </div>
    );
  };

  // ── Listing Preview (Step 2 right column) ──────────────────────
  const ListingPreview = () => (
    <div className="sticky top-24">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Listing Preview</span>
        <button onClick={() => setStep(1)} className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:underline">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit Details
        </button>
      </div>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="relative">
          {photos[0] ? (
            <img src={photos[0].url} alt="main" className="w-full h-44 object-cover" />
          ) : (
            <div className="bg-gradient-to-br from-gray-300 to-gray-400 h-44 flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
              </svg>
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">FEATURED</div>
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
          <div className="flex items-center gap-2 mt-3 bg-green-50 rounded-lg px-3 py-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
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

  // ══════════════════════════════════════════════════════════════
  return (
    <div className="w-full min-h-screen bg-blue-100 font-sans">

      {/* ── Navbar ── */}
      <nav className="w-screen bg-blue-600 border-b border-gray-100 px-2 py-4 flex items-center justify-between sticky top-0 z-50 rounded-b-lg" style={{ marginLeft: "calc(-50vw + 50%)" }}>
        <div className="flex items-center gap-2 ml-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2l3-4h8l3 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-2"/>
              <circle cx="7.5" cy="17" r="2.5"/><circle cx="16.5" cy="17" r="2.5"/>
            </svg>
          </div>
          <span className="font-bold text-white text-lg tracking-tight">T-CARS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
          {step === 1
            ? ["Dashboard", "Listings", "Messages", "Settings"].map(n => (
                <button key={n} className={`hover:text-gray-100 transition ${n === "Listings" ? "text-yellow-300 font-semibold" : ""}`}>{n}</button>
              ))
            : ["Cars for Sale", "Sell Your Car", "Reviews", "News"].map(n => (
                <button key={n} className="hover:text-gray-100 transition">{n}</button>
              ))}
        </div>
        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-blue-600 text-sm font-bold cursor-pointer ml-4 mr-4">M</div>
      </nav>

      <div className="w-full px-3 py-8">

        {/* Header + Progress */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">
              {step === 1 ? <span className="text-blue-600">Start Selling Your Car</span> : <span className="text-blue-600">Review & Additional Details</span>}
            </h1>
            <p className="text-gray-500 mt-1 text-sm -ml-30">
              {step === 1 ? "Basic Information & Photos" : ""}
            </p>
          </div>
          <div className="text-right min-w-[140px]">
            <div className="flex items-center justify-end gap-2 mb-2">
              <span className="text-sm text-gray-500">Step {step} of 2</span>
              <span className="text-sm font-bold text-blue-600">{step === 1 ? "50%" : "100%"}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full w-36">
              <div className={`h-2 bg-blue-600 rounded-full transition-all duration-500 ${step === 1 ? "w-1/2" : "w-full"}`} />
            </div>
          </div>
        </div>

        {/* ══════════ STEP 1 ══════════ */}
        {step === 1 ? (
          <div className="space-y-6">

            {/* Vehicle Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 opacity-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-blue-600">Vehicle Information</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Brand */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">Brand</label>
                  <div className="relative">
                    <input
                      list="brands"
                      value={form.brand}
                      onChange={e => { set("brand", e.target.value); set("model", ""); }}
                      placeholder="e.g. Porsche"
                      className={inputCls("brand") + " pr-10"}
                    />
                    <datalist id="brands">{BRANDS.map(b => <option key={b} value={b} />)}</datalist>
                    {form.brand && BRANDS.includes(form.brand) && !errors.brand && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                    )}
                    {errors.brand && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">!</div>
                    )}
                  </div>
                  {form.brand && BRANDS.includes(form.brand) && <p className="text-green-600 text-xs mt-1">Verified brand selection</p>}
                  {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
                </div>

                {/* Model */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">Model</label>
                  <div className="relative">
                    <select value={form.model} onChange={e => set("model", e.target.value)} className={selectCls("model")}>
                      <option value="">Select Model</option>
                      {(MODELS[form.brand] || []).map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </div>
                  {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
                </div>

                {/* Year */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">Year</label>
                  <div className="relative">
                    <select value={form.year} onChange={e => set("year", e.target.value)} className={selectCls("year")}>
                      <option value="">Select Year</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    {errors.year
                      ? <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">!</div>
                      : <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    }
                  </div>
                  {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">City</label>
                  <div className="relative">
                    <input
                      list="cities"
                      value={form.city}
                      onChange={e => set("city", e.target.value)}
                      placeholder="Cairo"
                      className={inputCls("city") + " pr-10"}
                    />
                    <datalist id="cities">{CITIES.map(c => <option key={c} value={c} />)}</datalist>
                  </div>
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">Condition</label>
                  <div className="flex rounded-lg border border-blue-500 overflow-hidden w-fit">
                    {["New", "Used"].map(c => (
                      <button key={c} onClick={() => set("condition", c)}
                        className={`px-6 py-2.5 text-sm font-medium transition ${form.condition === c ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">Asking Price ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                    <input type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="0.00" className={inputCls("price") + " pl-8"} />
                  </div>
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => set("description", e.target.value)}
                  rows={4}
                  placeholder="Tell potential buyers about the features, history, and any upgrades..."
                  className="w-full border border-blue-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
              </div>
            </div>

            {/* ── Photos (max 5) ── */}
            <div className={`bg-white rounded-2xl p-6 shadow-sm border transition-colors opacity-100 ${photoError ? "border-red-300" : "border-blue-500"}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${photoError ? "bg-red-100" : "bg-orange-100"}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={photoError ? "#ef4444" : "#f97316"} strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-blue-600">Upload Car Photos</h2>
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

              {/* Dynamic notice */}
              {photoError ? (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
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
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/>
                  </svg>
                  <p className="text-amber-700 text-sm font-medium">
                    {uploadedCount} of {MAX_PHOTOS} photos uploaded — {MAX_PHOTOS - uploadedCount} more needed to continue.
                  </p>
                </div>
              ) : uploadedCount === MAX_PHOTOS ? (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  <p className="text-green-700 text-sm font-medium">All 5 photos uploaded. You're good to go!</p>
                </div>
              ) : (
                <p className="text-gray-400 text-xs mb-5">Upload exactly 5 photos. The first will be your main listing image.</p>
              )}

              {/* 3-column grid: main slot (row-span-2) + 4 small slots */}
              <div className="grid grid-cols-3 gap-3" style={{ gridTemplateRows: "auto auto" }}>
                <div style={{ gridRow: "1 / 3" }}>
                  <PhotoSlot index={0} isMain={true} />
                </div>
                <PhotoSlot index={1} isMain={false} />
                <PhotoSlot index={2} isMain={false} />
                <PhotoSlot index={3} isMain={false} />
                <PhotoSlot index={4} isMain={false} />
              </div>
            </div>

            {/* ── Terms & Conditions checkbox (REQUIRED) + Continue Button ── */}
            <div className="flex items-start gap-3 justify-between">
              <div className={`flex items-start gap-3 flex-1 px-1 py-3 rounded-xl transition ${!agreed && errors.agreed ? "bg-red-50 border border-red-200 px-4" : ""}`}>
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                  I agree to the{" "}
                  <span className="text-blue-600 font-medium">Terms & Conditions</span>{" "}
                  and{" "}
                  <span className="text-blue-600 font-medium">Privacy Policy</span>.
                  <br />
                  <span className="text-xs text-gray-400">Your listing will be reviewed by our moderation team before going live.</span>
                </label>
              </div>
              <button
                onClick={handleContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition flex items-center gap-2 shadow-lg shadow-blue-200 whitespace-nowrap ml-4 h-fit"
              >
                Continue to Step 2
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            {/* Show hint if tried to continue without checking */}
            {!agreed && Object.keys(errors).length > 0 && (
              <p className="text-red-500 text-xs px-1">You must agree to the Terms & Conditions to continue.</p>
            )}
          </div>

        ) : (
          /* ══════════ STEP 2 ══════════ */
          <div className="grid grid-cols-2 gap-6 items-start">

            {/* LEFT: Specs + Declaration + Actions */}
            <div className="space-y-5">
              <div className="flex border-b border-gray-200">
                <button onClick={() => setStep(1)} className="px-4 py-3 text-sm font-semibold text-gray-400 hover:text-blue-600 transition">INFORMATION</button>
                <button className="px-4 py-3 text-sm font-semibold text-blue-600 border-b-2 border-blue-600 ml-2">REVIEW & PUBLISH (100%)</button>
              </div>

              {/* Vehicle Specifications */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 opacity-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-blue-600">Vehicle Specifications</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Transmission */}
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">Transmission</label>
                    <div className="flex rounded-lg border border-gray-200 overflow-hidden w-fit">
                      {["Automatic", "Manual"].map(t => (
                        <button key={t} onClick={() => set("transmission", t)}
                          className={`px-4 py-2.5 text-sm font-medium transition ${form.transmission === t ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">Fuel Type</label>
                    <div className="relative">
                      <select value={form.fuelType} onChange={e => set("fuelType", e.target.value)} className={selectCls("")}>
                        {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </div>

                  {/* Mileage — required */}
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">
                      Mileage (KM) <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={form.mileage}
                        onChange={e => set("mileage", e.target.value)}
                        placeholder="e.g. 45,000"
                        className={`${inputCls("")} pr-12 ${!form.mileage && !step2Complete ? "border-gray-200" : ""}`}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">km</span>
                    </div>
                  </div>

                  {/* Exterior Color */}
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">Exterior Color</label>
                    <div className="relative">
                      <select value={form.color} onChange={e => set("color", e.target.value)} className={selectCls("")}>
                        {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </div>

                  {/* Previous Owners */}
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">Previous Owners</label>
                    <div className="relative">
                      <select value={form.previousOwners} onChange={e => set("previousOwners", e.target.value)} className={selectCls("")}>
                        {["1st Owner", "2nd Owner", "3rd Owner", "4th+ Owner"].map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </div>

                  {/* Valid Insurance */}
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">Valid Insurance</label>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">No</span>
                      <button
                        onClick={() => set("insurance", !form.insurance)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${form.insurance ? "bg-blue-600" : "bg-gray-300"}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.insurance ? "translate-x-7" : "translate-x-1"}`} />
                      </button>
                      <span className={`text-sm font-medium ml-3 ${form.insurance ? "text-blue-600" : "text-gray-500"}`}>Yes</span>
                    </div>
                  </div>

                  {/* Registration Date — required */}
                  <div className="col-span-2">
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">
                      Registration Date <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      value={form.regDate}
                      onChange={e => set("regDate", e.target.value)}
                      className={inputCls("")}
                    />
                  </div>
                </div>
              </div>

              {/* ── Declaration checkbox (REQUIRED for Publish) ── */}
              <div className={`rounded-2xl p-5 border flex items-start gap-3 transition-colors opacity-100 ${
                agreed2
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
              }`}>
                <input
                  type="checkbox"
                  id="decl"
                  checked={agreed2}
                  onChange={e => setAgreed2(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 cursor-pointer"
                />
                <label htmlFor="decl" className="text-sm text-gray-600 cursor-pointer">
                  I hereby declare that all information provided is accurate to the best of my knowledge. I agree to the{" "}
                  <span className="text-blue-600 font-medium">Listing Terms and Conditions</span>{" "}
                  and understand that misleading info may lead to listing removal.
                </label>
              </div>

              {/* ── Actions ── */}
              <div className="space-y-2">
                <div className="flex gap-4">
                  {/* Publish — disabled + blurred until step2Complete */}
                  <button
                    onClick={() => setShowSuccess(true)}
                    disabled={!step2Complete}
                    className={`flex-1 font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2 ${
                      step2Complete
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 cursor-pointer"
                        : "bg-blue-300 text-white cursor-not-allowed opacity-50 blur-[0.4px]"
                    }`}
                  >
                    Publish Listing
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-white border-2 border-white text-blue-600 font-semibold py-4 rounded-xl transition"
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#C3DDFD'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
                  >
                    Back to Step 1
                  </button>
                </div>

                {/* Hint message when button is disabled */}
                {!step2Complete && (
                  <p className="text-xs text-gray-400 text-center">
                    {!form.mileage && !form.regDate && !agreed2
                      ? "Fill in mileage, registration date and check the declaration to publish."
                      : !form.mileage
                      ? "Please enter the mileage to continue."
                      : !form.regDate
                      ? "Please enter the registration date to continue."
                      : "Please check the declaration above to publish."}
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT: Listing Preview */}
            <ListingPreview />
          </div>
        )}
      </div>

      {/* Success Message Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md text-center animate-in">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">Your application was sent successfully</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="w-screen text-center text-xs text-white py-8 mt-4 bg-blue-600 rounded-t-lg" style={{ marginLeft: "calc(-50vw + 50%)" }}>
        © 2024 T-Cars {step === 2 ? "Global Automotive" : ""} Marketplace. All rights reserved.
      </footer>
    </div>
  );
}
