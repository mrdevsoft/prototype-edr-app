export const translations = {
  fr: {
    // Navigation
    home: "Accueil",
    myTickets: "Mes Billets",
    settings: "Paramètres",
    profile: "Profil",
    logout: "Déconnexion",
    
    // Auth
    login: "Se connecter",
    signup: "S'inscrire",
    email: "Email",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    createAccount: "Créer un compte",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    dontHaveAccount: "Vous n'avez pas de compte ?",
    continue: "Continuer",
    
    // Home
    searchTrains: "Rechercher",
    from: "De",
    to: "Vers",
    departure: "Départ",
    return: "Retour",
    passengers: "Passagers",
    oneWay: "Aller simple",
    roundTrip: "Aller-retour",
    popularRoutes: "Trajets populaires",
    recentSearches: "Recherches récentes",
    specialOffers: "Offres spéciales",
    quickAccess: "Accès rapide",
    tickets: "Billets",
    favorites: "Favoris",
    offers: "Offres",
    
    // Ticket
    ticketDetails: "Détails du billet",
    passenger: "Passager",
    seat: "Siège",
    coach: "Voiture",
    price: "Prix",
    total: "Total",
    status: "Statut",
    confirmed: "Confirmé",
    pending: "En attente",
    cancelled: "Annulé",
    download: "Télécharger",
    share: "Partager",
    
    // Settings
    language: "Langue",
    currency: "Devise",
    notifications: "Notifications",
    darkMode: "Mode sombre",
    profileManagement: "Gestion du profil",
    paymentMethods: "Moyens de paiement",
    
    // Payment
    selectPayment: "Choisir un moyen de paiement",
    creditCard: "Carte de crédit",
    waafi: "Waafi Money",
    dmoney: "D-Money",
    phoneNumber: "Numéro de téléphone",
    pinCode: "Code PIN",
    payNow: "Payer maintenant",
    
    // Stations
    stations: {
      djibouti: "Djibouti",
      direDawa: "Dire-dawa", 
      nagad: "Nagad Djibouti",
      holhol: "Holhol",
      aliSabieh: "Ali-sabieh",
      dawaleh: "Dawaleh"
    },
    
    // Messages
    welcomeMessage: "Bienvenue sur EDR",
    loadingMessage: "Chargement...",
    noTicketsFound: "Aucun billet trouvé",
    tripFound: "voyage trouvé",
    tripsFound: "voyages trouvés"
  },
  en: {
    // Navigation  
    home: "Home",
    myTickets: "My Tickets",
    settings: "Settings", 
    profile: "Profile",
    logout: "Logout",
    
    // Auth
    login: "Login",
    signup: "Sign up",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot password?",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    continue: "Continue",
    
    // Home
    searchTrains: "Search",
    from: "From",
    to: "To", 
    departure: "Departure",
    return: "Return",
    passengers: "Passengers",
    oneWay: "One way",
    roundTrip: "Round trip",
    popularRoutes: "Popular routes",
    recentSearches: "Recent searches",
    specialOffers: "Special offers",
    quickAccess: "Quick access",
    tickets: "Tickets",
    favorites: "Favorites", 
    offers: "Offers",
    
    // Ticket
    ticketDetails: "Ticket details",
    passenger: "Passenger",
    seat: "Seat",
    coach: "Coach",
    price: "Price",
    total: "Total",
    status: "Status",
    confirmed: "Confirmed",
    pending: "Pending",
    cancelled: "Cancelled",
    download: "Download",
    share: "Share",
    
    // Settings
    language: "Language",
    currency: "Currency",
    notifications: "Notifications",
    darkMode: "Dark mode",
    profileManagement: "Profile management",
    paymentMethods: "Payment methods",
    
    // Payment
    selectPayment: "Select payment method",
    creditCard: "Credit card",
    waafi: "Waafi Money",
    dmoney: "D-Money",
    phoneNumber: "Phone number",
    pinCode: "PIN code",
    payNow: "Pay now",
    
    // Stations
    stations: {
      djibouti: "Djibouti",
      direDawa: "Dire-dawa",
      nagad: "Nagad Djibouti", 
      holhol: "Holhol",
      aliSabieh: "Ali-sabieh",
      dawaleh: "Dawaleh"
    },
    
    // Messages
    welcomeMessage: "Welcome to EDR",
    loadingMessage: "Loading...",
    noTicketsFound: "No tickets found",
    tripFound: "trip found",
    tripsFound: "trips found"
  }
};

export type Language = keyof typeof translations; 