const ProjectCard = ({ project }) => {
  if (!project) return null;

  return (
    <div className="relative group rounded-lg md:rounded-2xl overflow-hidden">
      <div className="aspect-[4/5]">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{project.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-white text-xs md:text-sm">{project.sqft} Sqft</span>
          <button className="bg-gray-200/90 px-3 md:px-4 py-1 rounded-full text-xs md:text-sm hover:bg-white transition-colors">
            Know More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;