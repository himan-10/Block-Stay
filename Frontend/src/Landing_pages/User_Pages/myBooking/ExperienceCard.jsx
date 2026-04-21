const ExperienceCard = ({ title, category, img }) => {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <img src={img} className="w-full h-full object-cover" />

      <div className="absolute bottom-4 left-4">
        <p className="text-xs text-secondary">{category}</p>
        <h4 className="text-white font-bold">{title}</h4>
      </div>
    </div>
  );
};

export default ExperienceCard;