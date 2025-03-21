
// Type definitions for react-leaflet
import { Map as LeafletMap, MapOptions, LatLngExpression } from 'leaflet';
import { ReactNode } from 'react';

declare module 'react-leaflet' {
  export interface MapContainerProps extends MapOptions {
    center: LatLngExpression;
    zoom: number;
    scrollWheelZoom?: boolean;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
    whenCreated?: (map: LeafletMap) => void;
  }

  export interface TileLayerProps {
    attribution: string;
    url: string;
    children?: ReactNode;
  }

  export interface MarkerProps {
    position: LatLngExpression;
    children?: ReactNode;
    key?: string | number;
  }

  export interface PopupProps {
    children?: ReactNode;
  }

  export const MapContainer: React.FC<MapContainerProps>;
  export const TileLayer: React.FC<TileLayerProps>;
  export const Marker: React.FC<MarkerProps>;
  export const Popup: React.FC<PopupProps>;
}
