'use client';
import { useEffect, useRef } from 'react';

interface Props {
  slot: string;
  format?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSlot({ slot, format = 'auto', className = '', style }: Props) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <ins
      ref={ref}
      className={`adsbygoogle${className ? ` ${className}` : ''}`}
      style={{ display: 'block', ...style }}
      data-ad-client="ca-pub-8870870806520160"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
