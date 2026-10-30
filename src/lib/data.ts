import type { TravelPackage, Booking, Testimonial } from "./types";

const baliItinerary = [
  {
    day: "01",
    title: "Arrival & Beach Welcome",
    description:
      "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.",
  },
  {
    day: "02",
    title: "Cultural Temple Tour",
    description:
      "Visit iconic temples including Tanah Lot and Uluwatu. Watch traditional Kecak dance at sunset.",
  },
  {
    day: "03",
    title: "Beach & Water Activities",
    description:
      "Snorkeling, surfing lessons, or simply relax on pristine beaches. Evening beach barbecue.",
  },
  {
    day: "04",
    title: "Rice Terraces & Spa",
    description: "Explore Tegalalang Rice Terraces and enjoy a traditional Balinese massage.",
  },
  {
    day: "05",
    title: "Mount Batur Sunrise Trek",
    description: "Early morning volcano trek to watch the sunrise. Return for breakfast and rest.",
  },
  {
    day: "06",
    title: "Free Day & Shopping",
    description: "Explore Ubud markets, art galleries, or enjoy resort amenities.",
  },
  {
    day: "07",
    title: "Departure",
    description: "Final breakfast and transfer to airport with unforgettable memories.",
  },
];

const baliOverview =
  "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.";

export const SEED_PACKAGES: TravelPackage[] = [
  {
    id: "bali-paradise",
    name: "Bali Paradise",
    country: "Indonesia",
    category: "Beach",
    price: 1299,
    duration: "7 Days / 6 Nights",
    departure: "05/15/2026",
    image: "/assets/bali-paradise.jpg",
    rating: 4.9,
    reviews: 234,
    description: baliOverview,
    highlights: [
      "Luxury beachfront accommodation",
      "Traditional Balinese spa treatment",
      "Sunrise trek to Mount Batur",
      "Visit Uluwatu Temple at sunset",
      "Private beach dinner experience",
    ],
    itinerary: baliItinerary,
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps Adventure",
    country: "Switzerland",
    category: "Adventure",
    price: 1850,
    duration: "6 Days / 5 Nights",
    departure: "06/02/2026",
    image: "/assets/swiss-alps.jpg",
    rating: 4.8,
    reviews: 189,
    description:
      "Breathtaking mountain views, scenic train journeys, and alpine charm. Experience the Swiss Alps from Lucerne to Zermatt with guided hikes and lake cruises.",
    highlights: [
      "Scenic Glacier Express journey",
      "Guided alpine hiking trails",
      "Visit Jungfraujoch — Top of Europe",
      "Thermal spa experiences",
      "Authentic Swiss fondue dinner",
    ],
    itinerary: [
      { day: "01", title: "Arrival in Zurich", description: "Airport transfer and evening old-town stroll in Lucerne." },
      { day: "02", title: "Lake Lucerne Cruise", description: "Panoramic boat cruise followed by mountain railway to Rigi." },
      { day: "03", title: "Glacier Express", description: "Board the world-famous panoramic train to Zermatt." },
      { day: "04", title: "Matterhorn Day", description: "Klein Matterhorn cableway and alpine viewpoints." },
      { day: "05", title: "Spa & Leisure", description: "Relax in thermal baths and explore village boutiques." },
      { day: "06", title: "Departure", description: "Return rail journey to Zurich for departure." },
    ],
  },
  {
    id: "sacred-valley",
    name: "Sacred Valley Trek",
    country: "Peru",
    category: "Adventure",
    price: 1490,
    duration: "8 Days / 7 Nights",
    departure: "07/10/2026",
    image: "/assets/peru-trek.jpg",
    rating: 4.9,
    reviews: 156,
    description:
      "Follow the Inca trail to the legendary citadel of Machu Picchu. Explore Cusco, the Sacred Valley, and rainbow pastel villages in the Andes.",
    highlights: [
      "Guided Machu Picchu sunrise tour",
      "Cusco & Sacred Valley day trips",
      "Traditional weaving workshop",
      "Andean hot springs",
      "Peruvian cooking class",
    ],
    itinerary: [
      { day: "01", title: "Arrival in Cusco", description: "Transfer to hotel and acclimatization day." },
      { day: "02", title: "Sacred Valley Tour", description: "Pisac ruins, Ollantaytambo fortress, and market visit." },
      { day: "03", title: "Inca Trail Start", description: "Begin trek through cloud forest with porters." },
      { day: "04", title: "Dead Woman's Pass", description: "Challenge the highest point of the classic Inca trail." },
      { day: "05", title: "Sun Gate Arrival", description: "Sunrise at Inti Punku and first view of Machu Picchu." },
      { day: "06", title: "Machu Picchu", description: "Full guided tour of the citadel and Huayna Picchu climb." },
      { day: "07", title: "Cusco Highlights", description: "Free day for museums, cathedrals, and café hopping." },
      { day: "08", title: "Departure", description: "Transfer to Cusco airport." },
    ],
  },
  {
    id: "tropical-coast",
    name: "Tropical Coast Breeze",
    country: "Mexico",
    category: "Beach",
    price: 1150,
    duration: "5 Days / 4 Nights",
    departure: "06/20/2026",
    image: "/assets/tropical-beach.jpg",
    rating: 4.6,
    reviews: 98,
    description:
      "Turquoise waters, powder-white sand, and beachfront relaxation. All-inclusive Caribbean coast resorts with day trips to cenotes and Mayan ruins.",
    highlights: [
      "All-inclusive beachfront resort",
      "Tulum ruins & cenote swim",
      "Reef snorkeling excursions",
      "Sunset catamaran cruise",
      "Mayan cooking experience",
    ],
    itinerary: [
      { day: "01", title: "Arrival in Cancun", description: "Beach welcome and resort check-in." },
      { day: "02", title: "Cenote Adventure", description: "Swim jungle cenotes and visit Tulum ruins." },
      { day: "03", title: "Island Day", description: "Catamaran cruise with snorkeling stops." },
      { day: "04", title: "Free & Easy", description: "Beach day with optional spa treatments." },
      { day: "05", title: "Departure", description: "Transfer to airport." },
    ],
  },
  {
    id: "baja-coast",
    name: "Baja Desert & Coast",
    country: "Mexico",
    category: "Beach",
    price: 1320,
    duration: "6 Days / 5 Nights",
    departure: "08/01/2026",
    image: "/assets/baja-sunset.jpg",
    rating: 4.7,
    reviews: 112,
    description:
      "Where the desert meets the sea. Sunset cactus landscapes, whale watching, and luxury marina resorts on the Baja California peninsula.",
    highlights: [
      "Whale watching expedition",
      "Arch of Cabo San Lucas cruise",
      "Desert sunset atv tour",
      "Farm-to-table Mexican cuisine",
      "Beach club day pass",
    ],
    itinerary: [
      { day: "01", title: "Arrival in Los Cabos", description: "Marina resort check-in and welcome dinner." },
      { day: "02", title: "Arch & Lovers Beach", description: "Boat tour to El Arco and glass-bottom kayaking." },
      { day: "03", title: "Whale Watching", description: "Morning expedition and beach afternoon." },
      { day: "04", title: "Desert Sunset", description: "Atv desert tour with sunset aperitif." },
      { day: "05", title: "Free & Shopping", description: "San Jose del Cabo galleries and crafts." },
      { day: "06", title: "Departure", description: "Transfer to airport." },
    ],
  },
  {
    id: "ionian-flight",
    name: "Ionian Island Flight",
    country: "Greece",
    category: "Cruise",
    price: 1690,
    duration: "7 Days / 6 Nights",
    departure: "09/05/2026",
    image: "/assets/island-flight.jpg",
    rating: 4.8,
    reviews: 143,
    description:
      "Island-hopping the Ionian sea by ferry and small plane. Dramatic coves, Venetian old towns, and beach tavernas under the Mediterranean sun.",
    highlights: [
      "Corfu town UNESCO old town",
      "Private cove boat trips",
      "Scenic flight over the islands",
      "Greek taverna evenings",
      "Blue lagoon swim stops",
    ],
    itinerary: [
      { day: "01", title: "Arrival in Corfu", description: "Transfer to hotel and old town evening." },
      { day: "02", title: "Corfu Highlights", description: "Palaces, fortresses, and Liston promenade." },
      { day: "03", title: "Boat to Paxos", description: "Blue caves and Antipaxos lagoon swim." },
      { day: "04", title: "Beach Day", description: "Sandstone beaches and seaside lunch." },
      { day: "05", title: "Lefkada Escape", description: "Porto Katsiki iconic cliffs and beaches." },
      { day: "06", title: "Free & Sunset", description: "Cape Drastis sunset and farewell dinner." },
      { day: "07", title: "Departure", description: "Transfer to Corfu airport." },
    ],
  },
];

export const SEED_BOOKINGS: Booking[] = [
  {
    id: "b1",
    packageId: "bali-paradise",
    name: "Bali Paradise",
    image: "/assets/bali-paradise.jpg",
    price: 1299,
    departure: "May 15, 2026",
    status: "Confirmed",
  },
  {
    id: "b2",
    packageId: "swiss-alps",
    name: "Swiss Alps Adventure",
    image: "/assets/swiss-alps.jpg",
    price: 1850,
    departure: "Jun 02, 2026",
    status: "Confirmed",
  },
  {
    id: "b3",
    packageId: "ionian-flight",
    name: "Venice & Italian Riviera",
    image: "/assets/island-flight.jpg",
    price: 1299,
    departure: "Sep 05, 2026",
    status: "Pending",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The Bali trip was absolutely magical! Every detail was perfectly planned. The resorts were luxurious and the cultural experiences were unforgettable.",
    author: "Michael Chen",
    from: "Singapore",
    photo: "/assets/traveler-michael.jpg",
    rating: "4.9/5",
  },
  {
    quote:
      "Swiss Alps adventure exceeded all expectations. The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    author: "Sophia Rodriguez",
    from: "London",
    photo: "/assets/traveler-sophia.jpg",
    rating: "4.9/5",
  },
];

export const PROFILE = {
  name: "Sarah Mitchell",
  location: "San Francisco, CA",
  memberSince: "Mar 2024",
  nationality: "United States",
  avatar: "/assets/avatar-sarah.jpg",
  stats: [
    { label: "Total Bookings", value: "12", icon: "plane", iconBg: "#ffffff", iconColor: "#0c0b0b" },
    { label: "Countries Visited", value: "18", icon: "globe", iconBg: "#e8f9ee", iconColor: "#6c696d" },
    { label: "Upcoming Trips", value: "2", icon: "trend", iconBg: "#fff1e2", iconColor: "#ff8a0d" },
    { label: "Total Spent", value: "$15,750", icon: "dollar", iconBg: "#feeaff", iconColor: "#dc24e5" },
  ],
};
