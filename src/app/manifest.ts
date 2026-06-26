import type { MetadataRoute } from "next";

// Web app manifest — makes the POS installable on the shop device. Branding here
// (name/colors/icons) is a sensible default; configurable branding lands later
// (CRI-17), so keep these values easy to swap.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Crispina Dive POS",
    short_name: "Crispina POS",
    description:
      "Point-of-sale and monthly reporting for Crispina Dive Scuba Diving Services.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0e7490",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
