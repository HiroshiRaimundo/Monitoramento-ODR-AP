
import L from 'leaflet';
import 'react-leaflet';

// Extend the react-leaflet type definitions to correctly accept Leaflet options
declare module 'react-leaflet' {
  // For MapContainer
  export interface MapContainerProps extends L.MapOptions {
    center: L.LatLngExpression;
    zoom: number;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    scrollWheelZoom?: boolean | 'center';
    bounds?: L.LatLngBoundsExpression;
    minZoom?: number;
    maxBounds?: L.LatLngBoundsExpression;
    maxBoundsViscosity?: number;
  }

  // For TileLayer
  export interface TileLayerProps extends L.TileLayerOptions {
    url: string;
    attribution: string;
    children?: React.ReactNode;
    noWrap?: boolean;
    bounds?: L.LatLngBoundsExpression;
  }

  // For Marker
  export interface MarkerProps extends L.MarkerOptions {
    position: L.LatLngExpression;
    eventHandlers?: {
      [key: string]: (...args: any[]) => void;
    };
    children?: React.ReactNode;
  }
}
