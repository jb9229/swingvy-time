import { LocationData } from '../providers/HomeProvider';
import createCtx from './CreateCtx';

const [useCtx, Provider] = createCtx<Context>();

interface Context {
  gps: LocationData;
  enabledGPS: boolean;
  distanceFormOffice: number;
  validDistanceFromOffice: number;
  onClickClockIn: () => void;
  onClickClockOut: () => void;
}

export { useCtx as useHomeContext, Provider };
