import { useRef, useEffect, useState } from 'react';

const ITEM_H = 48;
const VISIBLE = 5; // must be odd

interface Props {
  open: boolean;
  title: string;
  values: (number | string)[];
  value: number | string | null;
  unit?: string;
  onConfirm: (v: number | string) => void;
  onClose: () => void;
}

export default function PickerSheet({ open, title, values, value, unit, onConfirm, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | string>(value ?? values[0]);
  const ticking = useRef(false);

  // When sheet opens, scroll to the current value
  useEffect(() => {
    if (!open) return;
    const v = value ?? values[0];
    setSelected(v);
    const idx = values.indexOf(v);
    if (scrollRef.current && idx >= 0) {
      scrollRef.current.scrollTop = idx * ITEM_H;
    }
  }, [open]);

  function handleScroll() {
    if (!scrollRef.current || ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        const idx = Math.round(scrollRef.current.scrollTop / ITEM_H);
        const clamped = Math.min(Math.max(0, idx), values.length - 1);
        setSelected(values[clamped]);
      }
      ticking.current = false;
    });
  }

  if (!open) return null;

  const pad = Math.floor(VISIBLE / 2); // 2 padding items top/bottom

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Sheet */}
      <div
        className="relative w-full bg-gray-900 rounded-t-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-700 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <button onClick={onClose} className="text-gray-400 text-sm">Cancel</button>
          <p className="text-white font-semibold text-sm">{title}</p>
          <button
            onClick={() => { onConfirm(selected); onClose(); }}
            className="text-orange-400 font-semibold text-sm"
          >
            Done
          </button>
        </div>

        {/* Picker wheel */}
        <div className="relative mx-5 mb-6" style={{ height: ITEM_H * VISIBLE }}>
          {/* Selection highlight stripe */}
          <div
            className="absolute left-0 right-0 border-t border-b border-gray-600 bg-white/5 pointer-events-none z-10"
            style={{ top: ITEM_H * pad, height: ITEM_H }}
          />

          {/* Gradient fades top/bottom */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none z-10" />

          {/* Scrollable list */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full overflow-y-scroll"
            style={{
              scrollSnapType: 'y mandatory',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Top padding */}
            {Array.from({ length: pad }).map((_, i) => (
              <div key={`t${i}`} style={{ height: ITEM_H, scrollSnapAlign: 'none' }} />
            ))}

            {values.map((v, i) => {
              const isSelected = v === selected;
              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelected(v);
                    if (scrollRef.current) scrollRef.current.scrollTop = i * ITEM_H;
                  }}
                  style={{ height: ITEM_H, scrollSnapAlign: 'center' }}
                  className={`flex items-center justify-center text-xl font-medium transition-all cursor-pointer ${
                    isSelected ? 'text-white scale-110' : 'text-gray-500'
                  }`}
                >
                  {v}{unit && isSelected ? ` ${unit}` : ''}
                </div>
              );
            })}

            {/* Bottom padding */}
            {Array.from({ length: pad }).map((_, i) => (
              <div key={`b${i}`} style={{ height: ITEM_H, scrollSnapAlign: 'none' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate weight values array
export function weightValues(unit: 'lbs' | 'kg'): number[] {
  if (unit === 'lbs') {
    const vals: number[] = [];
    for (let i = 0; i <= 400; i += 5) vals.push(i);
    return vals;
  } else {
    const vals: number[] = [];
    for (let i = 0; i <= 200; i += 2.5) vals.push(Math.round(i * 10) / 10);
    return vals;
  }
}

// Generate reps values 0–50
export function repsValues(): number[] {
  return Array.from({ length: 51 }, (_, i) => i);
}
