const BackgroundImage = ({ imagePath }) => (
    <div 
      className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed transform scale-105 will-change-transform"
      style={{
        backgroundImage: `url(${imagePath})`,
        translate: 'translate3d(0, 0, 0)',
      }}
    />
  );


  export default BackgroundImage;