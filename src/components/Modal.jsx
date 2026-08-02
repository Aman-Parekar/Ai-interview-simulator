import { AnimatePresence, motion } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';

export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[90] grid place-items-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className={`card w-full ${sizes[size]} p-6`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-700 text-slate-100">{title}</h3>
                <button onClick={onClose} className="btn-ghost" aria-label="Close">
                  <HiXMark className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4">{children}</div>
              {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
