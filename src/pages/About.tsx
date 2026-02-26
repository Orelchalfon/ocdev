import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

const About = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const stats = [
    { number: "5+", label: t("about.stats.years") },
    { number: "100+", label: t("about.stats.clients") },
    { number: "200+", label: t("about.stats.projects") },
    { number: "50+", label: t("about.stats.awards") },
  ];

  const team = [
    {
      name: t("about.team.member1.name"),
      role: t("about.team.member1.role"),
      image: "/team-member1.jpg",
    },
    {
      name: t("about.team.member2.name"),
      role: t("about.team.member2.role"),
      image: "/team-member2.jpg",
    },
    {
      name: t("about.team.member3.name"),
      role: t("about.team.member3.role"),
      image: "/team-member3.jpg",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className='py-16 md:py-24'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Hero Section */}
        <section className='text-center mb-16 md:mb-24'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-4xl md:text-5xl font-bold mb-6'
          >
            {t("about.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`max-w-2xl mx-auto text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
          >
            {t("about.description")}
          </motion.p>
        </section>

        {/* Stats */}
        <section className='mb-24'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className='text-center'
              >
                <div className='text-4xl md:text-5xl font-bold text-indigo-500 mb-2'>
                  {stat.number}
                </div>
                <div
                  className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className='mb-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-8 rounded-2xl ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-100"
                }`}
            >
              <h2 className='text-2xl font-bold mb-4'>
                {t("about.mission.title")}
              </h2>
              <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                {t("about.mission.description")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-8 rounded-2xl ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-100"
                }`}
            >
              <h2 className='text-2xl font-bold mb-4'>
                {t("about.vision.title")}
              </h2>
              <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                {t("about.vision.description")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-3xl font-bold text-center mb-8 md:mb-12'
          >
            {t("about.team.title")}
          </motion.h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`text-center p-6 rounded-2xl ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-100"
                  }`}
              >
                <div className='w-32 h-32 mx-auto mb-6'>
                  <img
                    src={member.image}
                    alt={member.name}
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>
                <h3 className='text-xl font-semibold mb-2'>{member.name}</h3>
                <p
                  className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
                >
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default About;
