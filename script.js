document.addEventListener('DOMContentLoaded', function() {
    // Créer des particules pour le fond
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Créer les connexions animées
    function createConnections() {
        // Nettoyer les anciennes connexions
        document.querySelectorAll('.connection-path').forEach(el => el.remove());
        
        // Connexion Président → Vice-Président
        connectNodes('president', 'vice-president');
        
        // Connexion Vice-Président → Secrétaire Général
        connectNodes('vice-president', 'secretaire');
        
        // Connexions Secrétaire Général → Responsables
        connectNodes('secretaire', 'rh');
        connectNodes('secretaire', 're');
        connectNodes('secretaire', 'media');
        connectNodes('secretaire', 'design');
    }
    
    function connectNodes(fromId, toId) {
        const fromNode = document.getElementById(fromId);
        const toNode = document.getElementById(toId);
        
        if (!fromNode || !toNode) return;
        
        const fromRect = fromNode.getBoundingClientRect();
        const toRect = toNode.getBoundingClientRect();
        
        const x1 = fromRect.left + fromRect.width / 2;
        const y1 = fromRect.top + fromRect.height;
        const x2 = toRect.left + toRect.width / 2;
        const y2 = toRect.top;
        
        // Créer une ligne de connexion
        const line = document.createElement('div');
        line.className = 'connection-path';
        
        // Calculer la longueur et l'angle
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        // Positionner et dimensionner la ligne
        line.style.width = `${length}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;
        
        document.body.appendChild(line);
    }
    
    // Garantir que l'icône RH reste visible
    function lockRhIcon() {
        const rhIcon = document.querySelector('#rh .icon i');
        if (rhIcon) {
            rhIcon.style.opacity = '1';
            rhIcon.style.visibility = 'visible';
            rhIcon.style.display = 'inline-block';
            rhIcon.style.willChange = 'transform'; // Optimisation
        }
    }
    
    // Effet de lumière aléatoire sur les nodes
    const nodes = document.querySelectorAll('.node');
    
    nodes.forEach(node => {
        // Effet de surbrillance au survol
        node.addEventListener('mouseenter', () => {
            node.style.transform = 'scale(1.05) translateY(-5px)';
            node.style.boxShadow = '0 0 30px rgba(4, 237, 252, 0.8)';
        });
        
        node.addEventListener('mouseleave', () => {
            node.style.transform = '';
            node.style.boxShadow = '';
        });
    });
    
    // Créer les connexions initiales
    createConnections();
    lockRhIcon();
    
    // Verrouillage permanent de l'icône RH
    setInterval(lockRhIcon, 500);
    
    // Redimensionnement
    window.addEventListener('resize', function() {
        createConnections();
    });
});