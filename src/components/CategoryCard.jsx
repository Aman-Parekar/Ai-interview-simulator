import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DynamicIcon from './DynamicIcon';

export default function CategoryCard({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/interviews?category=${category.id}`}
        className="card group block h-full p-5 transition hover:ring-1 hover:ring-brand-400/40"
      >
        <span
          className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}
        >
          <DynamicIcon name={category.icon} className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-lg font-700 text-slate-100">{category.name}</h3>
        <p className="mt-1 text-sm text-slate-400">{category.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {category.topics.slice(0, 4).map((t) => (
            <span key={t} className="chip bg-white/5 text-slate-300">
              {t}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
