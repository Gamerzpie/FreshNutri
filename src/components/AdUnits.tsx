import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Sparkles, X } from 'lucide-react';

export const SMARTLINK_URL = 'https://www.profitableratecpmnetwork.com/qkm518w2?key=ff85db6dcc1031e8613a0ffbbc21fb9f';

/**
 * 320 x 50 CPM Banner Component
 * Uses isolated iframe srcdoc to avoid polluting global window scope and guarantee execution
 */
export const Banner320x50: React.FC<{ className?: string }> = ({ className = '' }) => {
  const iframeHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <base target="_blank">
        <style>
          * { box-sizing: border-box; }
          body, html {
            margin: 0;
            padding: 0;
            width: 320px;
            height: 50px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : 'ba56df914450800c83d95c05b1db1ab4',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highrevenueformat.com/ba56df914450800c83d95c05b1db1ab4/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono mb-1">
        Advertisement
      </span>
      <div className="w-[320px] h-[50px] overflow-hidden bg-stone-100 rounded border border-stone-200 shadow-2xs">
        <iframe
          srcDoc={iframeHtml}
          width="320"
          height="50"
          title="320x50 Advertisement"
          className="border-0 overflow-hidden block w-[320px] h-[50px]"
          scrolling="no"
        />
      </div>
    </div>
  );
};

/**
 * Native Banner Component (ID: container-20fecfc0f17843d9653c4cd1e52023ce)
 */
export const NativeBannerAd: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptInjectedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current || scriptInjectedRef.current) return;

    try {
      scriptInjectedRef.current = true;
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl31591190.profitableratecpmnetwork.com/20fecfc0f17843d9653c4cd1e52023ce/invoke.js';
      containerRef.current.appendChild(script);
    } catch {
      // Ignored for adblockers
    }
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto my-6 px-4 ${className}`}>
      <div className="p-4 bg-stone-50/80 rounded-2xl border border-stone-200/90 text-center">
        <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2 border-b border-stone-200/60 pb-1.5">
          <span className="uppercase tracking-wider">Sponsored Partner Content</span>
          <span className="text-[10px]">Advertisement</span>
        </div>
        <div
          id="container-20fecfc0f17843d9653c4cd1e52023ce"
          ref={containerRef}
          className="min-h-[90px] w-full flex items-center justify-center"
        />
      </div>
    </div>
  );
};

/**
 * Smartlink Promotion Card / Call-to-Action
 */
export const SmartlinkCard: React.FC<{ className?: string; label?: string }> = ({
  className = '',
  label = 'Explore Special Offers & Partner Deals',
}) => {
  return (
    <div className={`bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-5 text-white shadow-sm ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-emerald-200 font-mono tracking-wide uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Featured Partner Promotion</span>
          </div>
          <h4 className="font-serif text-lg font-medium text-white">
            {label}
          </h4>
          <p className="text-xs text-emerald-100/90 max-w-md">
            Exclusive health, kitchen gadget, and lifestyle partner promotions curated for FreshNutri readers.
          </p>
        </div>
        <a
          href={SMARTLINK_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-semibold rounded-xl transition-all shadow-xs shrink-0"
        >
          <span>Claim Exclusive Deal</span>
          <ExternalLink className="w-3.5 h-3.5 text-emerald-800" />
        </a>
      </div>
    </div>
  );
};

/**
 * Sticky Bottom Ad Ribbon (320x50 Banner + Smartlink)
 */
export const StickyAdBar: React.FC = () => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <aside aria-label="Advertisement" className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md text-white border-t border-stone-800 py-2 px-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: 320x50 CPM banner */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase font-mono text-stone-400 hidden sm:inline">Ad</span>
          <div className="w-[320px] h-[50px] overflow-hidden bg-stone-800 rounded border border-stone-700">
            <iframe
              srcDoc={`
                <!DOCTYPE html>
                <html>
                  <head>
                    <base target="_blank">
                    <style>
                      * { box-sizing: border-box; }
                      body, html { margin:0; padding:0; width:320px; height:50px; overflow:hidden; display:flex; justify-content:center; align-items:center; background:#1c1917; }
                    </style>
                  </head>
                  <body>
                    <script type="text/javascript">
                      atOptions = {
                        'key' : 'ba56df914450800c83d95c05b1db1ab4',
                        'format' : 'iframe',
                        'height' : 50,
                        'width' : 320,
                        'params' : {}
                      };
                    </script>
                    <script type="text/javascript" src="https://www.highrevenueformat.com/ba56df914450800c83d95c05b1db1ab4/invoke.js"></script>
                  </body>
                </html>
              `}
              width="320"
              height="50"
              title="Sticky Bottom Advertisement"
              className="border-0 overflow-hidden block w-[320px] h-[50px]"
              scrolling="no"
            />
          </div>
        </div>

        {/* Center/Right: Smartlink CTA */}
        <div className="flex items-center gap-3">
          <a
            href={SMARTLINK_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Special Offers & Deals</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>

          <button
            onClick={() => setClosed(true)}
            aria-label="Close advertisement"
            className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
