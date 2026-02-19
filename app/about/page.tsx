import Link from 'next/link';
import { ArrowLeft, Linkedin, Mail, Twitter } from 'lucide-react';

const teamMembers = [
  {
    name: "Ana García",
    role: "Fundadora & CEO",
    description: "Líder visionaria con más de 15 años de experiencia en educación tecnológica. Apasionada por transformar la gestión académica.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "ana@sigce.edu.do"
    }
  },
  {
    name: "Carlos Rodríguez",
    role: "Director de Tecnología (CTO)",
    description: "Arquitecto de software experto en sistemas escalables y seguridad. Encargado de mantener SIGCE robusto y seguro.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "carlos@sigce.edu.do"
    }
  },
  {
    name: "Elena Martínez",
    role: "Directora de Operaciones",
    description: "Experta en optimización de procesos y gestión de equipos. Asegura que cada implementación de SIGCE sea un éxito.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "elena@sigce.edu.do"
    }
  },
  {
    name: "David López",
    role: "Lead Developer",
    description: "Desarrollador Full Stack apasionado por tecnologías modernas. Creador de experiencias de usuario fluidas e intuitivas.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&fit=crop",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "david@sigce.edu.do"
    }
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <h1 className="font-bold text-xl text-primary">SIGCE</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Intro Section */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Conoce a nuestro equipo
          </h2>
          <p className="text-xl text-gray-500 leading-relaxed">
            Somos un grupo diverso de apasionados por la educación y la tecnología, trabajando juntos para simplificar la gestión de certificaciones en todo el mundo.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="group flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-primary/20 transition-all duration-300 shadow-sm group-hover:shadow-xl">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-2 right-4 bg-white p-2 rounded-full shadow-lg border border-gray-100 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <Link href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin size={16} />
                  </Link>
                  <Link href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter size={16} />
                  </Link>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <span className="text-xs font-bold uppercase tracking-wider text-accent mb-4">
                {member.role}
              </span>
              <p className="text-sm text-gray-500 leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        {/* Values / Mission (Optional filler) */}
        <div className="mt-32 grid md:grid-cols-3 gap-12 text-center border-t border-gray-100 pt-20">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Innovación Constante</h3>
            <p className="text-sm text-gray-500">Nunca dejamos de buscar formas de mejorar y simplificar.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Transparencia Total</h3>
            <p className="text-sm text-gray-500">Creemos en la honestidad y claridad en todo lo que hacemos.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Usuario al Centro</h3>
            <p className="text-sm text-gray-500">Cada decisión se toma pensando en la experiencia de nuestros usuarios.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
