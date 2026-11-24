import { ViewProps } from './common';
import EventTimelineView from './EventTimelineView';
import GenericView from './GenericView';
import HeartRateView from './HeartRateView';
import MapView from './MapView';
import { getEvents, getHeartRates, getLocations, getViewKind, ViewKind } from './shapes';
import StepsView from './StepsView';
import TasksView from './TasksView';

const VIEWS = {
  map: MapView,
  heartRate: HeartRateView,
  steps: StepsView,
  tasks: TasksView,
  events: EventTimelineView,
  generic: GenericView,
};

// Views that need particular fields; if a stream has none of them (an unexpected data shape),
// the generic chart is shown instead of an empty view.
const CAN_SHOW: Partial<Record<ViewKind, (points: ViewProps['points']) => boolean>> = {
  map: (points) => getLocations(points).length > 0,
  heartRate: (points) => getHeartRates(points).length > 0,
  events: (points) => getEvents(points).length > 0,
};

/** The view for this stream's data type, or the generic chart for types without one. */
const StreamView = ({ dataType, ...props }: ViewProps & { dataType: string }) => {
  const kind = getViewKind(dataType);
  const usable = CAN_SHOW[kind]?.(props.points) ?? true;
  const View = VIEWS[usable ? kind : 'generic'];
  return <View {...props} />;
};

export default StreamView;
