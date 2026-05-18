import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mama DD's African Kitchen",
    short_name: "Mama DD's",
    description: "The first authentic homemade African food in Enschede, Netherlands. Order Jollof Rice, Egusi, Fufu, and more traditional African dishes.",
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0D0D',
    theme_color: '#D32F2F',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
