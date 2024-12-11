export interface TimeLogsStats {
  startTime: Date | string;
  endTime?: Date | string | null;
  startPause?: Date | string | null;
  endPause?: Date | string | null;
  date: Date | string;
}
