import 'leaflet/dist/leaflet.css';
import { LatLngBoundsExpression } from 'leaflet';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CircleMarker,
  MapContainer,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet';
import { Stats, ViewProps } from './common';
import { getLocations } from './shapes';

const MAP_HEIGHT = 380;
const PATH_COLOR = '#4B9BBE';

/** Older points fade out so the direction of travel is visible: light (oldest) to dark (newest). */
const pointColor = (index: number, count: number) => {
  const t = count <= 1 ? 1 : index / (count - 1);
  return `hsl(205, 60%, ${Math.round(78 - t * 50)}%)`;
};

// MapContainer only reads its bounds on mount, so refit when the window shows other points.
const FitBounds = ({ bounds }: { bounds: LatLngBoundsExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [24, 24], maxZoom: 16 });
  }, [map, bounds]);
  return null;
};

const MapView = ({ points }: ViewProps) => {
  const { t } = useTranslation();
  const locations = useMemo(() => getLocations(points), [points]);
  const bounds = useMemo<LatLngBoundsExpression>(
    () => locations.map((l) => [l.lat, l.lng] as [number, number]),
    [locations],
  );

  if (locations.length === 0) return null;

  return (
    <>
      <Stats
        items={[
          {
            label: t('deployment:data_streams_card.locations'),
            value: String(locations.length),
          },
        ]}
      />
      <MapContainer
        bounds={bounds}
        scrollWheelZoom={false}
        style={{ height: MAP_HEIGHT, borderRadius: 8 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds bounds={bounds} />
        <Polyline
          positions={bounds as [number, number][]}
          pathOptions={{ color: PATH_COLOR, weight: 2, opacity: 0.6 }}
        />
        {locations.map((l, i) => (
          <CircleMarker
            // eslint-disable-next-line @eslint-react/no-array-index-key -- points have no id; list is static per render
            key={i}
            center={[l.lat, l.lng]}
            radius={i === locations.length - 1 ? 7 : 4}
            pathOptions={{
              color: pointColor(i, locations.length),
              fillColor: pointColor(i, locations.length),
              fillOpacity: 0.9,
              weight: 1,
            }}
          >
            <Tooltip>{l.time.toLocaleString()}</Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapView;
