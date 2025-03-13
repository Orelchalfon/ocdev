import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useIsRTL, useDirectionClasses } from "../utils/directionUtils";

const Skills = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isRTL = useIsRTL();
  const directionClasses = useDirectionClasses();

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Three.js", level: 80 },
      ],
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "ASP.NET", level: 85 },
        { name: "Express", level: 90 },
        { name: "MongoDB", level: 85 },
        { name: "MSSQL", level: 85 },
      ],
    },
    {
      title: "Mobile & DevOps",
      skills: [
        { name: "React Native", level: 85 },
        { name: "Docker", level: 80 },
        { name: "Git", level: 90 },
        { name: "CI/CD", level: 85 },
        { name: "AWS", level: 80 },
      ],
    },
  ];

  return (
    <section className='py-20' id='skills'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center mb-16 ${isRTL ? 'rtl' : ''}`}
        >
          <h2 className='text-4xl font-bold mb-4'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
              Technical Expertise
            </span>
          </h2>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
            Mastering modern technologies to create scalable and innovative
            solutions
          </p>
        </motion.div>

        <div className='grid gap-8 md:grid-cols-3'>
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl backdrop-blur-sm ${
                isDark ? 'bg-gray-800/30' : 'bg-white/80'
              } ${isRTL ? 'text-right' : ''}`}
            >
              <h3 className='text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>
                {category.title}
              </h3>
              <div className='space-y-4'>
                {category.skills.map((skill) => (
                  <div key={skill.name} className='group'>
                    <div className={`flex ${directionClasses.flexDirection} items-center mb-4`}>
                      <span
                        className={`font-medium ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {skill.name}
                      </span>
                      <span className='text-gray-500'>{skill.level}%</span>
                    </div>
                    <div
                      className={`h-2 rounded-full ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      } overflow-hidden`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className='h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
