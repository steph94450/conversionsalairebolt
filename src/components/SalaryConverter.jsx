import { useState } from 'react';
import { motion } from 'framer-motion';
import InfoTooltip from './InfoTooltip';

const MONTHLY_HOURS = 151.67; // Heures mensuelles standard

export default function SalaryConverter() {
  const [salaryType, setSalaryType] = useState('monthly');
  const [hourlyGross, setHourlyGross] = useState('');
  const [monthlyGross, setMonthlyGross] = useState('');
  const [status, setStatus] = useState('non-cadre');
  const [months, setMonths] = useState(12);
  const [taxRate, setTaxRate] = useState(18);
  const [showComparison, setShowComparison] = useState(false);

  const calculateNet = (gross, employeeStatus = status) => {
    const rates = {
      'cadre': 0.75,
      'non-cadre': 0.78
    };
    return (gross * rates[employeeStatus]).toFixed(2);
  };

  const handleHourlyChange = (value) => {
    setHourlyGross(value);
    setMonthlyGross(value ? (value * MONTHLY_HOURS).toFixed(2) : '');
    setSalaryType('hourly');
  };

  const handleMonthlyChange = (value) => {
    setMonthlyGross(value);
    setHourlyGross(value ? (value / MONTHLY_HOURS).toFixed(2) : '');
    setSalaryType('monthly');
  };

  const getAnnualGross = () => monthlyGross * months;
  const getMonthlyNet = () => calculateNet(monthlyGross);
  const getAnnualNet = () => calculateNet(getAnnualGross());
  const getAfterTax = (amount) => (amount * (1 - taxRate / 100)).toFixed(2);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                Salaire Brut
                <InfoTooltip content="Le salaire brut est le montant avant déduction des cotisations sociales. Vous pouvez saisir soit le montant horaire, soit le montant mensuel." />
              </h2>
              
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Salaire horaire brut
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      value={hourlyGross}
                      onChange={(e) => handleHourlyChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                      placeholder="Ex: 25.48"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">€/h</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Salaire mensuel brut
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      value={monthlyGross}
                      onChange={(e) => handleMonthlyChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                      placeholder="Ex: 3500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-4">
                Paramètres
                <InfoTooltip content="Ces paramètres influencent le calcul du salaire net. Le statut détermine le taux de cotisations, et le nombre de mois inclut les éventuels mois de prime." />
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['non-cadre', 'cadre'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          status === s
                            ? 'bg-brand-blue text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {s === 'non-cadre' ? 'Non Cadre' : 'Cadre'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de mois
                    <InfoTooltip content="13 ou 14 mois correspondent à l'ajout de primes conventionnelles (13ème mois, prime de vacances, etc.)" />
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[12, 13, 14].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMonths(m)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          months === m
                            ? 'bg-brand-blue text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {m} mois
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taux de prélèvement à la source
                    <InfoTooltip content="Ce taux est personnel et dépend de votre situation fiscale. Vous le trouverez sur votre dernier avis d'imposition." />
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      className="flex-grow"
                    />
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      className="w-20 px-3 py-2 rounded-lg border border-gray-200"
                    />
                    <span className="text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          {monthlyGross && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-brand-lightBlue p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Résultats
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Salaire net mensuel</div>
                    <div className="text-3xl font-bold text-brand-blue">
                      {getMonthlyNet()}€
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Salaire net annuel</div>
                    <div className="text-2xl font-bold text-brand-blue">
                      {getAnnualNet()}€
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600 mb-1">Net après impôts mensuel</div>
                    <div className="text-2xl font-bold text-brand-blue">
                      {getAfterTax(getMonthlyNet())}€
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {showComparison ? 'Masquer' : 'Comparer'} les statuts
                </button>
                <button
                  onClick={() => {
                    const results = {
                      brut: { mensuel: monthlyGross, annuel: getAnnualGross() },
                      net: { mensuel: getMonthlyNet(), annuel: getAnnualNet() },
                      apresImpots: { mensuel: getAfterTax(getMonthlyNet()), annuel: getAfterTax(getAnnualNet()) }
                    };
                    console.log('Export PDF:', results);
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Exporter en PDF
                </button>
              </div>

              {showComparison && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-gray-50 p-6 rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Comparaison des statuts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Non Cadre</span>
                      <span className="font-medium">{calculateNet(monthlyGross, 'non-cadre')}€/mois</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cadre</span>
                      <span className="font-medium">{calculateNet(monthlyGross, 'cadre')}€/mois</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Comment ça marche ?</h2>
        <div className="prose prose-blue">
          <ul className="space-y-2 text-gray-600">
            <li>Les cotisations sociales représentent environ 22% pour les non-cadres et 25% pour les cadres</li>
            <li>Le salaire mensuel est calculé sur une base de {MONTHLY_HOURS} heures</li>
            <li>Le 13ème mois est une prime annuelle équivalente à un mois de salaire</li>
            <li>Ces calculs sont indicatifs et peuvent varier selon votre convention collective</li>
          </ul>
          <p className="text-sm text-gray-500 mt-4">
            Sources : URSSAF, Code du travail. Pour plus d'informations, consultez{' '}
            <a href="https://www.urssaf.fr" target="_blank" rel="noopener" className="text-brand-blue hover:underline">
              urssaf.fr
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
