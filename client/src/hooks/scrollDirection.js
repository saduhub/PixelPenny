import { useState, useEffect } from 'react';

const useScrollDirection = () => {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [direction, setDirection] = useState('up');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.scrollY;
            if (currentScrollTop > lastScrollTop) {
                setDirection('down');
            } else {
                setDirection('up');
            }
            setLastScrollTop(currentScrollTop);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    return direction;
};

export default useScrollDirection;