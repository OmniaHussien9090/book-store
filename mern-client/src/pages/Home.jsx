import React from "react";
import Banner from "../components/Banner";
import Shop from "../components/Shop";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";

const Home = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div>
      <motion.div
        style={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
      >
        <Banner />
      </motion.div>
      <motion.div
        style={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
      >
        <Shop />
      </motion.div>
      <Features />
      <Testimonials />
    </div>
  );
};

export default Home;
