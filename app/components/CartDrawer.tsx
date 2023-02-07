import { motion, useCycle } from "framer-motion";
import { useEffect } from "react";

export default function CartDrawer() {
  const [isOpen, toggle] = useCycle(false, true);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  return (
    <>
      <div onClick={() => toggle()}>Cart</div>
      <motion.div
        style={{
          height: "100vh",
          position: "fixed",
          top: 0,
          bottom: 0,
          zIndex: 1,
          right: -100,
          width: 100,
          background: "red",
        }}
        animate={{
          right: isOpen ? 0 : -100,
        }}
      >
        <div onClick={() => toggle()}>Close cart</div>
      </motion.div>
    </>
  );
}
