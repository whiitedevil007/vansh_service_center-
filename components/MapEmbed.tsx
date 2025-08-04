// components/MapMiBhatinda.tsx
"use client";

const MapMiBhatinda = () => {
  return (
    <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d441326.54980863817!2d74.63658432707528!3d30.21243823969622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391733720453f4a3%3A0xc599819da3e8952e!2sMi%20service%20center%20Bhatinda%20Punjab%20(Iris)!5e0!3m2!1sen!2sin!4v1754301594234!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapMiBhatinda;
