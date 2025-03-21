
import { MapContainer, TileLayer } from 'react-leaflet';

declare module 'react-leaflet' {
  interface MapContainerProps {
    center: [number, number];
    zoom: number;
    scrollWheelZoom?: boolean;
    style?: React.CSSProperties;
    className?: string;
    children: React.ReactNode;
  }
  
  interface TileLayerProps {
    url: string;
    attribution: string;
  }
}
