import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from "lucide-react";

// Demo data for 3 people
const profiles = [
  {
    name: "Gaurav Kumar Baraik",
    role: "CSE Undergrad · BIT Mesra",
    description: "Aspiring SDE",
    photo: "photo_gaurav.jpeg",
    email: "kumargaurav00992@gmail.com",
    location: "Ranchi, India",
    github: "https://github.com/xswift-coder770",
    linkedin: "https://www.linkedin.com/in/gaurav-kumar-baraik-5a750026b",
    instagram: "https://www.instagram.com/_gaurav_kumar889",
  },
  {
    name: "Mayank Jha",
    role: "CSE Undergrad · BIT Mesra",
    description: "Aspiring SDE",
    photo: "photo_mayank.jpeg",
    email: "mayankmitthu06@gmail.com",
    location: "Ranchi, India",
    github: "https://github.com/Mayankjhaprojects",
    linkedin: "https://www.linkedin.com/in/mayank-jha-473274346/",
    instagram: "https://www.instagram.com/mayankjha407/",
  },
  {
    name: "Aditya Kumar",
    role: "CSE Undergrad · BIT Mesra",
    description: "Aspiring SDE",
    photo: "aditya_photo.jpeg",
    email: "adityaharshu06@gmail.com",
    location: "Ranchi, India",
    github: "https://github.com/adityahar06",
    linkedin: "https://www.linkedin.com/in/adityaharshu/",
    instagram: "https://www.instagram.com/adityaharshu06/",
  },
];

export default function ContactUs() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-white to-purple-50 py-10 px-4">
      <header className="mx-auto max-w-6xl text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent"
        >
          Meet the Team
        </motion.h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-600 mx-auto">
          Here are some of our amazing team members. Connect with them!
        </p>
      </header>

      <main className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative rounded-3xl border border-white/30 bg-white/20 backdrop-blur-xl p-6 shadow-xl ring-1 ring-black/5"
          >
            <div className="relative flex flex-col items-center gap-4 text-center">
              <motion.img
                src={profile.photo}
                alt={profile.name}
                className="h-24 w-24 rounded-2xl object-cover ring-2 ring-white/50 shadow-lg"
                whileHover={{ rotate: 2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              <p className="text-sm text-purple-700 font-medium">{profile.role}</p>
              <p className="text-xs text-gray-600">{profile.description}</p>

              <div className="mt-4 flex flex-col gap-2 w-full">
                <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
               
                <InfoRow icon={<MapPin className="h-4 w-4" />} label="Location" value={profile.location} />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <SocialButton href={profile.github} label="GitHub" Icon={Github} />
                <SocialButton href={profile.linkedin} label="LinkedIn" Icon={Linkedin} />
                <SocialButton href={profile.instagram} label="Instagram" Icon={Instagram} />
              </div>
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
}

function InfoRow({ icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/50 px-4 py-2 backdrop-blur-xl text-sm">
      <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md">
        {icon}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-900">{value}</span>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {content}
    </a>
  ) : (
    content
  );
}

function SocialButton({ href, label, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="group inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/50 p-3 backdrop-blur-xl transition-transform hover:-translate-y-0.5 hover:shadow-lg"
    >
      <Icon className="h-5 w-5 text-purple-700 group-hover:scale-110 transition-transform" />
    </a>
  );
}
