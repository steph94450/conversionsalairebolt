import { motion } from 'framer-motion';

export default function ComparisonTable() {
  const salaries = [
    { gross: 25000, netNonCadre: 19500, netCadre: 18750 },
    { gross: 35000, netNonCadre: 27300, netCadre: 26250 },
    { gross: 45000, netNonCadre: 35100, netCadre: 33750 },
    { gross: 55000, netNonCadre: 42900, netCadre: 41250 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-12"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Tableau Comparatif
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salaire Brut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net (Non Cadre)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net (Cadre)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salaries.map((salary) => (
              <tr key={salary.gross}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {salary.gross}€
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {salary.netNonCadre}€
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {salary.netCadre}€
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
