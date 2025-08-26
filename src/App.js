import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";

// ======================
// CONFIGURATION GLOBALE
// ======================
const BRAND = {
  company: "DIGI BRAIN",
  phone: "+229 01 55 34 11 59",
  email: "contact@digibrain.bj",
  location: "Cotonou, Bénin",
  whatsapp: "+2290155341159",
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  website: "https://digibrain.bj",
};

// Liste des services proposés
const packElements = [
  { id: 1, name: "Site vitrine + domaine + hébergement 3 ans", price: 250000, category: "Web", icon: "🌐" },
  { id: 2, name: "Page professionnelle réseaux sociaux", price: 30000, category: "Social", icon: "📱" },
  { id: 3, name: "Compte PayPal Business", price: 20000, category: "Paiement", icon: "💳" },
  { id: 4, name: "Campagne publicitaire ADS", price: 50000, category: "Marketing", icon: "📢" },
  { id: 5, name: "Vidéo professionnelle 1", price: 100000, category: "Média", icon: "🎥" },
  { id: 6, name: "Vidéo professionnelle 2", price: 100000, category: "Média", icon: "🎬" },
  { id: 7, name: "15 visuels réseaux sociaux", price: 50000, category: "Design", icon: "🎨" },
  { id: 8, name: "Référencement local SEO", price: 50000, category: "SEO", icon: "🔍" },
];

// Pourcentage de réduction
const percent = 15;

// Fonction utilitaire pour formater les prix en FCFA
const formatFCFA = (n) => n.toLocaleString("fr-FR") + " FCFA";

// Fonction utilitaire pour combiner des classes CSS
const cx = (...classes) => classes.filter(Boolean).join(" ");

// ======================
// COMPOSANTS REUTILISABLES
// ======================

// Composant pour le champ de formulaire
const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {children}
  </div>
);

// Composant pour les éléments de la FAQ
const FaqItem = ({ q, a }) => (
  <details className="group bg-white rounded-2xl border p-5">
    <summary className="cursor-pointer select-none font-semibold flex items-center justify-between">
      {q}
      <span className="text-gray-500 group-open:rotate-45 transition-transform">＋</span>
    </summary>
    <div className="pt-3 text-gray-700">{a}</div>
  </details>
);

// ======================
// COMPOSANTS PRINCIPAUX
// ======================

// Barre de navigation
const Topbar = () => {
  const navigate = useNavigate();
  const links = [
    { to: "/", label: "Accueil" },
    { to: "/offre", label: "Offre Q4" },
    { to: "/calculateur", label: "Calculateur" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  const openWhatsApp = () => {
    const url = `https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      "Bonjour, je suis intéressé par le Pack Visibilité 360° IMMOBILIER (Q4)."
    )}`;
    window.open(url, "_blank");
  };

  return (
    <header className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 py-4 max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-700 text-white grid place-items-center font-bold">DB</div>
          <div>
            <p className="text-sm text-gray-500 leading-none">{BRAND.company}</p>
            <h1 className="text-lg font-semibold leading-none">Pack Visibilité 360° Immobilier</h1>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cx(
                  "px-4 py-2 rounded-xl text-sm font-medium",
                  isActive ? "bg-blue-700 text-white" : "hover:bg-gray-100"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/calculateur")}
            className="hidden md:inline-flex bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-black"
          >
            Obtenir mon devis
          </button>
          <button onClick={openWhatsApp} className="inline-flex bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700">
            WhatsApp
          </button>
        </div>
      </div>
    </header>
  );
};

// Pied de page
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 mt-16">
    <div className="container mx-auto px-4 py-10 max-w-7xl grid md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-white font-semibold mb-3">{BRAND.company}</h3>
        <p className="text-sm opacity-80">Solution digitale pour agences immobilières au Bénin.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3">Contact</h4>
        <p className="text-sm">Tél: {BRAND.phone}</p>
        <p className="text-sm">Email: {BRAND.email}</p>
        <p className="text-sm">Adresse: {BRAND.location}</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3">Légal</h4>
        <p className="text-xs opacity-70">© 2025 {BRAND.company} — Tous droits réservés.</p>
        <p className="text-xs opacity-70">Délais de livraison estimés: 5 à 10 jours ouvrables selon le panier.</p>
      </div>
    </div>
  </footer>
);

// Carte de service
const ServiceCard = ({ service, selected, onToggle }) => (
  <div className={cx(
    "bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200",
    selected && "ring-2 ring-blue-600 border-blue-600"
  )}>
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-700 rounded-xl grid place-items-center text-white text-lg">
            {service.icon}
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{service.category}</span>
            <h3 className="font-semibold text-gray-800 leading-tight">{service.name}</h3>
          </div>
        </div>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(service.id)}
          className="w-5 h-5 accent-blue-700 cursor-pointer"
          aria-label={`Sélectionner ${service.name}`}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-700">{formatFCFA(service.price)}</div>
        <span className="text-sm text-gray-500">FCFA</span>
      </div>
    </div>
  </div>
);

// Formulaire de contact
const ContactForm = ({ selectedServices, total, onSubmitted }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    terms: false,
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const buildSummary = () => {
    const items = selectedServices.map((id) => packElements.find((s) => s.id === id));
    const lines = items.map((s) => `- ${s?.name} (${formatFCFA(s?.price || 0)})`).join("\n");
    return `Demande Pack Immobilier Q4\n\nNom: ${formData.name}\nEntreprise: ${formData.company}\nTéléphone: ${formData.phone}\nEmail: ${formData.email}\n\nServices sélectionnés (${selectedServices.length}):\n${lines}\n\nTotal estimé: ${formatFCFA(total)}\n\nMessage: ${formData.message}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.terms) return alert("Veuillez accepter les conditions.");
    if (selectedServices.length === 0) return alert("Sélectionnez au moins un service.");
    setSending(true);
    try {
      const msg = buildSummary();
      const wa = `https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`;
      window.open(wa, "_blank");
      onSubmitted?.();
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-8">
      <div className="border-l-4 border-blue-700 pl-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Demande officielle</h2>
        <p className="text-gray-600 text-sm">Remplissez et envoyez directement via WhatsApp.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Field label="Nom et Prénom *">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent outline-none"
              placeholder="Votre nom complet"
            />
          </Field>
          <Field label="Email professionnel *">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent outline-none"
              placeholder="votre.email@entreprise.com"
            />
          </Field>
          <Field label="Téléphone *">
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent outline-none"
              placeholder="+229 XX XX XX XX"
            />
          </Field>
          <Field label="Entreprise">
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent outline-none"
              placeholder="Nom de votre entreprise"
            />
          </Field>
        </div>
        <div className="space-y-4">
          <Field label="Message complémentaire">
            <textarea
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent outline-none resize-none"
              placeholder="Détails supplémentaires sur votre projet..."
            />
          </Field>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="terms"
              required
              checked={formData.terms}
              onChange={handleChange}
              className="mt-1 w-4 h-4 accent-blue-700"
            />
            <span>J'accepte les conditions générales et la politique de confidentialité.</span>
          </label>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-blue-700 text-white py-4 px-8 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-50"
          >
            {sending ? "Envoi en cours..." : "Soumettre la demande officielle via WhatsApp"}
          </button>
        </div>
      </div>
    </form>
  );
};

// ======================
// PAGES
// ======================

// Page d'accueil
const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-semibold mb-4">
          Q4 2025 — Réduction {percent}% dès 3 services
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Gagnez des mandats <span className="text-blue-700">plus vite</span> avec une visibilité 360°.
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Une solution digitale complète et modulable pour les agences immobilières au Bénin.
          Sélectionnez vos besoins, obtenez un devis instantané et lancez vos actions en 5 à 10 jours.
        </p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate("/calculateur")} className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800">
            Construire mon pack
          </button>
          <button onClick={() => navigate("/offre")} className="bg-white border px-6 py-3 rounded-xl font-semibold hover:bg-gray-50">
            Voir l'offre
          </button>
        </div>
        <ul className="mt-8 space-y-2 text-sm text-gray-700">
          <li>• Attirez plus de clients avec une présence pro</li>
          <li>• Augmentez votre crédibilité et vos ventes</li>
          <li>• Soyez prêt à dominer dès janvier 2026</li>
        </ul>
      </div>
      <div className="bg-white rounded-3xl border shadow-sm p-6">
        <HeroPricePreview />
      </div>
    </section>
  );
};

// Aperçu des prix sur la page d'accueil
const HeroPricePreview = () => {
  const exampleIds = [1, 2, 8];
  const total = exampleIds.reduce((sum, id) => sum + (packElements.find((s) => s.id === id)?.price || 0), 0);
  const reduced = Math.round(total * 0.85);
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Exemple de calcul</h3>
      <ul className="text-sm text-gray-700 space-y-2 mb-4">
        <li>Choix : Site + Page réseaux + SEO</li>
        <li>Montant: {formatFCFA(total)}</li>
        <li>Réduction {percent}% → <span className="font-bold">{formatFCFA(reduced)}</span></li>
      </ul>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {exampleIds.map((id) => {
          const s = packElements.find((x) => x.id === id) || {};
          return (
            <div key={id} className="rounded-xl border p-4">
              <div className="text-2xl">{s.icon}</div>
              <div className="font-medium mt-1 leading-tight">{s.name}</div>
              <div className="text-sm text-gray-500">{formatFCFA(s.price)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Page de l'offre
const Offer = () => (
  <section>
    <header className="text-center max-w-3xl mx-auto mb-10">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Fiche commerciale – Pack Visibilité 360° Immobilier (Q4)</h2>
      <p className="text-gray-600">Choisissez exactement ce dont vous avez besoin. {percent}% de réduction dès 3 éléments.</p>
    </header>
    <div className="overflow-x-auto bg-white rounded-2xl border shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="p-4">Élément</th>
            <th className="p-4">Prix</th>
            <th className="p-4">Sélection</th>
          </tr>
        </thead>
        <tbody>
          {packElements.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-4">
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-gray-500">Catégorie: {s.category}</div>
              </td>
              <td className="p-4">{formatFCFA(s.price)}</td>
              <td className="p-4">⬜</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-6 p-4 rounded-xl border bg-green-50 text-green-900">
      ⚡ <b>Réduction spéciale Q4:</b> {percent}% si vous choisissez <b>3 éléments ou plus</b>.
    </div>
  </section>
);

// Page du calculateur
const Calculator = () => {
const [selected, setSelected] = useState([]);


  const toggle = (id) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const { total, discounted, hasDiscount } = useMemo(() => {
    const subtotal = selected.reduce((sum, id) => sum + (packElements.find((s) => s.id === id)?.price || 0), 0);
    const eligible = selected.length >= 3;
    return {
      total: subtotal,
      discounted: eligible ? Math.round(subtotal * (1 - percent / 100)) : subtotal,
      hasDiscount: eligible,
    };
  }, [selected]);

  const plan = useMemo(() => {
    if (selected.length === 0) return "Aucun service sélectionné.\n\nVeuillez choisir au moins un service pour voir le plan d'exécution.";
    let steps = [];
    if (selected.includes(1)) steps.push("• Création et mise en ligne du site vitrine");
    if (selected.includes(2)) steps.push("• Configuration des pages réseaux sociaux");
    if (selected.includes(3)) steps.push("• Activation du compte PayPal Business");
    if (selected.includes(4)) steps.push("• Lancement des campagnes publicitaires");
    if (selected.includes(5) || selected.includes(6)) steps.push("• Production des vidéos professionnelles");
    if (selected.includes(7)) steps.push("• Création des visuels pour réseaux sociaux");
    if (selected.includes(8)) steps.push("• Optimisation du référencement local");
    const duration = selected.length <= 3 ? "5 jours ouvrables" : "10 jours ouvrables";
    return `ÉTAPES D'EXÉCUTION:\n${steps.join("\n")}\n\nDURÉE ESTIMÉE: ${duration}\n\nLIVRABLE: Rapport de mise en œuvre complet`;
  }, [selected]);

  return (
    <section>
      <header className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Construisez votre pack à la carte</h2>
        <p className="text-gray-600">Sélectionnez au moins 1 service. {percent}% de réduction appliquée automatiquement dès 3 services.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {packElements.map((service) => (
          <ServiceCard key={service.id} service={service} selected={selected.includes(service.id)} onToggle={toggle} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl shadow-sm border-l-4 border-blue-700 p-6">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-blue-700 rounded-full grid place-items-center text-white text-sm font-bold mr-3">€</div>
            <h3 className="text-2xl font-bold text-gray-800">Coût total</h3>
          </div>
          <div className="text-3xl font-extrabold text-blue-700 mb-1">{formatFCFA(discounted)}</div>
          <div className="text-sm text-gray-600">
            {hasDiscount ? (
              <span className="text-green-700 font-medium">✅ Réduction de {percent}% appliquée ({formatFCFA(total)} → {formatFCFA(discounted)})</span>
            ) : selected.length > 0 ? (
              <span>Sélectionnez {3 - selected.length} service(s) de plus pour obtenir {percent}% de réduction.</span>
            ) : (
              <span>Commencez par sélectionner vos services.</span>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border-l-4 border-blue-700 p-6">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-green-600 rounded-full grid place-items-center text-white text-sm font-bold mr-3">📋</div>
            <h3 className="text-2xl font-bold text-gray-800">Plan d'exécution</h3>
          </div>
          <pre className="text-gray-800 bg-gray-50 p-4 rounded-xl border text-sm whitespace-pre-wrap">{plan}</pre>
        </div>
      </div>
      <ContactForm selectedServices={selected} total={discounted} onSubmitted={() => setSelected([])} />
    </section>
  );
};

// Page FAQ
const FAQ = () => (
  <section className="max-w-3xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-6">FAQ</h2>
    <div className="space-y-4">
      <FaqItem q="Quels sont les délais ?" a="Entre 5 et 10 jours ouvrables selon le nombre d'éléments choisis." />
      <FaqItem q="Comment se passe le paiement ?" a="30% à la commande, 70% à la livraison. Facture fournie." />
      <FaqItem q="Proposez-vous un accompagnement ?" a="Oui, nous offrons 30 jours de support après livraison." />
      <FaqItem q="Puis-je modifier mon pack ?" a="Oui, jusqu'au démarrage de la production." />
    </div>
  </section>
);

// Page de contact
const Contact = () => (
  <section className="max-w-3xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Contact</h2>
    <div className="bg-white rounded-2xl border p-6">
      <p className="mb-3"><b>Téléphone:</b> {BRAND.phone}</p>
      <p className="mb-3"><b>Email:</b> {BRAND.email}</p>
      <p className="mb-3"><b>Adresse:</b> {BRAND.location}</p>
      <div className="flex gap-3 mt-4">
        <a
          className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700"
          href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noreferrer"
        >
          Écrire sur WhatsApp
        </a>
        <a className="bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800" href={`mailto:${BRAND.email}`}>Envoyer un email</a>
      </div>
    </div>
  </section>
);

// Coque principale de l'application
const Shell = ({ children }) => (
  <div className="min-h-screen bg-gray-50 text-gray-800">
    <Topbar />
    <main className="container mx-auto px-4 py-10 max-w-7xl">{children}</main>
    <Footer />
  </div>
);

// ======================
// APPLICATION PRINCIPALE
// ======================
const App = () => (
  <Router>
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offre" element={<Offer />} />
        <Route path="/calculateur" element={<Calculator />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Shell>
  </Router>
);

export default App;

