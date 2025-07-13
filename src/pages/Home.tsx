import React from 'react';

const features = [
  {
    icon: '⏰',
    label: 'Same Day Service',
  },
  {
    icon: '🛡️',
    label: 'Quality Guaranteed',
  },
  {
    icon: '🚚',
    label: 'Free Delivery',
  },
];

const services = [
  {
    icon: '🧼',
    title: 'Washing & Cleaning',
    price: 'From ₹99/item',
    features: [
      'Eco-friendly detergents',
      'Advanced stain removal',
      'Odour control treatment',
      'Complete care & sanitization',
    ],
  },
  {
    icon: '🧲',
    title: 'Ironing & Pressing',
    price: 'From ₹49/item',
    features: [
      'Easy crease removal',
      'For all fabric types',
      'Professional finish',
      'Quick turnaround',
    ],
  },
  {
    icon: '✂️',
    title: 'Alterations & Repairs',
    price: 'From ₹299/item',
    features: [
      'Precise hemming & sizing',
      'Expert repair',
      'Button replacement',
      'Custom adjustments',
    ],
  },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <header className="flex-1 flex flex-col justify-center items-center px-4 pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 tracking-tight">
          Professional Laundry<br />At Your Doorstep
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition">
            Schedule Pickup
          </button>
          <button className="bg-white border border-black text-black px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-gray-100 transition">
            View Services
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-6">
          {features.map((f) => (
            <div key={f.label} className="flex flex-col items-center">
              <span className="text-3xl mb-2">{f.icon}</span>
              <span className="font-semibold text-gray-800 text-base">{f.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Premium Services Section */}
      <section className="max-w-5xl mx-auto w-full px-4 pb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Our Premium Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl transition group border border-gray-100"
            >
              <span className="text-4xl mb-4">{service.icon}</span>
              <h3 className="text-xl font-bold mb-2 text-center">{service.title}</h3>
              <div className="text-lg font-semibold text-blue-700 mb-2">{service.price}</div>
              <ul className="mb-6 text-gray-600 text-sm space-y-1 list-disc list-inside">
                {service.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <button className="mt-auto bg-black text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition group-hover:scale-105">
                Select Service
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 