import React from 'react';

const RoomCard = ({
  variant = 'default',
  imageSrc,
  imageAlt,
  badge,
  featuredLabel,
  title,
  subtitle,
  price,
  amenities
}) => {
  if (variant === 'featured') {
    return (
      <div className="group relative flex flex-col bg-surface-container rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0px_20px_40px_rgba(0,0,0,0.4),0px_0px_20px_rgba(124,58,237,0.05)] md:col-span-2 lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-96 md:h-full overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              data-alt={imageAlt} 
              src={imageSrc} 
              alt={title || "Room Image"} 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent"></div>
          </div>
          <div className="p-10 flex flex-col justify-center space-y-6">
            <div>
              <span className="font-label text-[10px] tracking-[0.2em] text-secondary font-bold uppercase mb-2 block">
                {featuredLabel}
              </span>
              <h2 className="font-headline text-4xl font-extrabold text-on-surface mb-4">{title}</h2>
              <p className="font-body text-on-surface-variant leading-relaxed">{subtitle}</p>
            </div>
            <div className="flex items-center gap-8">
              <div>
                <span className="block text-3xl font-black text-primary">${price}</span>
                <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">per night</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {amenities && amenities.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-on-surface-variant">
                    <span 
                      className="material-symbols-outlined text-lg" 
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.icon}
                    </span>
                    <span className="text-xs font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full py-4 bg-primary-container text-on-primary-container font-bold rounded-md hover:bg-inverse-primary transition-all shadow-[0px_0px_20px_rgba(124,58,237,0.3)]">
              Inquire for Residency
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="group relative flex flex-col bg-surface-container rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0px_20px_40px_rgba(0,0,0,0.4),0px_0px_20px_rgba(124,58,237,0.05)]">
      <div className="relative h-72 overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          data-alt={imageAlt} 
          src={imageSrc} 
          alt={title || "Room Image"} 
        />
        {badge && (
          <div 
            className={`absolute top-4 ${badge.position || 'right-4'} ${badge.bgClass || 'bg-surface-container-highest/80 backdrop-blur-md'} px-3 py-1 rounded text-xs font-bold ${badge.textClass || 'text-secondary'} flex items-center gap-1`}
          >
            {badge.icon && (
              <span 
                className="material-symbols-outlined text-[14px]" 
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {badge.icon}
              </span>
            )}
            {badge.text}
          </div>
        )}
      </div>
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-1">{title}</h2>
            <p className="font-body text-on-surface-variant text-sm">{subtitle}</p>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-black text-primary">${price}</span>
            <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">per night</span>
          </div>
        </div>
        <div className="flex items-center gap-6 pt-4 border-t border-outline-variant/10">
          {amenities && amenities.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              <span className="text-xs">{item.text}</span>
            </div>
          ))}
        </div>
        <button className="w-full py-4 bg-transparent border border-outline-variant text-on-surface font-bold rounded-md group-hover:bg-primary-container group-hover:border-primary-container group-hover:text-on-primary-container transition-all">
          Reserve Experience
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
