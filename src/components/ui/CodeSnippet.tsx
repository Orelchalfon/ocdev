import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useLanguage } from "../../hooks/useLanguage";

const CodeSnippet = () => {
  const { language } = useLanguage();
  const languageProgress = useSpring(0, {
    stiffness: 300,
    damping: 20,
  });

  // Handle language changes
  useEffect(() => {
    const target = language === "he" ? 1 : 0;
    languageProgress.set(target);
  }, [language, languageProgress]);

  // Create smooth transforms
  const left = useTransform(languageProgress, [0, 1], ["75%", "0%"]);
  const scale = useTransform(languageProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(languageProgress, [0, 0.5, 1], [1, 0.8, 1]);

  return (
    <motion.div
      className='lg:block lg:absolute lg:top-1/2 lg:-translate-y-1/2'
      style={{
        left,
        scale,
        opacity,
      }}
    >
      <pre className='text-sm bg-zinc-800 p-4 rounded-xl border border-zinc-700 font-mono'>
        <code className='text-purple-400'>const</code>{" "}
        <code className='text-blue-400'>developer</code>{" "}
        <code className='text-white'>= {`{`}</code>
        <br />
        <code className='text-white ml-4'>name: </code>
        <code className='text-green-400'>'Orel Chalfon'</code>,
        <br />
        <code className='text-white ml-4'>stack: </code>
        <code className='text-yellow-400'>
          ['MERN', 'React Native', 'ASP.NET']
        </code>
        ,
        <br />
        <code className='text-white ml-4'>passion: </code>
        <code className='text-green-400'>'Building the future of web'</code>
        <br />
        <code className='text-white'>{`}`}</code>
      </pre>
    </motion.div>
  );
};
export default CodeSnippet;
