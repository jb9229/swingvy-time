import { Attendance } from '../Home/types';
import { LocationData } from '../providers/HomeProvider';
import createCtx from './CreateCtx';

const [useCtx, Provider] = createCtx<Context>();

interface Context {
  gps: LocationData | undefined;
  enabledGPS: boolean;
  distanceFormOffice: number | undefined;
  validDistanceFromOffice: number;
  attendanceList: Array<Attendance>;
  onClickClockIn: () => void;
  onClickClockOut: () => void;
}

export { useCtx as useHomeContext, Provider };
