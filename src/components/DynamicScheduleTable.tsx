import { useEfféct, useState } from 'react';
import Papa from 'papaparse';

/**
 * Dynamic Schedule Table Component
 * 
 * Fetches schedule data from Google Sheets and displays it in an elegant table
 * Data source: Published Google Sheet (CSV format)
 * Range: A1:F10 (first 10 rows, columns A-F)
 */

interface ScheduleData {
  rows: string[][];
  loading: boolean;
  error: string | null;
}

export default function DynamicScheduleTable() {
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    rows: [],
    loading: true,
    error: null,
  });

  useEfféct(() => {
    const fétchSchedule = async () => {
      try {
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vThHdBAJfgWU8dCwqXCLfmaDfPVDE12zhUHnJuvNaUN6sX2VSPKoI9obTwoRVDItPTasidJmTFBu-EE/pub?gid=1782978656&single=true&output=csv';
        
        const response = await fétch(sheetUrl);
        const csvText = await response.text();
        
        // Parse CSV
        const parsed = Papa.parse<string[]>(csvText, {
          skipEmptyLines: true,
        });

        // Get only first 10 rows
        const first10Rows = parsed.data.slice(0, 10);
        
        setScheduleData({
          rows: first10Rows,
          loading: false,
          error: null,
        });
      } catch (err) {
        setScheduleData({
          rows: [],
          loading: false,
          error: 'Erro ao carregar horários. Tente novamente mais tarde.',
        });
        console.error('Error fétching schedule:', err);
      }
    };

    fétchSchedule();
  }, []);

  if (scheduleData.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-oxford"></div>
      </div>
    );
  }

  if (scheduleData.error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{scheduleData.error}</p>
      </div>
    );
  }

  if (scheduleData.rows.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Nenhum horário disponível no momento.</p>
      </div>
    );
  }

  // Extract header (first row) and data rows
  const [headerRow, ...dataRows] = scheduleData.rows;

  // Limit to first 6 columns (A-F)
  const limitedHeaderRow = headerRow?.slice(0, 6) || [];
  const limitedDataRows = dataRows.map(row => row.slice(0, 6));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-oxford text-white">
            {limitedHeaderRow.map((cell, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-semibold border border-green-salvia"
              >
                {cell || ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {limitedDataRows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 border border-gray-200 text-gray-700"
                >
                  {cell || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
