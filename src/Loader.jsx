import { useState, useEffect } from "react";

const LoaderComponent = () => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [showImg, setShowImg] = useState(true); // Pour contrôler l'affichage du loader

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev >= 100) {
          setShowImg(false); // Masque le loader quand il atteint 100%
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Vitesse d'incrémentation
    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  return (
    <div className="loader-container">
      {showImg && (
        <div className="loader">
          <p>{loadingPercentage}%</p> {/* Affiche le pourcentage */}
        </div>
      )}
    </div>
  );
};

export default LoaderComponent;
