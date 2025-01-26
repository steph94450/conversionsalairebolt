import { motion } from 'framer-motion';

export default function FAQ() {
  const faqs = [
    {
      question: "Quelle est la différence entre salaire brut et net ?",
      answer: "Le salaire brut est le montant avant prélèvement des cotisations sociales. Le salaire net est le montant que vous percevez après déduction de ces cotisations."
    },
    {
      question: "Comment sont calculées les cotisations sociales ?",
      answer: "Les cotisations sociales comprennent plusieurs éléments : assurance maladie, retraite, chômage, etc. Elles représentent environ 22-25% du salaire brut pour les non-cadres et 25-28% pour les cadres."
    },
    {
      question: "Qu'est-ce qu'un treizième mois ?",
      answer: "Le treizième mois est une prime annuelle équivalente à un mois de salaire supplémentaire. Elle peut être versée en une ou plusieurs fois selon les entreprises."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-12"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Questions Fréquentes
      </h2>
      <dl className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <dt className="text-lg font-semibold text-gray-900">
              {faq.question}
            </dt>
            <dd className="mt-2 text-gray-600">
              {faq.answer}
            </dd>
          </motion.div>
        ))}
      </dl>
    </motion.div>
  );
}
