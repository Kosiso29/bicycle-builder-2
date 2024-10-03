// @ts-nocheck
'use client'


import { useState, useRef, useEffect } from 'react';

export default function ScrollSnap() {
  const [currentComponent, setCurrentComponent] = useState(0);
  const componentRefs = useRef([]);

  const components = [
    { id: 0, content: 'Component 1', bgColor: '#ffcccc' },
    { id: 1, content: 'Component 2', bgColor: '#ccffcc' },
    { id: 2, content: 'Component 3', bgColor: '#ccccff' },
    { id: 3, content: 'Component 4', bgColor: '#ffcc99' },
    { id: 4, content: 'Component 5', bgColor: '#cc99ff' },
  ];

  // Observer to track when a section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = componentRefs.current.indexOf(entry.target);
            setCurrentComponent(index);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    componentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      componentRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Function to load component on button click
  const loadComponent = (index) => {
    setCurrentComponent(index);
    componentRefs.current[index].scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* Scrollable Sections */}
      {components.map((component, index) => (
        <section
          key={component.id}
          ref={(el) => (componentRefs.current[index] = el)}
          className={`h-screen snap-start flex justify-center items-center transition-all duration-500 ease-in-out ${
            currentComponent === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: component.bgColor }}
        >
          <h1 className="text-4xl">{component.content}</h1>
        </section>
      ))}

      {/* Button to manually trigger components */}
      <div className="fixed bottom-5 left-5 space-x-3 flex">
        {components.map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 bg-gray-800 text-white rounded ${
              currentComponent === index ? 'bg-blue-500' : ''
            }`}
            onClick={() => loadComponent(index)}
          >
            {`Component ${index + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
}
