import floralImage from "../assets/illustrations/floral.svg";
import geometricImage from "../assets/illustrations/geometric.svg";
import nightSkyImage from "../assets/illustrations/night-sky.svg";

export const collections = [
  {
    id: "wildflowers",
    title: "Flores silvestres",
    description: "Una cubierta botánica para anotar ideas sin prisa.",
    format: "A5 · tapa dura",
    paper: "Marfil, 120 g/m²",
    price: 24,
    image: floralImage,
    preset: "floral",
    color: "#E8876A",
  },
  {
    id: "terracotta-geometry",
    title: "Geometría terracota",
    description: "Formas sencillas y cálidas para un estilo moderno.",
    format: "A5 · tapa dura",
    paper: "Marfil, 120 g/m²",
    price: 22,
    image: geometricImage,
    preset: "geometry",
    color: "#E8876A",
  },
  {
    id: "night-sky",
    title: "Cielo nocturno",
    description: "Una pequeña luna para acompañar tus notas del día.",
    format: "B6 · tapa blanda",
    paper: "Crema, 100 g/m²",
    price: 18,
    image: nightSkyImage,
    preset: "sky",
    color: "#355C4D",
  },
];