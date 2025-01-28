// ProjectCard.jsx
const ProjectCard = ({ project }) => {
  // Add error checking
  if (!project) return null;

  return (
    <div className="relative group rounded-2xl overflow-hidden">
      <div className="aspect-[4/5]">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-white text-sm">{project.sqft} Sqft</span>
          <button className="bg-gray-200/90 px-4 py-1 rounded-full text-sm hover:bg-white transition-colors">
            Know More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
