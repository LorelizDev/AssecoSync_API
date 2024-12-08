import TimeLog from '../models/timeLogModel';
import { closeTimeLogIfCompleted } from '../services/timeLogService';

export const closeTimeLogsProcessor = async () => {
  console.log('Iniciando trabajo de cierre automático de registros...');
  try {
    const openTimeLogs = await TimeLog.findAll({ where: { endTime: null } });

    for (const timeLog of openTimeLogs) {
      await closeTimeLogIfCompleted(timeLog);
    }

    console.log(
      `Trabajo completado: ${openTimeLogs.length} registros procesados.`
    );
  } catch (error) {
    console.error('Error al procesar el trabajo de cierre automático:', error);
    throw error;
  }
};
